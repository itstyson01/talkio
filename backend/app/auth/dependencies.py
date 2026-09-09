from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

import jwt

from app.auth.jwt import ALGORITHM
from app.core.config import JWT_SECRET_KEY
from app.database.mongodb import get_users_collection


security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired",
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    users_collection = get_users_collection()

    user = await users_collection.find_one(
        {"_id": __import__("bson").ObjectId(user_id)}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return user