from fastapi import APIRouter, HTTPException
from models import QueryRequest, AnswerResponse
from retrieval import retrieve_documents

router = APIRouter()

@router.post('/ask', response_model=AnswerResponse)
def ask_question(request: QueryRequest):
    if not request.query:
        raise HTTPException(status_code=400, detail='Query cannot be empty')
    docs = retrieve_documents(request.query, request.context)
    return AnswerResponse(answer='Based on approved policies...', citations=[])
