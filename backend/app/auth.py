from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from datetime import timedelta
from core.security import settings, get_current_user
from crud import get_user, create_user
from schemas import UserCreate, UserInDB
from core.security import get_password_hash, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register/", status_code=201)
async def register(user: UserCreate):
    db_user = await get_user(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(user.password)
    user_in_db = UserInDB(
        username=user.username,
        hashed_password=hashed_password,
        blood_group=user.blood_group,
        role=user.role
    )
    await create_user(user_in_db)
    return {"username": user.username}

@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user_dict = await get_user(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=404, detail="Username doesn't exist")
    print(user_dict)
    user = UserInDB(**user_dict)
    verified = verify_password(form_data.password, user.hashed_password)
    if not verified:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {
        "access_token": create_access_token(
            user.username, timedelta(settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        ),
        "token_type": "bearer",
    }

@router.get("/welcome")
async def read_items(current_username: str = Depends(get_current_user)):
    return {"message": f"Welcome! {current_username}"}