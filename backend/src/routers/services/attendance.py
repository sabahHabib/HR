from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session

from ..models.attendance_db import AttendanceRecord
from ... import schemas
from ...auth.auth_dependencies import get_current_user
from ...models import User
from ...database import get_db
from typing import List

router = APIRouter(tags=['Attendance'])

@router.post("/check-in/",
             response_model= schemas.Attendance)
async def time_in(db:Session= Depends(get_db),
                  current_user= Depends(get_current_user)):

    employee = AttendanceRecord(db)

    return employee.check_in(current_user.user_id)


@router.post("/check-out/",
             response_model=schemas.Attendance)
async def time_out(db:Session= Depends(get_db),
                   current_user: User = Depends(get_current_user)):

    employee = AttendanceRecord(db)

    return employee.check_out(current_user.user_id)



@router.get("/get-record/",
            response_model=List[schemas.Attendance])
async def get_attendance(db:Session= Depends(get_db),
                         current_user: User = Depends(get_current_user)):

    employee = AttendanceRecord(db)

    return employee.get_attendance(current_user.user_id)



@router.put("/update-record/{attendance_id}",
            response_model=schemas.Attendance)
async def update_attendance(
    attendance_id: int,
    attendance_update: schemas.AttendanceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_attendance = AttendanceRecord(db)

    return db_attendance.update_attendance(attendance_id,current_user.user_id,attendance_update)
