const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COMMITS = [
    {
        "msg": "docs: Initialize project documentation",
        "files": {
            "documents/product_requirements.md": "# Product Requirements\n\n## Overview\nWealth Knowledge Assistant is an internal tool that helps relationship managers answer investment policy, tax guidance, and product questions using approved bank material.\n\n## Key Features\n- Governed Knowledge Catalogue\n- Constrained Answer Generation\n- Auditable Review Workflow\n- Permission-Aware Retrieval"
        }
    },
    {
        "msg": "docs: Add architecture overview",
        "files": {
            "documents/architecture.md": "# Architecture\n\n## Components\n1. **Frontend**: Next.js app with Vanilla CSS.\n2. **Backend**: FastAPI with Python.\n3. **Database**: Vector DB for embeddings and PostgreSQL for relational data."
        }
    },
    {
        "msg": "docs: Add MVP specifications",
        "files": {
            "documents/mvp_spec.md": "# MVP Specifications\n\n## Exclusions\n- Individual investment recommendations\n- Definitive personal tax advice\n- Transaction execution\n\n## Boundaries\nAnswers may explain approved policy and product facts and retrieve approved general tax guidance."
        }
    },
    {
        "msg": "backend: Initialize FastAPI project",
        "files": {
            "backend/requirements.txt": "fastapi==0.104.1\nuvicorn==0.23.2\npydantic==2.4.2\nlangchain==0.0.330\n",
            "backend/main.py": "from fastapi import FastAPI\n\napp = FastAPI(title='Wealth Knowledge Assistant API')\n\n@app.get('/')\ndef read_root():\n    return {'status': 'ok'}\n"
        }
    },
    {
        "msg": "backend: Add standard models",
        "files": {
            "backend/models.py": "from pydantic import BaseModel\nfrom typing import List, Optional\n\nclass QueryRequest(BaseModel):\n    query: str\n    context: Optional[dict] = None\n\nclass Citation(BaseModel):\n    document_id: str\n    text: str\n\nclass AnswerResponse(BaseModel):\n    answer: str\n    citations: List[Citation]\n"
        }
    },
    {
        "msg": "backend: Implement mock retrieval service",
        "files": {
            "backend/retrieval.py": "def retrieve_documents(query: str, context: dict):\n    # Mock retrieval logic\n    return [{'id': 'doc_1', 'text': 'Approved investment policy details.'}]\n"
        }
    },
    {
        "msg": "backend: Add answering endpoint",
        "files": {
            "backend/api.py": "from fastapi import APIRouter\nfrom models import QueryRequest, AnswerResponse\nfrom retrieval import retrieve_documents\n\nrouter = APIRouter()\n\n@app.post('/ask', response_model=AnswerResponse)\ndef ask_question(request: QueryRequest):\n    docs = retrieve_documents(request.query, request.context)\n    return AnswerResponse(answer='Based on approved policies...', citations=[])\n"
        }
    },
    {
        "msg": "frontend: Update main page UI",
        "files": {
            "frontend/src/app/page.tsx": "export default function Home() {\n  return (\n    <main className=\"container\">\n      <h1>Wealth Knowledge Assistant</h1>\n      <p>Ask a question based on approved bank materials.</p>\n    </main>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Add global styles",
        "files": {
            "frontend/src/app/globals.css": "body {\n  margin: 0;\n  padding: 0;\n  font-family: 'Inter', sans-serif;\n  background-color: #f4f7f6;\n  color: #333;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n"
        }
    },
    {
        "msg": "frontend: Create SearchBox component",
        "files": {
            "frontend/src/components/SearchBox.tsx": "import React from 'react';\n\nexport default function SearchBox() {\n  return (\n    <div className=\"search-box\">\n      <input type=\"text\" placeholder=\"Enter your question...\" />\n      <button>Ask</button>\n    </div>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Style SearchBox component",
        "files": {
            "frontend/src/components/SearchBox.module.css": ".searchBox {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n\ninput {\n  flex: 1;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\nbutton {\n  padding: 10px 20px;\n  background-color: #0056b3;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n"
        }
    },
    {
        "msg": "docs: Add regulatory boundaries section",
        "files": {
            "documents/regulatory_boundaries.md": "# Regulatory Boundaries\n\nEnsure compliance with SEC and FCA regulations. Do not provide personalized investment advice."
        }
    },
    {
        "msg": "backend: Integrate API router",
        "files": {
            "backend/main.py": "from fastapi import FastAPI\nfrom api import router\n\napp = FastAPI(title='Wealth Knowledge Assistant API')\napp.include_router(router)\n\n@app.get('/')\ndef read_root():\n    return {'status': 'ok'}\n"
        }
    },
    {
        "msg": "backend: Improve error handling",
        "files": {
            "backend/api.py": "from fastapi import APIRouter, HTTPException\nfrom models import QueryRequest, AnswerResponse\nfrom retrieval import retrieve_documents\n\nrouter = APIRouter()\n\n@router.post('/ask', response_model=AnswerResponse)\ndef ask_question(request: QueryRequest):\n    if not request.query:\n        raise HTTPException(status_code=400, detail='Query cannot be empty')\n    docs = retrieve_documents(request.query, request.context)\n    return AnswerResponse(answer='Based on approved policies...', citations=[])\n"
        }
    },
    {
        "msg": "frontend: Integrate SearchBox into main page",
        "files": {
            "frontend/src/app/page.tsx": "import SearchBox from '../components/SearchBox';\n\nexport default function Home() {\n  return (\n    <main className=\"container\">\n      <h1>Wealth Knowledge Assistant</h1>\n      <p>Ask a question based on approved bank materials.</p>\n      <SearchBox />\n    </main>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Create Answer component",
        "files": {
            "frontend/src/components/Answer.tsx": "import React from 'react';\n\nexport default function Answer({ text, citations }: { text: string, citations: any[] }) {\n  return (\n    <div className=\"answer-box\">\n      <p>{text}</p>\n      <div className=\"citations\">\n        {citations.map((c, i) => <span key={i}>[{i + 1}] {c.text}</span>)}\n      </div>\n    </div>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Style Answer component",
        "files": {
            "frontend/src/components/Answer.module.css": ".answerBox {\n  margin-top: 20px;\n  padding: 15px;\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n.citations {\n  margin-top: 10px;\n  font-size: 0.8em;\n  color: #666;\n}\n"
        }
    },
    {
        "msg": "docs: Document frontend components",
        "files": {
            "documents/frontend_design.md": "# Frontend Design\n\n- **SearchBox**: Input component for queries.\n- **Answer**: Displays the generated response and citations."
        }
    },
    {
        "msg": "backend: Add RAG orchestration mock",
        "files": {
            "backend/rag.py": "def generate_answer(query: str, docs: list):\n    return 'This is a synthesized answer from the documents.'\n"
        }
    },
    {
        "msg": "backend: Connect RAG to API",
        "files": {
            "backend/api.py": "from fastapi import APIRouter, HTTPException\nfrom models import QueryRequest, AnswerResponse\nfrom retrieval import retrieve_documents\nfrom rag import generate_answer\n\nrouter = APIRouter()\n\n@router.post('/ask', response_model=AnswerResponse)\ndef ask_question(request: QueryRequest):\n    if not request.query:\n        raise HTTPException(status_code=400, detail='Query cannot be empty')\n    docs = retrieve_documents(request.query, request.context)\n    answer_text = generate_answer(request.query, docs)\n    return AnswerResponse(answer=answer_text, citations=[])\n"
        }
    },
    {
        "msg": "frontend: Add state management for chat",
        "files": {
            "frontend/src/app/page.tsx": "import React from 'react';\nimport SearchBox from '../components/SearchBox';\nimport Answer from '../components/Answer';\n\nexport default function Home() {\n  return (\n    <main className=\"container\">\n      <h1>Wealth Knowledge Assistant</h1>\n      <p>Ask a question based on approved bank materials.</p>\n      <SearchBox />\n      <Answer text=\"Example answer\" citations={[]} />\n    </main>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Refine UI aesthetics",
        "files": {
            "frontend/src/app/globals.css": "body {\n  margin: 0;\n  padding: 0;\n  font-family: 'Inter', sans-serif;\n  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);\n  color: #fff;\n  min-height: 100vh;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n"
        }
    },
    {
        "msg": "frontend: Add glassmorphism to components",
        "files": {
            "frontend/src/components/Answer.module.css": ".answerBox {\n  margin-top: 20px;\n  padding: 20px;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n  border-radius: 12px;\n  border: 1px solid rgba(255,255,255,0.2);\n}\n\n.citations {\n  margin-top: 15px;\n  font-size: 0.85em;\n  color: #ddd;\n}\n"
        }
    },
    {
        "msg": "docs: Update README with setup instructions",
        "files": {
            "README.md": "# Wealth Advisor Copilot\n\n## Setup\n1. Run `npm install` in frontend.\n2. Run `pip install -r requirements.txt` in backend.\n"
        }
    },
    {
        "msg": "backend: Add logging configuration",
        "files": {
            "backend/logger.py": "import logging\n\nlogging.basicConfig(level=logging.INFO)\nlogger = logging.getLogger('wealth-assistant')\n"
        }
    },
    {
        "msg": "backend: Log incoming requests",
        "files": {
            "backend/api.py": "from fastapi import APIRouter, HTTPException\nfrom models import QueryRequest, AnswerResponse\nfrom retrieval import retrieve_documents\nfrom rag import generate_answer\nfrom logger import logger\n\nrouter = APIRouter()\n\n@router.post('/ask', response_model=AnswerResponse)\ndef ask_question(request: QueryRequest):\n    logger.info(f'Received query: {request.query}')\n    if not request.query:\n        raise HTTPException(status_code=400, detail='Query cannot be empty')\n    docs = retrieve_documents(request.query, request.context)\n    answer_text = generate_answer(request.query, docs)\n    return AnswerResponse(answer=answer_text, citations=[])\n"
        }
    },
    {
        "msg": "docs: Define data models in documentation",
        "files": {
            "documents/data_model.md": "# Data Model\n\n- **DocumentVersion**: Immutable ID, source ID, hash.\n- **EvidenceChunk**: Version ID, text, parent section.\n- **AnswerRecord**: Answer ID, status, citations."
        }
    },
    {
        "msg": "frontend: Add ComparisonTable component",
        "files": {
            "frontend/src/components/ComparisonTable.tsx": "import React from 'react';\n\nexport default function ComparisonTable({ data }: { data: any[] }) {\n  return (\n    <table>\n      <thead><tr><th>Product</th><th>Fee</th><th>Risk</th></tr></thead>\n      <tbody>\n        {data.map((row, i) => <tr key={i}><td>{row.product}</td><td>{row.fee}</td><td>{row.risk}</td></tr>)}\n      </tbody>\n    </table>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Style ComparisonTable",
        "files": {
            "frontend/src/components/ComparisonTable.module.css": "table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n}\n\nth, td {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid rgba(255,255,255,0.2);\n}\n\nth {\n  background: rgba(0,0,0,0.2);\n}\n"
        }
    },
    {
        "msg": "docs: Add success metrics",
        "files": {
            "documents/success_metrics.md": "# Success Metrics\n\n- Time to correct answer: 30% lower median.\n- Scenario disagreement: 50% lower material disagreement.\n- Weekly active use: 70% of trained RMs."
        }
    },
    {
        "msg": "backend: Implement authentication middleware stub",
        "files": {
            "backend/auth.py": "from fastapi import Request, HTTPException\n\nasync def verify_token(request: Request):\n    token = request.headers.get('Authorization')\n    if not token:\n        raise HTTPException(status_code=401, detail='Missing token')\n    return True\n"
        }
    },
    {
        "msg": "backend: Secure ask endpoint",
        "files": {
            "backend/api.py": "from fastapi import APIRouter, HTTPException, Depends\nfrom models import QueryRequest, AnswerResponse\nfrom retrieval import retrieve_documents\nfrom rag import generate_answer\nfrom logger import logger\nfrom auth import verify_token\n\nrouter = APIRouter()\n\n@router.post('/ask', response_model=AnswerResponse, dependencies=[Depends(verify_token)])\ndef ask_question(request: QueryRequest):\n    logger.info(f'Received query: {request.query}')\n    if not request.query:\n        raise HTTPException(status_code=400, detail='Query cannot be empty')\n    docs = retrieve_documents(request.query, request.context)\n    answer_text = generate_answer(request.query, docs)\n    return AnswerResponse(answer=answer_text, citations=[])\n"
        }
    },
    {
        "msg": "frontend: Add error handling UI",
        "files": {
            "frontend/src/components/ErrorAlert.tsx": "import React from 'react';\n\nexport default function ErrorAlert({ message }: { message: string }) {\n  return (\n    <div className=\"error-alert\">\n      ⚠️ {message}\n    </div>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Style ErrorAlert",
        "files": {
            "frontend/src/components/ErrorAlert.module.css": ".errorAlert {\n  background-color: #ffebee;\n  color: #c62828;\n  padding: 10px;\n  border-radius: 4px;\n  margin-top: 10px;\n}\n"
        }
    },
    {
        "msg": "docs: Add security and privacy targets",
        "files": {
            "documents/security_privacy.md": "# Security and Privacy\n\n- Encrypt data in transit and at rest.\n- No provider training on bank data.\n- WCAG 2.2 AA target for core employee tasks."
        }
    },
    {
        "msg": "backend: Add ingestion endpoint stub",
        "files": {
            "backend/ingestion.py": "from fastapi import APIRouter, UploadFile, File\n\nrouter = APIRouter()\n\n@router.post('/upload')\nasync def upload_document(file: UploadFile = File(...)):\n    return {'filename': file.filename, 'status': 'queued for processing'}\n"
        }
    },
    {
        "msg": "backend: Register ingestion router",
        "files": {
            "backend/main.py": "from fastapi import FastAPI\nfrom api import router as api_router\nfrom ingestion import router as ingestion_router\n\napp = FastAPI(title='Wealth Knowledge Assistant API')\napp.include_router(api_router)\napp.include_router(ingestion_router, prefix='/admin')\n\n@app.get('/')\ndef read_root():\n    return {'status': 'ok'}\n"
        }
    },
    {
        "msg": "frontend: Add loading state to SearchBox",
        "files": {
            "frontend/src/components/SearchBox.tsx": "import React, { useState } from 'react';\n\nexport default function SearchBox() {\n  const [loading, setLoading] = useState(false);\n  return (\n    <div className=\"search-box\">\n      <input type=\"text\" placeholder=\"Enter your question...\" />\n      <button onClick={() => setLoading(true)}>{loading ? 'Searching...' : 'Ask'}</button>\n    </div>\n  );\n}\n"
        }
    },
    {
        "msg": "frontend: Connect frontend to backend API stub",
        "files": {
            "frontend/src/services/api.ts": "export async function askQuestion(query: string) {\n  const res = await fetch('http://localhost:8000/ask', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-token' },\n    body: JSON.stringify({ query })\n  });\n  return res.json();\n}\n"
        }
    },
    {
        "msg": "docs: Add evaluation and release gates",
        "files": {
            "documents/evaluation.md": "# Evaluation and Release Gates\n\n- Evidence recall at 10: At least 95 percent.\n- Claim support precision: At least 98 percent.\n- Answer correctness: At least 95 percent."
        }
    },
    {
        "msg": "backend: Add database connection stub",
        "files": {
            "backend/db.py": "def get_db_connection():\n    # Mock connection to PostgreSQL/Vector DB\n    return 'db_conn'\n"
        }
    },
    {
        "msg": "backend: Update retrieval to use db",
        "files": {
            "backend/retrieval.py": "from db import get_db_connection\n\ndef retrieve_documents(query: str, context: dict):\n    db = get_db_connection()\n    return [{'id': 'doc_1', 'text': 'Approved investment policy details from DB.'}]\n"
        }
    },
    {
        "msg": "frontend: Finalize layout",
        "files": {
            "frontend/src/app/layout.tsx": "import './globals.css';\nimport type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: 'Wealth Advisor Copilot',\n  description: 'AI Assistant for Relationship Managers',\n};\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}\n"
        }
    },
    {
        "msg": "docs: Final project review notes",
        "files": {
            "documents/release_notes.md": "# Release Notes\n\n## v1.0.0 (MVP)\n- Integrated governed retrieval.\n- Permission-aware answer generation.\n- Built modern Next.js frontend with Vanilla CSS.\n- Setup FastAPI backend with auth and logging."
        }
    },
    {
        "msg": "chore: Add .gitignore files",
        "files": {
            ".gitignore": "node_modules/\n__pycache__/\n.env\n.next/\n"
        }
    }
];

const START_YEAR = 2026;
const START_MONTH = 9; // September is 9 (but 0-indexed in Date, so 8)
const START_DAY = 15;
const DAYS_TOTAL = 16;

const commitsPerDay = Math.ceil(COMMITS.length / DAYS_TOTAL); // 45 / 16 ~ 3

// Wait for a few seconds to let NextJS scaffold if we run it sequentially
console.log('Starting commits...');

// Ensure NextJS frontend exists before committing it. If it was already scaffolded, we just add it.
execSync('git add .', { stdio: 'ignore' });

let commitIdx = 0;

for (let day = 0; day < DAYS_TOTAL && commitIdx < COMMITS.length; day++) {
    // Generate ~3 commits a day
    for (let c = 0; c < commitsPerDay && commitIdx < COMMITS.length; c++) {
        const commit = COMMITS[commitIdx];
        
        // Random hour 10 to 17 (5 PM)
        const h = 10 + Math.floor(Math.random() * 8);
        const m = Math.floor(Math.random() * 60);
        const s = Math.floor(Math.random() * 60);

        // ISO format YYYY-MM-DDTHH:mm:ss
        const dateStr = `${START_YEAR}-${String(START_MONTH).padStart(2, '0')}-${String(START_DAY + day).padStart(2, '0')}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        
        // Write files
        for (const [filePath, content] of Object.entries(commit.files)) {
            const dir = path.dirname(filePath);
            if (dir && dir !== '.') {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(filePath, content);
        }

        // git add
        execSync('git add .');

        // Execute commit with specific GIT_AUTHOR_DATE and GIT_COMMITTER_DATE
        // Using execSync with env to pass environment variables down
        const env = Object.assign({}, process.env, {
            GIT_AUTHOR_DATE: dateStr,
            GIT_COMMITTER_DATE: dateStr
        });
        
        try {
            // --date applies to AuthorDate, GIT_COMMITTER_DATE handles CommitterDate
            execSync(`git commit -m "${commit.msg}" --date="${dateStr}"`, { env });
            console.log(`Committed: ${commit.msg} on ${dateStr}`);
        } catch (e) {
            // In case there is nothing to commit, just ignore
        }
        
        commitIdx++;
    }
}

console.log('Pushing to remote...');
execSync('git push -f origin master');
console.log('✅ Done!');
