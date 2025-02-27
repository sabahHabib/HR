from fastapi import HTTPException
from sqlalchemy.orm import Session
from ...models import User, Profile


class AdminRole:
    def __init__(self,db:Session):
        self.db = db

    def deactivate_user(self,user_id):
        user = (self.db.query(User)
                .filter(User.user_id == user_id)
                .first()
                )
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.is_active = False
        self.db.commit()
        return {"message": f"User {user.email} deactivated"}

    def promote_to_admin(self,user_id):
        user = (self.db.query(User)
                .filter(User.user_id == user_id)
                .first()
                )
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.role = "admin"
        self.db.commit()
        return {"message": f"User {user.name} promoted to admin"}



    def activate_user(self,user_id):
        user = (self.db.query(User)
                .filter(User.user_id == user_id)
                .first()
                )
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.is_active = True
        self.db.commit()
        return {"message": f"User {user.email} activated"}

    def get_user(self):
        user = self.db.query(User).all()
        return user


    def get_user_data(self,user_id):
        user = (self.db.query(Profile)
                .filter(Profile.user_id == user_id)
                .first()
                )
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
