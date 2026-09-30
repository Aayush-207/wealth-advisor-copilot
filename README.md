# Wealth Advisor Copilot

## Overview
A retail bank's wealth division stores a multitude of investment policies, tax rules, and product brochures. However, relationship managers often provide inconsistent advice because there hasn't been a unified tool to ground their answers in the currently approved material.

The **Wealth Advisor Copilot** solves this problem by using a Retrieval-Augmented Generation (RAG) approach to ingest, index, and retrieve the latest approved documents. It provides a conversational interface for relationship managers to ask questions and receive accurate, grounded, and consistent advice, complete with citations from the source materials.

## Features
- **Document Ingestion:** Connects to internal document stores to ingest policies, rules, and brochures.
- **Semantic Search:** Uses vector embeddings to accurately retrieve relevant passages based on the relationship manager's query.
- **Grounded LLM Responses:** Generates answers strictly from the retrieved context to avoid hallucinations and ensure compliance.
- **Citation and Sourcing:** Every answer provides exact references and links to the source material used, enabling easy verification.

## Future Roadmap
- Implementation of the ingestion pipeline.
- Backend API development.
- Frontend interface design.
