from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    blood_group: str
    role: str

class UserInDB(BaseModel):
    username: str
    hashed_password: str
    blood_group: str
    role: str