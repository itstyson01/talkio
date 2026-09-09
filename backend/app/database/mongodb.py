from pymongo import AsyncMongoClient

from app.core.config import MONGODB_URI


client = AsyncMongoClient(MONGODB_URI)


async def connect_to_mongodb():
    await client.admin.command("ping")

    users_collection = get_users_collection()

    await users_collection.create_index(
        "email",
        unique=True,
    )

    await users_collection.create_index(
        "username",
        unique=True,
    )

    print("MongoDB connected successfully 🚀")


async def close_mongodb_connection():
    await client.close()
    print("MongoDB connection closed.")


def get_database():
    return client["talkio"]


def get_users_collection():
    return get_database()["users"]