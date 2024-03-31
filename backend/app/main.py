from fastapi import FastAPI
import auth
from starlette.middleware.cors import CORSMiddleware

from core.config import settings

app = FastAPI()

origins = [
    "http://localhost:5173",  # Replace with your React app's URL
    "http://localhost:3000",  # If you're running React on a different port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)