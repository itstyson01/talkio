from fastapi import APIRouter, Depends, HTTPException

from app.auth.dependencies import get_current_user
from app.auth.jwt import create_access_token
from app.auth.password import hash_password, verify_password
from app.auth.schemas import LoginRequest, RegisterRequest
from app.database.mongodb import get_users_collection


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.get("/test")
async def auth_test():
    return {
        "message": "Authentication router is working 🚀"
    }


@router.post("/register")
async def register_user(data: RegisterRequest):
    users_collection = get_users_collection()

    existing_user = await users_collection.find_one(
        {"email": data.email}
    )

    if existing_user:
        return {
            "message": "User with this email already exists"
        }

    hashed_password = hash_password(data.password)

    user = {
    "username": data.username,
    "email": data.email,
    "password": hashed_password,
    "bio": "",
    "profile_picture": None,
    }

    result = await users_collection.insert_one(user)

    return {
        "message": "User registered successfully 🚀",
        "user_id": str(result.inserted_id),
    }


@router.post("/login")
async def login_user(data: LoginRequest):
    users_collection = get_users_collection()

    user = await users_collection.find_one(
        {"email": data.email}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    password_is_correct = verify_password(
        data.password,
        user["password"],
    )

    if not password_is_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        str(user["_id"])
    )

    return {
        "message": "Login successful 🚀",
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me")
async def get_me(
    current_user=Depends(get_current_user),
):
    return {
        "id": str(current_user["_id"]),
        "username": current_user["username"],
        "email": current_user["email"],
        "bio": current_user.get("bio", ""),
        "profile_picture": current_user.get("profile_picture"),
    }