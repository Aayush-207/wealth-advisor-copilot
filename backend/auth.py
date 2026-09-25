from fastapi import Request, HTTPException

async def verify_token(request: Request):
    token = request.headers.get('Authorization')
    if not token:
        raise HTTPException(status_code=401, detail='Missing token')
    return True
