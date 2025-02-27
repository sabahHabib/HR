from sqlalchemy import Column, Integer, String,ForeignKey,Date,Time
from ..database import Base
from sqlalchemy.orm import relationship


class Attendance(Base):
    __tablename__ = "attendances"
    id= Column(Integer, primary_key=True,unique=True, index= True,autoincrement=True)
    user_id = Column(Integer,ForeignKey('users.user_id'), nullable=False)
    check_in = Column(Time, nullable=False)
    check_out = Column(Time, nullable=True)
    total_time = Column(String,nullable=True)
    date = Column(Date, nullable=False)

    user = relationship('User', back_populates='attendance')






