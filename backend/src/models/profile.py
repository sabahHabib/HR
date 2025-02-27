from sqlalchemy import Column, Integer, String, ForeignKey, LargeBinary
from ..database import Base
from sqlalchemy.orm import relationship



class Profile(Base):
    __tablename__ = 'profiles'
    id = Column(Integer, primary_key=True)
    cnic = Column(String,nullable=False, unique=True)
    phone_no = Column(String, nullable=True)
    address = Column(String)
    blood_group = Column(String(3))
    gender = Column(String)
    department = Column(String)
    image_url = Column(String,nullable=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)



    user = relationship('User', back_populates='profile')








