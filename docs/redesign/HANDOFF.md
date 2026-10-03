# Redesign handoff

## Flow

1. A short opening sequence plays once per tab session; Enter workspace skips it.
2. The home workspace displays the three original questions and the reference desk.
3. Selecting a question opens the unchanged prompt, then a deterministic loading sequence.
4. A saved response appears with context, structured detail, next steps and source cards.
5. Each source opens a drawer explaining relevance; Open PDF links to the cited 1-based PDF page. Inline preview and download are available.
6. Copy answer includes the source URLs and page numbers. Specialist review saves a local request; Conversations saves up to 60 recent prompts in the current browser.
7. The library can be searched, filtered and sorted. Review notes and escalation resolutions persist locally.

## Preserved questions

- What is the capital gains tax for equity mutual funds?
- Fee structure for Global Equity Fund
- Are there any constraints for offshore trusts?

Original history and escalation sample questions are retained verbatim too. The ISA question deliberately receives an unsupported response because the bundled collection is India-specific. No UK rule is inferred from an Indian source.

## Source conventions

The displayed date identifies the publication/snapshot, not a bank approval date. The 2026 capital-gains guide's date comes from the publisher file-version name. The tax FAQ is the July 2024 release. The source manifest records retrieval date, exact URL, SHA-256, page count and bytes.

Page numbers are 1-based physical PDF pages. Native browser PDF viewers may differ in how they honor `#page=N`; the page number is also shown in the drawer. Original URLs are retained for independent inspection. Inline preview uses the browser's PDF support.

## Deliberate implementation choices

- No API keys, external fonts, analytics integrations, backend requests or new live AI dependency.
- Existing Next.js/React stack retained. CSS animations avoid adding a motion dependency.
- A native modal dialog handles focus containment and Escape dismissal. Opening the PDF separately is always available if embedded rendering is unsupported.
- The document-review screen is explicitly a local practice workflow. It cannot make a public document bank-approved.
- No invented fee factsheet was added. A genuine product identifier and approved fee schedule are necessary to provide that answer.
- All original backend documents are preserved. The added official PDFs live under the frontend public directory so the requested hardcoded demo needs only one running process.

## Shipping

Run the frontend using the root README. The downloadable source package excludes dependency folders, generated build output, caches, credentials and the repository's checked-in Windows virtual environment. Reinstall dependencies with `npm ci`. Backend development, if needed later, requires creating a fresh virtual environment.
