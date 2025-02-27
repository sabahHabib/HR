from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from ..models.signup_db import Signup
from ...database import get_db
from ...schemas import UserCreate,UserOut


router = APIRouter(tags=['Signup'])



@router.post("/register", response_model=UserOut)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    db_user = Signup(db)
    return db_user.create_user(user.name, user.email,user.password)


