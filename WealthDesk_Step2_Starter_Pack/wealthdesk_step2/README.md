# WealthDesk document preparation starter pack

This is step 2 for a Next.js, FastAPI, Supabase and Gemini project. It supplies a usable **demo corpus**, source provenance, citation-ready chunks, and database setup. No API keys are included or required to inspect the prepared output.

## What is prepared

- Eight original fictional Markdown documents: an internal research policy, three products/classes, old/current terms, a future amendment, tax-question process, and publication rules.
- Four short author-created public-source notes: SBI Gold Fund KIM, HDFC ELSS Tax Saver KIM, Income Tax Department transition FAQs, and SEBI investment-adviser guidance. Each links to its original and names the supporting location.
- Document metadata and complete-section chunks with stable IDs, hashes, and section links.
- Supabase schema and ready-to-run seed SQL, lexical search, and 768-dimensional vector columns.
- A real Gemini embedding script with checkpoint/resume and quota retries, plus a Supabase importer.
- A local evidence search command and integrity/eligibility tests.

**The official originals are linked, not redistributed.** Public-source notes are not full documents or substitutes for them. The included originals are the eight authored fictional demo documents. Use `fetch_original.py` to acquire the linked originals directly from their publishers into a quarantined staging folder on your machine. This avoids representing public snapshots as bank-approved material.

## Where real documents come from

1. Investment policies: the bank's compliance/product owners and approved internal repository. These cannot be obtained from a public website on behalf of an unnamed bank.
2. Product terms: asset-manager KIM, SID, SAI, factsheet and notices/addenda. Collect exact product/plan/class identifiers and applicable versions, not merely a brochure filename.
3. Tax sources: the official Income Tax Department and applicable legislation, with the bank tax team's reviewed interpretation for the intended period.
4. Governance references: official SEBI publications, after confirming entity/activity applicability with compliance.

See `SOURCE_GUIDE.md` and `processed/public_sources.json` for the exact links.

## Important scope

All fictional rules, fees, product names and dates are invented fixtures. They are not real fund terms, bank policy, or financial advice. Public notes are `in_review`, have no bank owner/approver, and are excluded from current answering. Demo sources have `demo_fixture_only` status; they are never marked bank-approved. No production source is eligible by default.

The source-note publication dates are dates printed in the inspected documents, not assurances that they are the latest versions. No current tax rates are supplied. Public original downloads require subsequent content, rights, applicability, table and footnote review.

Google's pricing page lists free-tier embedding input as usable for product improvement. This pack contains only public/fictional material; do not put confidential bank/client content into the free-tier workflow without a separately approved provider arrangement. Check quotas and model availability for your own project.

## Start locally

Requires Python 3.10 or newer. From this folder:

```bash
python scripts/prepare.py
python -m unittest discover -s tests -v
python scripts/demo_search.py "exit charge duplicate allotment correction" --product DEMO-HIF-A --as-of 2026-10-01
```

This returns source excerpts and citations, not generated financial advice. `--as-of` selects the relevant source-applicability date. For the demo product terms, that may be the acquisition date rather than today's date. A later FastAPI endpoint must resolve this context before retrieval.

Historical example:

```bash
python scripts/demo_search.py "exit charge" --product DEMO-HIF-A --as-of 2026-06-15
```

Production mode returns no eligible evidence until real approval and permissions are supplied:

```bash
python scripts/demo_search.py "exit charge" --mode production
```

## Set up Supabase

In your project's SQL editor, run these files in order:

1. `sql/01_schema.sql`
2. `sql/02_seed.sql`

This creates isolated `wd_documents` and `wd_chunks` tables. No existing project table is replaced. Row-level security is enabled with no browser-access policies. The service-role key is backend-only. Next.js must call your later authenticated FastAPI backend; never expose the service key through `NEXT_PUBLIC_` variables.

Test lexical search in the SQL editor:

```sql
select * from public.wd_search(
 p_query => 'exit charge',
 p_as_of => date '2026-10-01',
 p_role => 'rm',
 p_entity => 'DEMO_WEALTH_BANK',
 p_product => 'DEMO-HIF-A',
 p_demo => true
);
```

This is a backend corpus-filtering helper, not completed employee authentication. FastAPI must derive role, entity, permitted scope and demo mode from a trusted session/configuration, recheck permissions before source display, and implement bank-specific ACLs before production. Do not expose an API that lets the browser choose arbitrary roles or demo mode.

Effective-from is inclusive and effective-to is exclusive. Future scheduled content remains unavailable until activated. Withdrawal status excludes evidence from new searches. Re-imports ignore duplicate IDs and do not reset a withdrawn source.

## Generate real Gemini embeddings

Embeddings were **not generated here**: no Gemini API key was supplied. `embedding: null` is intentional, not a fake vector. Text search works without vectors.

Use the default `gemini-embedding-2` model and 768 dimensions. It uses `title: ... | text: ...` document formatting. For later query embeddings use `task: search result | query: ...` with the same model/dimensions. Do not combine vectors from different models in one search.

First inspect the work without an API call:

```bash
python scripts/embed_gemini.py --dry-run
```

Set `GEMINI_API_KEY` as a local environment variable, then:

```bash
python scripts/embed_gemini.py --limit 3
python scripts/embed_gemini.py
```

The second command resumes the remaining chunks. Output is `processed/embeddings.jsonl`. The script validates dimensions, normalizes vectors, records input/model hashes, waits between requests and retries transient failures. Limits vary by project; a 429 can require increasing `--delay` or resuming later. Never share your key in a chat message.

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` locally, then:

```bash
python scripts/load_supabase.py --dry-run
python scripts/load_supabase.py
```

The loader inserts missing records and uploads existing real vectors. Schema setup remains a SQL-editor step. No remote database or model call has been executed on your behalf.

`.env.example` lists required names; scripts read exported environment variables and do not automatically load a `.env` file. Set them in your terminal/IDE or use a trusted dotenv loader. Keep secrets out of the frontend.

## Download an official original for review

```bash
pip install -r requirements.txt
python scripts/fetch_original.py ref_hdfc_elss
```

Other keys: `ref_sbi_gold`, `ref_tax_transition`, `ref_sebi_ia`.
PDF downloads get page-level extraction; HTML is saved for inspection rather than blindly indexing navigation or scripts. All staged originals remain quarantined. This does not approve, publish, or add them to retrieval. Inspect numeric values, tables, footnotes, OCR, latest addenda and legal applicability before preparing a new document version.

## When to create a new version

Do not edit the prepared content and retain its old ID. Any source-text change requires a new version, new file hash and new chunks. An independent approval process is still needed for real documents. The database blocks edits to evidence content/identity but allows embedding and governance updates.

## Validation status

Offline tests cover source/chunk hashes, exact citation spans, version boundaries, future guidance, unapproved-public-source exclusion, withdrawal, role/jurisdiction filtering, product-class separation, exception preservation and embedding validation. Dry runs perform no network calls.

Supabase SQL and actual Gemini/Supabase network execution still need validation in your projects after credentials are configured. No claim of production readiness, regulatory compliance, bank approval or tested answer accuracy is made.

## Next step

Build the authenticated FastAPI question endpoint: resolve context, retrieve permitted evidence, call Gemini, validate claim-to-source support, then return answer status and citations to Next.js. Keep answer generation separate from this preparation package.
