"""Offline integrity and citation checks for the bundled reference PDFs.

Run from anywhere: python scripts/verify_documents.py
Requires pypdf. No network calls or API credentials.
"""
import hashlib
import json
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'frontend' / 'public'
rows = json.loads((ROOT / 'frontend/src/lib/documents.json').read_text())
manifest = json.loads((PUBLIC / 'documents/provenance.json').read_text())
assert rows == manifest, 'Library catalogue and downloadable manifest disagree'
assert len(rows) == 13 and len({r['id'] for r in rows}) == 13
readers = {}
for row in rows:
    path = PUBLIC / row['file'].lstrip('/')
    data = path.read_bytes()
    assert data.startswith(b'%PDF'), path
    assert len(data) == row['bytes'], path
    assert hashlib.sha256(data).hexdigest() == row['sha256'], path
    reader = PdfReader(path)
    assert len(reader.pages) == row['pages'], path
    assert row['bankApproved'] is False
    readers[row['id']] = reader
    print(f"OK {row['id']}: {row['pages']} pages, SHA-256 matches")

# Text anchors on the actual pages referenced by saved answers.
anchors = [
    ('capital-gains-guide', 2, 'Equity-oriented Funds'),
    ('capital-gains-guide', 20, 'aggregate'),
    ('capital-gains-guide', 21, '12.5%'),
    ('investor-charter-2025', 3, 'fee details'),
    ('aml-2024', 11, 'protector'),
    ('kyc-2023', 13, 'Trust deed'),
]
for doc_id, page, text in anchors:
    extracted = readers[doc_id].pages[page - 1].extract_text()
    assert text.lower() in extracted.lower(), (doc_id, page, text)
    print(f'OK citation: {doc_id}, PDF p. {page}')
print('13 official PDFs and all cited page anchors verified.')
