from fastapi import APIRouter, HTTPException, Depends
from models import QueryRequest, AnswerResponse
from retrieval import retrieve_documents
from rag import generate_answer
from logger import logger
from auth import verify_token

router = APIRouter()

@router.post('/ask', response_model=AnswerResponse, dependencies=[Depends(verify_token)])
def ask_question(request: QueryRequest):
    logger.info(f'Received query: {request.query}')
    if not request.query:
        raise HTTPException(status_code=400, detail='Query cannot be empty')
    docs = retrieve_documents(request.query, request.context)
    answer_text = generate_answer(request.query, docs)
    return AnswerResponse(answer=answer_text, citations=[])
