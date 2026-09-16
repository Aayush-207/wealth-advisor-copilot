from pydantic import BaseModel
from typing import List, Optional

class QueryRequest(BaseModel):
    query: str
    context: Optional[dict] = None

class Citation(BaseModel):
    document_id: str
    text: str

class AnswerResponse(BaseModel):
    answer: str
    citations: List[Citation]
