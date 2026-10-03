# Wealth Advisor Copilot

## Comprehensive Overview
Wealth Advisor Copilot is an enterprise-grade, high-fidelity conversational interface engineered specifically for relationship managers, wealth advisors, and financial analysts. It transcends the generic "AI chatbot" by providing an advisory desk companion that deeply understands financial context and delivers responses strictly grounded in a curated, proprietary collection of reference documents. 

This repository houses the complete source code for the platform, which marries a visually stunning, bespoke frontend with a robust Retrieval-Augmented Generation (RAG) backend architecture.

---

## The Problem: The Status Quo in Wealth Management
In traditional wealth management, relationship managers and financial advisors spend a massive percentage of their day manually digging through dense, fragmented data repositories. When a client asks a highly specific question (e.g., "What are the tax implications of shifting my portfolio to municipal bonds under the new guidelines?"), advisors must:
1. Log into multiple clunky, outdated intranet portals or shared drives.
2. Manually search through hundreds of 50+ page PDF reports, governance docs, and tax manuals.
3. Read through the documents to find the exact clause.
4. Synthesize that fragmented information into a cohesive answer for the client.

This process is slow, error-prone, and pulls advisors away from their primary role: building relationships. Current legacy systems rely on basic keyword search, meaning if the advisor doesn't use the exact terminology, they risk missing critical compliance or financial information.

## The Solution: Wealth Advisor Copilot
The Wealth Advisor Copilot completely flips this paradigm. Instead of the advisor searching for the needle in the haystack, the Copilot finds the needle, understands the context, and presents a synthesized answer on a silver platter.

By combining strict Retrieval-Augmented Generation (RAG) with the advanced reasoning capabilities of Google's Gemini API, the Copilot transforms a static document library into an active, intelligent partner.

### Who Uses It?
- **Relationship Managers**: To instantly answer client questions accurately during live meetings or phone calls.
- **Wealth Advisors**: To research complex financial strategies and ensure their advice perfectly aligns with the latest internal governance and tax documents.
- **Financial Analysts & Compliance Officers**: To rapidly extract data points from extensive market reports or review escalated queries.

### How & Where Is It Used?
- **Where**: Deployed as an internal web-based platform securely within the financial institution's intranet, often kept open on an advisor's secondary monitor.
- **How**: An advisor types a natural language question into the Copilot's chat interface. Within seconds, the Copilot searches thousands of ingested documents in Supabase, extracts the exact relevant clauses, and uses Gemini to generate a fully synthesized, highly accurate answer. Crucially, the answer includes clickable citations pointing directly back to the source material so the advisor can verify the data instantly.

---

## Technical Stack & Architecture

### 1. Frontend: Next.js (React) & Vanilla CSS
- **Framework**: Built on Next.js leveraging Turbopack for lightning-fast local development and optimal production bundling.
- **Styling**: Utilizes heavily customized Vanilla CSS mapped to a highly specific design system (`globals.css`). It completely avoids generic Tailwind templates in favor of a bespoke, editorial fintech aesthetic (e.g., custom color variables like `--paper`, `--ink`, `--purple`).
- **State Management**: Uses React hooks (`useState`, `useEffect`, `useRef`) for complex UI orchestration, such as managing conversation turns, rendering phases, and handling window viewport synchronizations.

### 2. Backend API: FastAPI (Python)
- **Framework**: Powered by FastAPI, offering high-performance, asynchronous endpoints that interface seamlessly with the frontend.
- **Concurrency**: `uvicorn` serves the backend, allowing it to handle long-running LLM generation and vector search queries without blocking the event loop.

### 3. Vector Database & Storage: Supabase
- **Vector Search**: Utilizes Supabase (with `pgvector` under the hood) as the central repository for all document embeddings.
- **Storage**: Handles the persistence of raw document metadata, user conversation histories, and escalation tracking.

### 4. AI & LLM Engine: Google Gemini API
- **Reasoning Engine**: Google's Gemini API is utilized as the core intelligence layer. It is responsible for comprehending complex, multi-layered financial questions and synthesizing human-readable answers.
- **Contextual Awareness**: Gemini is heavily prompted to rely *only* on the extracted context provided by the RAG pipeline, ensuring zero hallucination.

---

## Extensive Feature Breakdown

### 1. The Advisory Workspace (Chatbot Interface)
The core workspace is designed to feel like a premium, organic conversation rather than a rigid terminal.
- **Right/Left Chat UI**: Messages are structured exactly like a modern messaging app. User queries align to the right in solid purple bubbles, while the AI's responses anchor to the left in sophisticated, rounded cards.
- **Organic "Thinking" Phase**: When a user submits a query, the UI intentionally delays the response (simulating human thought) via a multi-phase loading state. It transitions from "Opening saved response..." to "Preparing references..." to "Formatting your answer...", culminating in a 4.5-second cinematic build-up.
- **Silky Smooth Animations**: The entire chat interface is governed by custom `@keyframes slide-up-fade` using a highly tuned `1.2s cubic-bezier(0.16, 1, 0.3, 1)` transition, ensuring every new message glides into view with buttery smoothness.
- **Aurora Background**: The workspace features an "Interactive Background" component—a non-generic, high-fidelity aesthetic combining three blurred color orbs (purple, blue, gold), a static noise overlay, and endless, sweeping curvy lines that subtly respond to cursor movement via parallax tracking.
- **Quick-Start Prompts**: Glass-morphism prompt cards with permanent 2px borders (`#a898c5`/40) and subtle hover interactions (`scale-[1.02]`, border glow) allow users to trigger complex queries with one click.

### 2. Dynamic Document Library
A centralized hub built with an editorial, premium design philosophy.
- **Grid Layout**: Displays reference documents as beautifully styled cards, complete with document issuer labels, distinct icons based on document type (e.g., tax, governance, general), and status badges.
- **Search & Filtering**: Real-time semantic search fields and dropdown sort selectors allow advisors to quickly parse through thousands of ingested files.
- **Empty States & Metrics**: Thoughtfully designed empty states and a top-level stats strip providing a macro view of the library's contents (e.g., total documents, recent updates).

### 3. Governance and Specialist Review (Escalations)
- **Escalation Workflows**: If the AI cannot confidently answer a question based on the provided documents, or if the advisor requires human intervention, the system features a one-click "Escalate to Specialist" feature.
- **Review Dashboard**: A dedicated panel for compliance and senior analysts to review flagged conversations, complete with interactive rich-text editors for adding resolution notes.
- **Conversation History**: All user sessions are saved locally (and synced remotely) allowing advisors to seamlessly resume past threads.

---

## Deep Dive: The RAG Workflow (How It Works)

The system employs a strict Retrieval-Augmented Generation (RAG) architecture to guarantee accuracy and compliance.

### Phase 1: Ingestion & Vectorization
1. **Document Upload**: Reference documents (PDFs, Word docs, text) are ingested into the system.
2. **Chunking**: The documents are intelligently broken down into smaller, semantically meaningful chunks (e.g., paragraphs, sections).
3. **Embedding Generation**: An embedding model converts these text chunks into dense vector representations.
4. **Supabase Storage**: These vectors, alongside their original source text and metadata (title, author, date), are securely fed and stored in Supabase.

### Phase 2: Semantic Search & Extraction
1. **Query Processing**: When the user submits a question via the frontend, the backend instantly converts the user's text into a vector using the same embedding model.
2. **Vector Math**: The system runs a high-speed cosine similarity search within Supabase (`pgvector`) to find the document chunks whose vectors most closely align with the user query vector.
3. **Context Retrieval**: The top highly relevant chunks are extracted from the database.

### Phase 3: Gemini API Generation
1. **Prompt Engineering**: The backend constructs a highly specific prompt for the Gemini API. It feeds Gemini the user's original query *and* the extracted context chunks, explicitly instructing Gemini to synthesize an answer based *only* on the provided context.
2. **Response Formatting**: Gemini structures the response, often including markdown tables, bulleted summaries, and precise inline citations pointing back to the original documents.
3. **Frontend Rendering**: The FastAPI backend sends the finalized response to the Next.js frontend, which beautifully maps the data into the `.answer-card` component, fully equipped with clickable source citations.


