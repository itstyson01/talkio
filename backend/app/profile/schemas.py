from pydantic import BaseModel


class UpdateProfileRequest(BaseModel):
    username: str
    bio: str