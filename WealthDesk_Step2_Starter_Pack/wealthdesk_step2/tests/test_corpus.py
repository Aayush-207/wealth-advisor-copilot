import copy
import hashlib
import json
import math
import sys
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from demo_search import eligible,search
from embed_gemini import make_payload,normalize


class CorpusTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.docs=json.loads((ROOT/'processed/document_manifest.json').read_text())
        cls.bykey={d['document_key']:d for d in cls.docs}
        cls.chunks=[json.loads(l) for l in (ROOT/'processed/chunks.jsonl').read_text().splitlines()]

    def test_source_and_excerpt_integrity(self):
        docs={d['id']:d for d in self.docs}
        for d in self.docs:
            data=(ROOT/d['file_path']).read_bytes()
            self.assertEqual(hashlib.sha256(data).hexdigest(),d['sha256'])
        for c in self.chunks:
            text=(ROOT/docs[c['document_id']]['file_path']).read_text()
            self.assertEqual(text[c['char_start']:c['char_end']],c['content'])
            self.assertEqual(hashlib.sha256(c['content'].encode()).hexdigest(),c['excerpt_sha256'])
        self.assertEqual(len({c['id'] for c in self.chunks}),len(self.chunks))

    def test_version_boundary_and_future_source(self):
        self.assertTrue(eligible(self.bykey['horizon_a_v1'],'2026-06-30'))
        self.assertFalse(eligible(self.bykey['horizon_a_v1'],'2026-07-01'))
        self.assertFalse(eligible(self.bykey['horizon_a_v2'],'2026-06-30'))
        self.assertTrue(eligible(self.bykey['horizon_a_v2'],'2026-07-01'))
        self.assertFalse(eligible(self.bykey['demo_scheduled'],'2026-10-01'))
        self.assertFalse(eligible(self.bykey['demo_scheduled'],'2027-01-01'))

    def test_public_material_not_approved(self):
        for d in self.docs:
            self.assertFalse(eligible(d,'2026-10-01',mode='production'))
            if d['source_kind']=='reference':
                self.assertFalse(eligible(d,'2026-10-01'))
                self.assertIsNone(d['bank_approver'])

    def test_withdrawal_and_access_gate(self):
        d=copy.deepcopy(self.bykey['horizon_a_v2'])
        d['status']='withdrawn'
        self.assertFalse(eligible(d,'2026-10-01'))
        self.assertFalse(eligible(self.bykey['horizon_a_v2'],'2026-10-01',role='unknown'))
        self.assertFalse(eligible(self.bykey['horizon_a_v2'],'2026-10-01',jurisdiction='US'))

    def test_product_and_exception_evidence(self):
        matches=search('exit charge duplicate allotment correction exemption',product='DEMO-HIF-A')
        self.assertTrue(matches)
        self.assertEqual(matches[0]['title'],'Horizon Income Fund Class A terms version 2')
        self.assertIn('0.50%',matches[0]['excerpt'])
        self.assertIn('written approval',matches[0]['excerpt'])
        self.assertFalse(any('Class B' in x['title'] for x in matches))

    def test_no_vectors_fabricated(self):
        self.assertTrue(all(c['embedding'] is None for c in self.chunks))
        self.assertTrue(all(c['embedding_model'] is None for c in self.chunks))

    def test_embedding_payload_and_normalization(self):
        p=make_payload('Demo terms','Test passage')
        self.assertEqual(p['embedContentConfig']['outputDimensionality'],768)
        self.assertIn('title: Demo terms | text: Test passage',p['content']['parts'][0]['text'])
        vec=normalize([1.0]*768)
        self.assertAlmostEqual(math.sqrt(sum(v*v for v in vec)),1.0)
        for bad in ([0]*768,[1]*5,[float('nan')]*768):
            with self.assertRaises(ValueError):normalize(bad)


if __name__=='__main__':unittest.main()
