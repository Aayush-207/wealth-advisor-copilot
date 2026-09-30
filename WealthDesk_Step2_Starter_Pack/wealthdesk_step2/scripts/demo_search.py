"""Offline lexical evidence lookup. This is not an AI answer generator."""
import argparse
import datetime as dt
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def eligible(doc, as_of, mode='demo', role='rm', jurisdiction='IN'):
    if doc['jurisdiction'] != jurisdiction or role not in doc['allowed_roles']:
        return False
    if mode == 'demo':
        if doc['source_kind'] != 'demo' or doc['status'] not in ('demo_active', 'demo_superseded'):
            return False
    elif mode == 'production':
        if (doc['source_kind'] != 'reference' or doc['status'] != 'active'
                or doc['approval_status'] != 'bank_approved' or not doc['bank_owner']
                or not doc['bank_approver'] or doc['bank_owner']==doc['bank_approver']
                or not doc.get('approved_at') or not doc['business_entity'] or not doc['review_due']):
            return False
    else:
        raise ValueError('Unknown mode')
    if not doc['effective_from'] or as_of < doc['effective_from']:
        return False
    if not doc['effective_to'] and not doc['effective_to_is_open_ended']:
        return False
    if doc['effective_to'] and as_of >= doc['effective_to']:
        return False
    return True


def search(query, as_of='2026-10-01', product=None, mode='demo', role='rm', limit=5):
    dt.date.fromisoformat(as_of)
    docs = {d['id']: d for d in json.loads((ROOT/'processed/document_manifest.json').read_text())}
    chunks = [json.loads(line) for line in (ROOT/'processed/chunks.jsonl').read_text().splitlines()]
    stopwords = {'the','a','an','is','are','for','of','what','can','i','do','to','and','in','with'}
    terms = set(re.findall(r'[a-z0-9]+', query.lower())) - stopwords
    results = []
    for c in chunks:
        d = docs[c['document_id']]
        if not eligible(d, as_of, mode=mode, role=role):
            continue
        if product and d['product_id'] not in (product, None):
            continue
        tokens = re.findall(r'[a-z0-9]+', (c['section']+' '+c['content']).lower())
        hits = sum(min(tokens.count(term), 3) for term in terms)
        if hits:
            results.append(dict(score=hits, title=d['title'], version=d['version'],
                                section=c['section'], excerpt=c['content'], citation=c['source_anchor'],
                                document_id=d['id'], chunk_id=c['id'], demo_only=mode=='demo'))
    return sorted(results, key=lambda x: (-x['score'],x['title'],x['section']))[:limit]


if __name__ == '__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('query'); p.add_argument('--as-of', default='2026-10-01')
    p.add_argument('--product'); p.add_argument('--mode', choices=['demo','production'],default='demo')
    a=p.parse_args()
    print(json.dumps(search(a.query,a.as_of,a.product,a.mode),indent=2))
