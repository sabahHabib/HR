from fastapi import  HTTPException
from sqlalchemy.orm import Session
from ...auth.auth_utils import create_access_token
from ...models import User
from ...utils import password_hashing


class Verification:
    def __init__(self,db: Session):
        self.db = db

    def verify_user(self,username,password):
        user = self.db.query(User).filter(User.email == username).first()
        if not user or not password_hashing.Hash.verify_password(user.hashed_password, password):
            raise HTTPException(status_code=400, detail="Incorrect name or password")

        if not user.is_active:
            raise HTTPException(status_code=400, detail="User is inactive")

        access_token = create_access_token(
            data={"sub": user.email, "role": user.role}
        )

        return {"access_token": access_token, "token_type": "bearer"}



