# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Relationship managers and wealth advisors preparing for or conducting client conversations.

## Product Purpose

A reliable, source-linked advisory assistant designed to help wealth advisors find compliant, sourced answers to client questions based exclusively on approved bank documents.

## Positioning

A conversation with context, grounded in attached references. It strictly cites approved bank documents rather than hallucinating answers, differentiating it from generic AI chatbots.

## Operating Context

Used by advisors during client meetings or while preparing for them to instantly access and reference verified policies, rules, and product structures.

## Capabilities and Constraints

The application is a curated local demo:
- Uses hardcoded responses and JSON documents rather than live AI generation.
- State (history, escalations, reviews) is persisted only in browser `localStorage`.
- No live backend or real database connection is established.

## Brand Commitments

- Name: Wealthdesk
- Voice: Professional, compliant, clear, and supportive.
- Emphasizes that "A little clarity goes a long way" and "Good advice starts with a reliable source."

## Evidence on Hand

- Hardcoded JSON catalog of reference documents (e.g., Taxation, Compliance).
- A set of predefined mock conversations and scenarios.
- The UI contains the exact copies of the documents and page citations in `frontend/src/lib/knowledge.ts`.

## Product Principles

- **Accuracy above all:** Every answer must explicitly tie back to a verified, attached reference.
- **Contextual depth:** Provide not just the bottom-line answer, but the step-by-step reasoning and source evidence.
- **Immediate readiness:** Built for fast retrieval so the advisor is fully prepared before the client asks.
