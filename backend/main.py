from fastapi import FastAPI
from api import router as api_router
from ingestion import router as ingestion_router

app = FastAPI(title='Wealth Knowledge Assistant API')
app.include_router(api_router)
app.include_router(ingestion_router, prefix='/admin')

@app.get('/')
def read_root():
    return {'status': 'ok'}
