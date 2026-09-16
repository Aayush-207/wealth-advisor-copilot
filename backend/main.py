from fastapi import FastAPI

app = FastAPI(title='Wealth Knowledge Assistant API')

@app.get('/')
def read_root():
    return {'status': 'ok'}
