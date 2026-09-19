from fastapi import FastAPI
from api import router

app = FastAPI(title='Wealth Knowledge Assistant API')
app.include_router(router)

@app.get('/')
def read_root():
    return {'status': 'ok'}
