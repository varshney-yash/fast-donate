from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

MONGODB_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGODB_URL)

db = client.chaljaDB

async def test_async_connection():
    try:
        print("DB connected successfully.")
    except Exception as e:
        print("DB connection failed:", e)

asyncio.create_task(test_async_connection())
