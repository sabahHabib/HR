from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from ..models.admin_db import AdminRole
from ..models.attendance_db import AttendanceRecord
from ..models.leave_db import LeaveRecord
from ... import schemas
from ...auth.auth_dependencies import require_role
from ...database import get_db
from typing import List

from ...schemas import UserOut

router = APIRouter(tags=['Admin'])


@router.post("/deactivate/{user_id}")
def deactivate_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(require_role("admin")),
):
    user = AdminRole(db)
    return user.deactivate_user(user_id)

@router.post("/activate/{user_id}")
def activate_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin")),
):
    user = AdminRole(db)
    return user.activate_user(user_id)



@router.post("/promote-to-admin/{user_id}")
def promote_to_admin(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin")),
):
    user = AdminRole(db)
    return user.promote_to_admin(user_id)


@router.get("/attendance/{user_id}",response_model=List[schemas.Attendance])
def get_attendance(user_id:int,db:Session = Depends(get_db),
                   current_user= Depends(require_role("admin"))):
    db_employee = AttendanceRecord(db)
    return db_employee.get_attendance(user_id)


@router.get("/leave/{user_id}",response_model=List[schemas.LeaveRequest])
def get_leave(user_id:int,db:Session = Depends(get_db),
              current_user = Depends(require_role('admin'))):
    leaves = LeaveRecord(db)
    return leaves.get_all_leaves(user_id)

@router.get("/user",response_model=List[schemas.UserOut])
def get_user(db:Session = Depends(get_db),
             current_user = Depends(require_role('admin'))):
    user =AdminRole(db)
    return user.get_user()

@router.get("/user/{user_id}",response_model=schemas.ProfileShow)
def get_user_data(user_id:int,db:Session = Depends(get_db),
             current_user = Depends(require_role('admin'))):
    user =AdminRole(db)
    return user.get_user_data(user_id)