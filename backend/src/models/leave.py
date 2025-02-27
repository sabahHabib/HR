from sqlalchemy import Column, Integer, String, ForeignKey,Date
from ..database import Base
from sqlalchemy.orm import relationship


class Leave(Base):
    __tablename__ = "leaves"
    id= Column(Integer,primary_key=True,unique=True,index=True,autoincrement=True)
    user_id = Column(Integer,ForeignKey('users.user_id'),nullable=False)
    from_date = Column(Date ,nullable=False)
    to_date = Column(Date, nullable=False)
    leave_type = Column(String,nullable=False)
    leave_status = Column(String, nullable=False)
    replacement_if = Column(String,nullable= True)
    contact_landline = Column(String, nullable= True)
    contact_phone = Column(String,nullable = False)
    personal_email = Column(String, nullable= False)
    address_during_leave =Column(String,nullable=True)
    purpose = Column(String,nullable = False)


    user = relationship('User',back_populates='leave')





