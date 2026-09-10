from fastapi import APIRouter, Depends, HTTPException
from pymongo.errors import DuplicateKeyError

from app.auth.dependencies import get_current_user
from app.database.mongodb import get_users_collection
from app.profile.schemas import UpdateProfileRequest


router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"],
)


@router.put("")
async def update_profile(
    data: UpdateProfileRequest,
    current_user=Depends(get_current_user),
):
    users_collection = get_users_collection()

    try:
        await users_collection.update_one(
            {"_id": current_user["_id"]},
            {
                "$set": {
                    "username": data.username,
                    "bio": data.bio,
                }
            },
        )

    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="Username is already taken",
        )

    return {
        "message": "Profile updated successfully 🚀",
        "username": data.username,
        "bio": data.bio,
    }