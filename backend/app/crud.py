from core.database import db
from schemas import UserInDB

async def get_user(username: str):
    return await db["users"].find_one({"username": username})

async def create_user(user: UserInDB):
    await db["users"].insert_one(user.model_dump())