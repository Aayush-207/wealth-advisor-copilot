# Project Architecture

## High-Level Design

The system follows a classic **Retrieval-Augmented Generation (RAG)** architecture with a web-based frontend and robust backend.

### 1. User Interface (Frontend)
- **Framework:** React / Next.js
- **Purpose:** Provides a chat-like interface for relationship managers.
- **Features:** Displays conversational Q&A, generated answers, and clickable document citations.

### 2. Backend Service (API)
- **Framework:** Python (FastAPI or LangChain/LlamaIndex)
- **Purpose:** Handles user queries, orchestrates the retrieval process, and manages the LLM interaction.
- **Security:** Ensures only authorized relationship managers can access the system.

### 3. Data Ingestion Pipeline
- **Purpose:** Ingests investment policies, tax rules, and product brochures.
- **Process:**
  1. Extract text from various document formats (PDFs, DOCX).
  2. Chunk text into semantically meaningful pieces.
  3. Generate vector embeddings using an embedding model.
  4. Store chunks and metadata in a Vector Database.

### 4. Storage Layer
- **Vector Database:** Pinecone, Qdrant, or PostgreSQL with pgvector for storing document embeddings and executing semantic search.
- **Relational Database:** PostgreSQL for storing user profiles, audit logs, and chat histories.

## Query Flow
1. **Input:** A relationship manager asks a question (e.g., *"What are the tax implications of transferring an ISA?"*).
2. **Embedding:** The Backend Service generates an embedding for the user's query.
3. **Retrieval:** The Vector Database is queried to find the top most relevant document chunks based on semantic similarity.
4. **Generation:** The retrieved chunks are injected into a strict prompt alongside the original query.
5. **Output:** The LLM generates a grounded answer, citing the injected chunks. The answer and citations are returned to the user interface.
