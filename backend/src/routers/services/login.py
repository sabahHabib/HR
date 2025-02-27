from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..models.login_db import Verification
from ...database import get_db


router = APIRouter(tags=["Authentication"])


@router.post("/login")
def login(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = Verification(db)
    return user.verify_user(request.username, request.password)



