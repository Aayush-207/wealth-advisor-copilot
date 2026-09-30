"""Load prepared data/vectors through Supabase REST from a trusted local backend."""
import argparse
import json
import os
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--dry-run',action='store_true')
    args=p.parse_args()
    docs=json.loads((ROOT/'processed/document_manifest.json').read_text())
    chunks=[json.loads(l) for l in (ROOT/'processed/chunks.jsonl').read_text().splitlines()]
    f=ROOT/'processed/embeddings.jsonl'
    vectors=[json.loads(l) for l in f.read_text().splitlines()] if f.exists() else []
    if args.dry_run:
        print(json.dumps({'documents':len(docs),'chunks':len(chunks),'vectors':len(vectors),
                          'network_calls':0,'action':'dry-run only'},indent=2));return
    url=os.environ.get('SUPABASE_URL','').rstrip('/')
    key=os.environ.get('SUPABASE_SERVICE_ROLE_KEY','')
    parsed=urllib.parse.urlparse(url)
    if parsed.scheme!='https' or not parsed.hostname or not key:
        raise SystemExit('Set HTTPS SUPABASE_URL and backend-only SUPABASE_SERVICE_ROLE_KEY locally.')
    def send(path,payload,method='POST'):
        req=urllib.request.Request(url+'/rest/v1/'+path,data=json.dumps(payload).encode(),method=method,
            headers={'apikey':key,'Authorization':'Bearer '+key,'Content-Type':'application/json',
                     'Prefer':'resolution=ignore-duplicates,return=representation'})
        try:
            with urllib.request.urlopen(req,timeout=60) as r:
                body=r.read();return json.loads(body) if body else []
        except urllib.error.HTTPError as e:
            raise RuntimeError(f'Supabase HTTP {e.code}; verify schema and credentials locally') from None
        except urllib.error.URLError:
            raise RuntimeError('Supabase request failed; verify network connectivity') from None
    # Ignore conflicts to avoid accidentally reactivating withdrawn versions on repeat imports.
    send('wd_documents?on_conflict=id',docs)
    for offset in range(0,len(chunks),50): send('wd_chunks?on_conflict=id',chunks[offset:offset+50])
    current={c['id']:c for c in chunks}
    for v in vectors:
        from embed_gemini import normalize
        if v['id'] not in current or v['excerpt_sha256']!=current[v['id']]['excerpt_sha256']:
            raise ValueError('Embedding is not tied to current prepared evidence')
        vals=normalize(v['embedding'])
        result=send('wd_chunks?id=eq.'+v['id'],{'embedding':'['+','.join(map(str,vals))+']',
                        'embedding_model':v['embedding_model'],'embedding_dimensions':768},'PATCH')
        if len(result)!=1:raise RuntimeError('Expected one updated chunk')
    print(f'Import complete: {len(docs)} documents, {len(chunks)} chunks, {len(vectors)} vectors processed.')


if __name__=='__main__':main()
