from sqlalchemy import Column, Integer, String, Boolean
from ..database import Base
from sqlalchemy.orm import relationship



class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, default='user')

    profile = relationship('Profile', back_populates='user', uselist=False)

    attendance = relationship('Attendance', back_populates='user')
    leave = relationship("Leave",back_populates='user')








