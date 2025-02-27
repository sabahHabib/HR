from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers.services import profile, admin, attendance, login, leave, signup
from fastapi.staticfiles import StaticFiles

app = FastAPI()
import os

app.mount("/images", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "images")), name="images")



Base.metadata.create_all(engine)

app.include_router(signup.router)
app.include_router(login.router)
app.include_router(profile.router)
app.include_router(attendance.router)
app.include_router(leave.router)
app.include_router(admin.router)

origins = [
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


