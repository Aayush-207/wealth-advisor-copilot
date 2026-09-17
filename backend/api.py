from fastapi import APIRouter
from models import QueryRequest, AnswerResponse
from retrieval import retrieve_documents

router = APIRouter()

@app.post('/ask', response_model=AnswerResponse)
def ask_question(request: QueryRequest):
    docs = retrieve_documents(request.query, request.context)
    return AnswerResponse(answer='Based on approved policies...', citations=[])
