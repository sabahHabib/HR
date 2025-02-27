from fastapi import HTTPException
from sqlalchemy.orm import Session

from ...models import Leave

class LeaveRecord:
    def __init__(self,db:Session):
        self.db = db


    def create_leave(self, leave, user_id):

        db_leave = Leave(**leave.dict(), user_id=user_id,)
        self.db.add(db_leave)
        self.db.commit()
        self.db.refresh(db_leave)
        return db_leave


    def get_leave(self,leave_id: int,user_id):
        return self.db.query(Leave).filter(
            Leave.id == leave_id,
            Leave.user_id == user_id ).first()



    def get_all_leaves(self,user_id):
        return self.db.query(Leave).filter(
            Leave.user_id==user_id).all()


    def update_leave(self,leave_id: int, leave,user_id):
        db_leave = self.db.query(Leave).filter(
            Leave.id == leave_id,
            Leave.user_id==user_id).first()
        if db_leave is None:
            raise HTTPException(status_code=404, detail="Leave not found")

        for key, value in leave.dict().items():
            setattr(db_leave, key, value)

        self.db.commit()
        self.db.refresh(db_leave)

        return db_leave



    def delete_leave(self,leave_id: int,user_id):
        db_leave = self.db.query(Leave).filter(
            Leave.id == leave_id,
            Leave.user_id == user_id).first()

        if db_leave is None:
            raise HTTPException(status_code=404, detail="Leave not found")

        self.db.delete(db_leave)
        self.db.commit()

        return db_leave