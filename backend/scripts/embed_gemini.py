"""Generate real Gemini vectors; require a local environment key, never print it."""
import argparse
import hashlib
import json
import math
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
MODEL='gemini-embedding-2'
DIMENSIONS=768


def normalize(values):
    if len(values)!=DIMENSIONS or not all(isinstance(v,(int,float)) and math.isfinite(v) for v in values):
        raise ValueError('Invalid embedding dimensions or values')
    length=math.sqrt(sum(v*v for v in values))
    if length==0: raise ValueError('Zero vector returned')
    return [v/length for v in values]


def make_payload(title,text):
    return {'model':'models/'+MODEL,
            'content':{'parts':[{'text':f'title: {title} | text: {text}'}]},
            'embedContentConfig':{'outputDimensionality':DIMENSIONS,'autoTruncate':False}}


def request_vector(payload,key):
    url=f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:embedContent'
    for attempt in range(5):
        req=urllib.request.Request(url,data=json.dumps(payload).encode(),method='POST',
                    headers={'Content-Type':'application/json','x-goog-api-key':key})
        try:
            with urllib.request.urlopen(req,timeout=60) as r: data=json.load(r)
            return normalize(data['embedding']['values'])
        except urllib.error.HTTPError as exc:
            # Do not print response bodies or request headers: they may contain sensitive text.
            if exc.code in (429,500,502,503,504) and attempt<4:
                time.sleep(min(2**attempt*2,30)); continue
            raise RuntimeError(f'Gemini HTTP {exc.code}; check API access and quota locally') from None
        except urllib.error.URLError:
            if attempt<4: time.sleep(min(2**attempt*2,30)); continue
            raise RuntimeError('Gemini network request failed') from None


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run',action='store_true')
    parser.add_argument('--limit',type=int,default=None)
    parser.add_argument('--delay',type=float,default=4.0)
    args=parser.parse_args()
    if args.delay<0 or (args.limit is not None and args.limit<1): parser.error('Use positive limits and nonnegative delay')
    rows=[json.loads(l) for l in (ROOT/'processed/chunks.jsonl').read_text().splitlines()]
    docs={d['id']:d for d in json.loads((ROOT/'processed/document_manifest.json').read_text())}
    selected=rows if args.limit is None else rows[:args.limit]
    if args.dry_run:
        print(json.dumps({'model':MODEL,'dimensions':DIMENSIONS,'requests':len(selected),
                          'mode':'dry-run; no API call; no generated vectors'},indent=2)); return
    key=os.environ.get('GEMINI_API_KEY')
    if not key: raise SystemExit('Set GEMINI_API_KEY locally. Do not paste it into chat or frontend code.')
    out=ROOT/'processed/embeddings.jsonl'
    cached={r['id']:r for r in [json.loads(l) for l in out.read_text().splitlines()]} if out.exists() else {}
    with out.open('a',encoding='utf-8') as f:
        for index,row in enumerate(selected):
            payload=make_payload(docs[row['document_id']]['title'],row['content'])
            input_hash=hashlib.sha256(json.dumps(payload,sort_keys=True).encode()).hexdigest()
            existing=cached.get(row['id'])
            if existing:
                if existing['embedding_input_sha256']!=input_hash or existing['embedding_model']!=MODEL:
                    raise ValueError('Embedding cache mismatch; use a separate corpus/model version')
                normalize(existing['embedding']); continue
            record={'id':row['id'],'excerpt_sha256':row['excerpt_sha256'],
                    'embedding':request_vector(payload,key),'embedding_model':MODEL,
                    'embedding_dimensions':DIMENSIONS,'embedding_input_sha256':input_hash}
            f.write(json.dumps(record)+'\n'); f.flush()
            print(f'Embedded chunk {index+1}/{len(selected)}')
            if index+1<len(selected): time.sleep(args.delay)
    print('Embeddings saved. Run load_supabase.py to upload them.')


if __name__=='__main__': main()
