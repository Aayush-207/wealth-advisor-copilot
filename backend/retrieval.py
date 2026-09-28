from db import get_db_connection

def retrieve_documents(query: str, context: dict):
    db = get_db_connection()
    return [{'id': 'doc_1', 'text': 'Approved investment policy details from DB.'}]
