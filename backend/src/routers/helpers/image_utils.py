from fastapi import UploadFile
import os
from uuid import uuid4


static_dir = 'src/images'
os.makedirs(static_dir, exist_ok=True)


def save_uploaded_file(file: UploadFile, user_id: int):
    file_extension = file.filename.split(".")[-1]
    filename = f"profile_{user_id}_{uuid4()}.{file_extension}"
    file_path = os.path.join(static_dir, filename)

    with open(file_path, 'wb') as buffer:
        buffer.write(file.file.read())

    return f"/images/{filename}"






