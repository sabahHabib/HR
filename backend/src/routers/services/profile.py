from fastapi import Depends, status, APIRouter, File, UploadFile,Form
from sqlalchemy.orm import Session
from ..models.profile_db import Profile
from ...auth.auth_dependencies import get_current_user
from ...database import get_db
from ... import schemas

router = APIRouter(tags=['profile'])


@router.post('/profile',
             status_code=status.HTTP_201_CREATED,
             response_model=schemas.Profile)

async def create_profile(
        cnic: str = Form(...),
        phone_no: str = Form(None),
        address: str = Form(None),
        blood_group: str = Form(None),
        gender: str = Form(None),
        department: str = Form(None),
        db: Session = Depends(get_db),
        current_user: schemas.UserOut = Depends(get_current_user),
        file:UploadFile=File(None)
):

    profile_manager = Profile(db)
    return profile_manager.create_profile(
        cnic,
        phone_no,
        address,
        blood_group,
        gender,
        department,
        current_user.user_id,
        file
    )


"""@router.get('/profile',
            response_model=schemas.ProfileShow)

def get_profile(
        db: Session = Depends(get_db),
        current_user: schemas.UserOut = Depends(get_current_user)
):
    profile = Profile(db)
    return profile.get_profile(current_user.user_id)"""


@router.get('/profile', response_model=schemas.ProfileShow)
def get_profile(
        db: Session = Depends(get_db),
        current_user: schemas.UserOut = Depends(get_current_user)
):
    profile = Profile(db)
    user_profile = profile.get_profile(current_user.user_id)

    return user_profile


"""@router.put('/profile', response_model=schemas.Profile)
def update_profile(
        profile_data: schemas.Profile,
        db: Session = Depends(get_db),
        current_user: schemas.UserOut = Depends(get_current_user),
):
    updated_profile = Profile(db)
    return updated_profile.update_profile(profile_data, current_user.user_id)"""


@router.put('/profile',
            status_code=status.HTTP_200_OK,
            response_model=schemas.ProfileShow)
async def update_profile(
        cnic: str = Form(...),
        phone_no: str = Form(None),
        address: str = Form(None),
        blood_group: str = Form(None),
        gender: str = Form(None),
        department: str = Form(None),
        file: UploadFile = File(None),
        db: Session = Depends(get_db),
        current_user: schemas.UserOut = Depends(get_current_user)
):

    profile_manager = Profile(db)
    return profile_manager.update_profile(
        cnic,
        phone_no,
        address,
        blood_group,
        gender,
        department,
        current_user.user_id,
        file
    )
