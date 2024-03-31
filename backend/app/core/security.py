from datetime import datetime, timedelta
from typing import Any

from jose import jwt
from passlib.context import CryptContext

from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


ALGORITHM = "HS256"


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.utcnow() + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def decode_access_token(token: str) -> str:
    print(token)
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=400, detail="Subject not found in token.")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    return decode_access_token(token)