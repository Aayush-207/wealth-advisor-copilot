# Wealth Advisor Copilot

## Overview
Wealth Advisor Copilot is an intelligent, high-fidelity conversational interface built specifically for relationship managers and wealth advisors. It serves as an advisory desk companion that deeply understands context and provides responses grounded in a curated collection of reference documents. 

## Tech Stack
- **Frontend**: Next.js (React), Vanilla CSS, Typescript
- **Backend / API**: FastAPI (Python)
- **Database / Vector Storage**: Supabase
- **AI / LLM Engine**: Google Gemini API
- **Architecture**: Retrieval-Augmented Generation (RAG)

## Key Features
- **Intelligent Chatbot Interface**: A dynamic, highly responsive conversational UI featuring right-aligned user queries and left-aligned AI responses. The interface boasts beautifully animated, silky-smooth transition curves and thought-process delays that simulate organic thinking.
- **Retrieval-Augmented Generation (RAG)**: Leverages a strict RAG pipeline to ensure that all answers provided by the AI are accurate and firmly grounded in the ingested document library.
- **Dynamic Document Library**: A centralized hub with an editorial, fintech-inspired aesthetic where advisors can easily search and reference source materials.
- **Vector Search via Supabase**: All reference documents are ingested, vectorized, and securely fed into Supabase, allowing for lightning-fast semantic search and extraction when a user poses a question.
- **Gemini-Powered Reasoning**: Utilizes the powerful Gemini API to comprehend complex financial queries, synthesize context from extracted documents, and format easy-to-read, structured responses (including tables, citations, and summaries).

## How It Works
1. **Document Ingestion**: Source documents are processed, chunked, and converted into vector embeddings. These embeddings are then stored securely in **Supabase**.
2. **User Query**: The advisor asks a question via the visually stunning chat interface on the frontend.
3. **Semantic Search (RAG Extraction)**: The system takes the user's query, generates an embedding for it, and performs a similarity search against the Supabase vector database to extract the most highly relevant context and source text.
4. **Answer Generation**: The extracted text, alongside the original query, is securely passed to the **Gemini API**. Gemini acts as the reasoning engine to synthesize a grounded, highly accurate response based exclusively on the retrieved data.
5. **Presentation**: The frontend beautifully renders the response, simulating a realistic "thinking" phase before elegantly sliding the answer onto the screen with custom CSS animations.

*(Note: This documentation describes the architectural flow of the system. Specific proprietary datasets, client details, and hardcoded query strings are strictly excluded from this repository codebase to maintain privacy and reusability.)*
