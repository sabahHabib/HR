from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import time,date
from pydantic_extra_types.phone_numbers import PhoneNumber


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    username:EmailStr
    password: str


class UserOut(BaseModel):
    name: str
    email: str
    role: str
    class Config:
        from_attributes = True


class Profile(BaseModel):
    cnic: str
    phone_no: Optional[PhoneNumber] | None = None
    address: Optional[str] | None =None
    blood_group: Optional[str] | None= None
    gender: Optional[str] | None = None
    department: Optional[str] | None =None
    image_url: Optional[str] | None =None

    class Config:
        from_attributes = True


class ProfileCreate(Profile):
    user_id: int

class ProfileShow(Profile):
    user_id:int
    user:UserOut

    class Config:
        from_attributes = True

class Attendance(BaseModel):
    id:int
    check_in: time
    check_out: Optional[time]= None
    total_time:Optional[str] = None
    date: date

    class Config:
        from_attributes = True


class AttendanceOut(BaseModel):
    attendance: List[Attendance] = []

class AttendanceUpdate(BaseModel):

    check_in: Optional[time] = None
    check_out: Optional[time] = None


class LeaveResponse(BaseModel):
    from_date: date
    to_date: date
    leave_type: str
    leave_status: str
    replacement_if: Optional[str] = None
    contact_landline: Optional[str] = None
    contact_phone: str
    personal_email: str
    address_during_leave: Optional[str] = None
    purpose: str

    class Config:
        from_attributes = True

class LeaveRequest(LeaveResponse):
     id: int


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[str] = None


