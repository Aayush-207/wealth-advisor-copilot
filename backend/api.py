from fastapi import APIRouter, HTTPException
from models import QueryRequest, AnswerResponse
from retrieval import retrieve_documents
from rag import generate_answer

router = APIRouter()

@router.post('/ask', response_model=AnswerResponse)
def ask_question(request: QueryRequest):
    if not request.query:
        raise HTTPException(status_code=400, detail='Query cannot be empty')
    docs = retrieve_documents(request.query, request.context)
    answer_text = generate_answer(request.query, docs)
    return AnswerResponse(answer=answer_text, citations=[])
