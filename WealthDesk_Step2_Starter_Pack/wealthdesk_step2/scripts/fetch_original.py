"""Fetch one listed official source and extract it locally into a quarantined staging area."""
import argparse
import hashlib
import json
import urllib.parse
import urllib.request
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
ALLOWED={'www.sebi.gov.in','files.hdfcfund.com','www.incometax.gov.in'}


class SafeRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):
        parsed=urllib.parse.urlparse(newurl)
        if parsed.scheme!='https' or parsed.hostname not in ALLOWED:
            raise ValueError('Unexpected redirect: obtain the source manually and verify its provenance')
        return super().redirect_request(req,fp,code,msg,headers,newurl)


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('document_key')
    a=p.parse_args()
    sources=json.loads((ROOT/'processed/public_sources.json').read_text())
    match=[s for s in sources if s['document_key']==a.document_key]
    if len(match)!=1:raise SystemExit('Use a document_key from processed/public_sources.json')
    s=match[0];parsed=urllib.parse.urlparse(s['url'])
    if parsed.scheme!='https' or parsed.hostname not in ALLOWED:raise ValueError('Unexpected source host')
    opener=urllib.request.build_opener(SafeRedirect())
    req=urllib.request.Request(s['url'],headers={'User-Agent':'WealthDeskPrototype/1.0'})
    with opener.open(req,timeout=45) as r:
        raw=r.read(25*1024*1024+1)
        if len(raw)>25*1024*1024:raise ValueError('Source exceeds staging size limit')
    staging=ROOT/'staging'/s['document_key'];staging.mkdir(parents=True,exist_ok=True)
    is_pdf=raw.startswith(b'%PDF')
    original=staging/('original.pdf' if is_pdf else 'original.html');original.write_bytes(raw)
    if is_pdf:
        from pypdf import PdfReader
        pages=[{'page_number':i+1,'text':page.extract_text() or ''} for i,page in enumerate(PdfReader(original).pages)]
        (staging/'extracted_pages.json').write_text(json.dumps(pages,indent=2,ensure_ascii=False))
        flagged=[x['page_number'] for x in pages if len(x['text'].strip())<50]
    else:
        pages=[];flagged=[]
        # HTML is preserved, not blindly ingested with navigation/embedded scripts.
    (staging/'review.json').write_text(json.dumps({'source':s,'sha256':hashlib.sha256(raw).hexdigest(),
        'status':'quarantined_pending_human_review','page_count':len(pages),
        'low_text_pages':flagged,'notes':'Check tables, footnotes, current amendments, permissions and applicability. No automatic publication.'},indent=2))
    print(f'Saved to {staging}; originals remain quarantined and are not searchable.')


if __name__=='__main__':main()
