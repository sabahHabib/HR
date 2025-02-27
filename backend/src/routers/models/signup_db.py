from fastapi import HTTPException
from sqlalchemy.orm import Session
from ...models import User
from ...utils import password_hashing


class Signup:
    def __init__(self,db:Session):
        self.db = db

    def create_user(self,username,email,password):
        db_user = self.db.query(User).filter(User.email == email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="email already registered")
        hashed_password = password_hashing.Hash.get_password_hash(password)
        db_user = User(name=username, email=email, hashed_password=hashed_password)
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user