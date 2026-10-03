# Wealthdesk — Wealth Advisor Copilot

An editorial redesign of the original Next.js application for relationship managers. This version deliberately uses **hardcoded answers**. No Gemini key, Supabase connection, backend process or other API key is required to run the demo.

## Run locally

Use Node.js 20.9 or later (tested with Node 24).

```sh
cd frontend
npm ci
npm run dev
```

Open http://localhost:3000. For the production version:

```sh
npm run build
npm start
```

## What changed

- Redesigned workspace, conversations, document library, document review and specialist review.
- A short, skippable opening sequence; animated paper artwork; composer focus effects; honest loading stages; staged answer reveals and source drawer transitions. Reduced-motion preferences are respected.
- The three original suggested questions are unchanged, as are the original history and escalation questions.
- Detailed saved responses, contextual limitations, tax illustration, and clickable PDF page references.
- 13 locally bundled official reference PDFs: the previously referenced investment-adviser master circular plus 12 additional publications from SEBI and the Income Tax Department.
- Search, category filters, sort, source inspection, PDF downloads, copied answers, stop/retry, persistent local history and review notes.
- Responsive layouts, keyboard shortcuts, visible focus, accessible dialog with Escape dismissal, and mobile navigation.

## Where to edit

| File | Purpose |
| --- | --- |
| `frontend/src/lib/knowledge.ts` | Original prompts, deterministic matching, saved responses and exact citation pages |
| `frontend/src/lib/documents.json` | Document titles, dates, categories, local files and official URLs |
| `frontend/public/documents/` | Original PDF snapshots and downloadable provenance manifest |
| `frontend/src/app/globals.css` | Design system, responsive layouts and animations |
| `frontend/src/components/AppShell.tsx` | Sidebar, navigation, app chrome and opening animation |
| `frontend/src/components/EvidenceDrawer.tsx` | Source explanation, original PDF, page links and downloads |
| `frontend/src/lib/storage.ts` | Local browser state |

## Demo boundaries

- This is a UI/demo workflow, **not a live retrieval or generation system**. Unknown questions get an explicit unsupported response.
- The profile is a sample identity. There is no login, role enforcement or bank approval in this demo.
- Documents are official public **dated snapshots**, not bank-approved policy. Some have later amendments. The library preserves their dates and does not claim they are the latest law.
- Tax examples describe the cited Income-tax Act, 1961 framework. The applicable tax year and any Income-tax Act, 2025 transition must be checked separately.
- “Global Equity Fund” is not identified by an authenticated prospectus in the repository. The old invented fee is replaced with a missing-evidence response rather than another made-up percentage.
- Reviews, conversation history and escalations are stored in this browser's localStorage. No message is sent to a specialist. Marking a document reviewed does not approve it or alter saved answers.
- Only bundled document links and deliberate clicks to the original publishers use document resources. The chat makes no AI/API calls. PDFs work with the running local application without publisher availability.
- The original FastAPI backend and starter-pack data are preserved for later development. They are not called by this frontend.

See [source inventory](docs/redesign/SOURCES.md), [handoff](docs/redesign/HANDOFF.md), and [verification](docs/redesign/VERIFICATION.md).

## Checks

```sh
cd frontend
npm run lint
npm run build
```

Document verification (requires `pypdf`):

```sh
python scripts/verify_documents.py
```
