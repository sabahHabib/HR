from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_URL = os.getenv('DATABASE_URL')
engine  = create_engine(SQLALCHEMY_URL)
SessionLocal = sessionmaker(autoflush=False,autocommit = False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()





