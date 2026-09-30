"""Build citation-ready section chunks from the included authored Markdown corpus."""
import hashlib
import json
import re
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def build():
    manifest = json.loads((ROOT / 'processed/document_manifest.json').read_text())
    chunks = []
    for doc in manifest:
        text = (ROOT / doc['file_path']).read_text(encoding='utf-8')
        if hashlib.sha256(text.encode()).hexdigest() != doc['sha256']:
            raise ValueError(f"File changed: {doc['document_key']}; create a new version before preparing")
        headings = list(re.finditer(r'^## (.+)$', text, re.M))
        for index, heading in enumerate(headings):
            start = heading.end()
            end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
            body = text[start:end].strip()
            if not body:
                raise ValueError('Empty source section')
            # Keep complete sections: conditions, table rows, and exceptions are not split.
            if len(body.encode('utf-8')) > 6000:
                raise ValueError('Section too long: manually review boundaries before chunking')
            excerpt_hash = hashlib.sha256(body.encode()).hexdigest()
            chunk_id = str(uuid.uuid5(uuid.UUID(doc['id']), f'{index}:{excerpt_hash}'))
            anchor = re.sub(r'[^a-z0-9]+', '-', heading.group(1).lower()).strip('-')
            chunks.append(dict(id=chunk_id, document_id=doc['id'], chunk_index=index,
                               section=heading.group(1), content=body,
                               char_start=text.index(body, start), char_end=text.index(body, start)+len(body),
                               word_count=len(body.split()), excerpt_sha256=excerpt_hash,
                               source_anchor=doc['file_path']+'#'+anchor,
                               original_source_locator=doc['source_locator'],
                               content_type='author_created_section', embedding=None,
                               embedding_model=None, embedding_dimensions=None))
    (ROOT / 'processed/chunks.jsonl').write_text(''.join(json.dumps(c, ensure_ascii=False)+'\n' for c in chunks))
    return manifest, chunks


if __name__ == '__main__':
    docs, chunks = build()
    print(f'Prepared {len(docs)} documents and {len(chunks)} complete-section chunks. Embeddings not generated.')
