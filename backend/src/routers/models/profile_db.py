from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..helpers.image_utils import save_uploaded_file
from ... import models
from ... import schemas


class Profile:
    def __init__(self, db: Session):
        self.db = db

    def create_profile(self, cnic, phone_no, address,
                       blood_group, gender, department,
                       user_id: int, file
                       ):
        existing_profile = (self.db.query(models.Profile)
                            .filter(models.Profile.user_id == user_id)
                            .first()
                            )

        if existing_profile:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User profile already exists. Do you want to update it?"
            )
        if file:
            image_path = save_uploaded_file(file, user_id)
        else:
            image_path = None

        profile_data = schemas.ProfileCreate(
            cnic=cnic,
            phone_no=phone_no,
            address=address,
            blood_group=blood_group,
            gender=gender,
            department=department,
            image_url=image_path,
            user_id=user_id
        )

        new_profile = models.Profile(**profile_data.model_dump())

        try:
            self.db.add(new_profile)
            self.db.commit()
            self.db.refresh(new_profile)
        except IntegrityError as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Duplicate CNIC or unique constraint violation."
            )
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred while creating the profile."
            )

        return new_profile

    def get_profile(self, user_id: int):
        profile = (self.db.query(models.Profile)
                   .filter(models.Profile.user_id == user_id)
                   .first()
                   )

        if not profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found."
            )
        return profile

    def update_profile(self, cnic, phone_no, address,
                       blood_group, gender, department,
                        user_id: int,file
                       ):

        profile = (self.db.query(models.Profile)
                   .filter(models.Profile.user_id == user_id)
                   .first()
                   )

        if not profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found. Please create a profile first."
            )

        if file:
            image_path = save_uploaded_file(file, user_id)
        else:
            image_path = None

        profile_data =  schemas.Profile (
            cnic = cnic,
            phone_no = phone_no,
            address = address,
            blood_group = blood_group,
            gender = gender,
            department = department,
            image_url = image_path,
           )

        for key, value in profile_data.model_dump(exclude_unset=True).items():
            if value:
                setattr(profile, key, value)

        try:
            self.db.commit()
            self.db.refresh(profile)
        except IntegrityError as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error: Duplicate CNIC or unique constraint violation during update."
            )
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred while updating the profile."
            )

        return profile
