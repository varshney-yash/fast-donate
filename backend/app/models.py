from pydantic import BaseModel

class User(BaseModel):
    username: str
    blood_group: str
    role: str
    hashed_password: str