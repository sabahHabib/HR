from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from ...auth.auth_dependencies import get_current_user
from ...database import get_db
from ...models import User
from ...schemas import LeaveRequest,LeaveResponse
from ..models.leave_db import LeaveRecord

router = APIRouter(tags=['Leave'])


@router.post("/leaves/", response_model=LeaveResponse)
def create_leave_request(leave: LeaveResponse,
                         db: Session = Depends(get_db),
                         current_user: User=Depends(get_current_user)
                         ):
    leaves = LeaveRecord(db)
    return leaves.create_leave(leave,current_user.user_id)


@router.get("/leaves/", response_model=list[LeaveRequest])
def read_leaves(db: Session = Depends(get_db),
                current_user: User=Depends(get_current_user)
                ):
    leaves =  LeaveRecord(db)
    return leaves.get_all_leaves(current_user.user_id)


@router.get("/leaves/{leave_id}", response_model=LeaveRequest)
def read_leave(leave_id: int,
               db: Session = Depends(get_db),
               current_user:User=Depends(get_current_user)
               ):
    leave = LeaveRecord(db)
    leave = leave.get_leave(leave_id,current_user.user_id)
    if leave is None:
        raise HTTPException(status_code=404, detail="Leave not found")
    return leave

@router.put("/leaves/{leave_id}", response_model=LeaveRequest)
def update_leave_request(leave_id: int,
                         leave: LeaveResponse,
                         db: Session = Depends(get_db),
                         current_user: User = Depends(get_current_user)
                         ):
    leaves = LeaveRecord(db)
    db_leave = leaves.update_leave(leave_id, leave,current_user.user_id)

    return db_leave


@router.delete("/leaves/{leave_id}", response_model=LeaveRequest)
def delete_leave_request(leave_id: int,
                         db: Session = Depends(get_db),
                         current_user:User=Depends(get_current_user)
                         ):
    leave = LeaveRecord(db)
    db_leave = leave.delete_leave(leave_id, current_user.user_id)

    return db_leave