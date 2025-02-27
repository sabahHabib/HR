from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..helpers.attendance_utils import get_time_in, get_session_time, get_time_out
from ...models import User, Attendance


class AttendanceRecord:
    def __init__(self, db: Session):
        self.db = db

    def check_in(self, user_id):
        db_employee = (self.db.query(User)
                       .filter(User.user_id == user_id)
                       .first())

        if not db_employee:
            raise HTTPException(status_code=404,
                                detail=f"User with ID {user_id} not found")

        active_attendance = self.db.query(Attendance).filter(
            Attendance.user_id == user_id,
            Attendance.check_out == None).first()

        if active_attendance:
            raise HTTPException(status_code=400,
                                detail="User already clocked in")

        time_in,now = get_time_in()

        new_attendance = Attendance(
            user_id=user_id,
            check_in=time_in,
            date=now.date(),
        )
        try:
            self.db.add(new_attendance)
            self.db.commit()
            self.db.refresh(new_attendance)

        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500,
                                detail="An error occurred while clocking in")

        return new_attendance

    def check_out(self, user_id):
        db_employee = (self.db.query(User)
                       .filter(User.user_id == user_id)
                       .first())

        if not db_employee:
            raise HTTPException(status_code=404,
                                detail=f"User with ID {user_id} not found")

        active_attendance = (self.db.query(Attendance)
                             .filter(Attendance.user_id == user_id,
                                              Attendance.check_out == None)
                             .first()
                             )

        if not active_attendance:
            raise HTTPException(status_code=400, detail="No clock-in record found")

        active_attendance.check_out = get_time_out()
        active_attendance.total_time = get_session_time(active_attendance.check_in,
                                                        active_attendance.check_out)

        try:
            self.db.commit()
            self.db.refresh(active_attendance)

        except Exception as e:
            self.db.rollback()

            raise HTTPException(status_code=500,
                                detail="An error occurred while clocking out")

        return active_attendance

    def get_attendance(self, user_id):
        db_employee = self.db.query(User).filter(
            User.user_id == user_id).first()

        if not db_employee:
            raise HTTPException(status_code=404,
                                detail=f"User with ID {user_id} not found")

        attendance = self.db.query(Attendance).filter(
            Attendance.user_id == user_id).order_by(
            Attendance.date).all()

        if not attendance:
            return {"message": f" {user_id} has no attendance records."}

        return attendance

    def update_attendance(self,attendance_id,user_id,attendance_update):
        db_attendance = self.db.query(Attendance).filter(
            Attendance.id == attendance_id).first()

        if not db_attendance:
            raise HTTPException(status_code=404,
                                detail="Attendance record not found")

        if db_attendance.user_id != user_id:
            raise HTTPException(status_code=403,
                                detail="Not authorized to update this record")

        if attendance_update.check_out:
            db_attendance.total_time = get_session_time(db_attendance.check_in,
                                                        db_attendance.check_out)

        if db_attendance:
            for key, value in attendance_update.dict().items():
                setattr(db_attendance, key, value)
        try:
            self.db.commit()
            self.db.refresh(db_attendance)

        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500,
                                detail="An error occurred while updating the record")

        return db_attendance







