from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, UploadFile, File, Header, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import requests
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, BeforeValidator, ConfigDict
from typing import List, Optional, Annotated
import uuid
import re
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_EMAILS = [e.strip().lower() for e in os.environ.get('ADMIN_EMAILS', '').split(',') if e.strip()]

# ---------------- Object storage ----------------
STORAGE_URL = "https://integrations.emergentagent.com/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "nbmt-trading"
storage_key = None

MIME_TYPES = {
    "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png",
    "gif": "image/gif", "webp": "image/webp", "pdf": "application/pdf",
}

def init_storage():
    global storage_key
    if storage_key:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key

def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120,
    )
    if resp.status_code == 403:
        globals()['storage_key'] = None
        key = init_storage()
        resp = requests.put(
            f"{STORAGE_URL}/objects/{path}",
            headers={"X-Storage-Key": key, "Content-Type": content_type},
            data=data, timeout=120,
        )
    resp.raise_for_status()
    return resp.json()

def get_object(path: str):
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    if resp.status_code == 403:
        globals()['storage_key'] = None
        key = init_storage()
        resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

# ---------------- Helpers ----------------
PyObjectId = Annotated[str, BeforeValidator(str)]

def now_iso():
    return datetime.now(timezone.utc).isoformat()

def slugify(text: str) -> str:
    s = re.sub(r'[^a-zA-Z0-9\s-]', '', text).strip().lower()
    s = re.sub(r'[\s_-]+', '-', s)
    return s or uuid.uuid4().hex[:8]

# ---------------- Models ----------------
class EnquiryCreate(BaseModel):
    type: str = "contact"  # contact | quote
    name: str
    email: EmailStr
    company: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None
    product: Optional[str] = None
    quantity: Optional[str] = None
    incoterm: Optional[str] = None
    destination_port: Optional[str] = None
    message: Optional[str] = None

class Enquiry(EnquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"  # new | in_progress | quoted | closed
    created_at: str = Field(default_factory=now_iso)

class StatusUpdate(BaseModel):
    status: str

class UpdateCreate(BaseModel):
    title: str
    category: str = "News"
    excerpt: str = ""
    body: str = ""
    image_path: Optional[str] = None
    published: bool = True

class NewsUpdate(UpdateCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str = ""
    date: str = Field(default_factory=now_iso)
    created_at: str = Field(default_factory=now_iso)

class CertificateCreate(BaseModel):
    name: str
    issuer: str = ""
    description: str = ""
    image_path: Optional[str] = None

class Certificate(CertificateCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)

# ---------------- App ----------------
app = FastAPI()
api_router = APIRouter(prefix="/api")

@app.on_event("startup")
async def startup():
    try:
        init_storage()
        logging.info("Storage initialized")
    except Exception as e:
        logging.error(f"Storage init failed: {e}")

# ---------------- Auth ----------------
async def get_current_admin(request: Request, authorization: Optional[str] = Header(None)):
    token = request.cookies.get("session_token")
    if not token and authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@api_router.post("/auth/session")
async def process_session(request: Request, response: Response):
    body = await request.json()
    session_id = body.get("session_id")
    if not session_id:
        raise HTTPException(status_code=400, detail="Missing session_id")
    resp = requests.get(
        "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
        headers={"X-Session-ID": session_id}, timeout=30,
    )
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")
    data = resp.json()
    email = (data.get("email") or "").lower()
    if email not in ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="This email is not authorized for admin access.")

    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one({"user_id": user_id}, {"$set": {
            "name": data.get("name"), "picture": data.get("picture"),
        }})
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id, "email": email, "name": data.get("name"),
            "picture": data.get("picture"), "created_at": now_iso(),
        })

    session_token = data.get("session_token")
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id, "session_token": session_token,
        "expires_at": expires_at.isoformat(), "created_at": now_iso(),
    })
    response.set_cookie(
        key="session_token", value=session_token, httponly=True,
        secure=True, samesite="none", path="/", max_age=7 * 24 * 60 * 60,
    )
    return {"user_id": user_id, "email": email, "name": data.get("name"), "picture": data.get("picture")}

@api_router.get("/auth/me")
async def auth_me(user=Depends(get_current_admin)):
    return {"user_id": user["user_id"], "email": user["email"], "name": user.get("name"), "picture": user.get("picture")}

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_many({"session_token": token})
    response.delete_cookie("session_token", path="/")
    return {"ok": True}

# ---------------- Uploads / Files ----------------
@api_router.post("/upload")
async def upload(file: UploadFile = File(...), user=Depends(get_current_admin)):
    ext = (file.filename.split(".")[-1].lower() if "." in file.filename else "bin")
    content_type = MIME_TYPES.get(ext, file.content_type or "application/octet-stream")
    path = f"{APP_NAME}/uploads/{uuid.uuid4().hex}.{ext}"
    data = await file.read()
    result = put_object(path, data, content_type)
    await db.files.insert_one({
        "id": str(uuid.uuid4()), "storage_path": result["path"],
        "original_filename": file.filename, "content_type": content_type,
        "size": result.get("size"), "is_deleted": False, "created_at": now_iso(),
    })
    return {"path": result["path"]}

@api_router.get("/files/{path:path}")
async def download(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    data, content_type = get_object(path)
    return Response(content=data, media_type=record.get("content_type", content_type),
                    headers={"Cache-Control": "public, max-age=86400"})

# ---------------- Enquiries ----------------
@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(payload: EnquiryCreate):
    obj = Enquiry(**payload.model_dump())
    await db.enquiries.insert_one(obj.model_dump())
    return obj

@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(user=Depends(get_current_admin)):
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs

@api_router.patch("/enquiries/{eid}", response_model=Enquiry)
async def update_enquiry(eid: str, payload: StatusUpdate, user=Depends(get_current_admin)):
    res = await db.enquiries.find_one_and_update(
        {"id": eid}, {"$set": {"status": payload.status}}, return_document=True, projection={"_id": 0})
    if not res:
        raise HTTPException(status_code=404, detail="Not found")
    return res

@api_router.delete("/enquiries/{eid}")
async def delete_enquiry(eid: str, user=Depends(get_current_admin)):
    await db.enquiries.delete_one({"id": eid})
    return {"ok": True}

# ---------------- Updates ----------------
@api_router.get("/updates", response_model=List[NewsUpdate])
async def list_updates(all: bool = False):
    q = {} if all else {"published": True}
    docs = await db.updates.find(q, {"_id": 0}).sort("date", -1).to_list(1000)
    return docs

@api_router.get("/updates/{slug}", response_model=NewsUpdate)
async def get_update(slug: str):
    doc = await db.updates.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return doc

@api_router.post("/updates", response_model=NewsUpdate)
async def create_update(payload: UpdateCreate, user=Depends(get_current_admin)):
    obj = NewsUpdate(**payload.model_dump())
    base = slugify(obj.title)
    slug = base
    i = 1
    while await db.updates.find_one({"slug": slug}):
        i += 1
        slug = f"{base}-{i}"
    obj.slug = slug
    await db.updates.insert_one(obj.model_dump())
    return obj

@api_router.put("/updates/{uid}", response_model=NewsUpdate)
async def edit_update(uid: str, payload: UpdateCreate, user=Depends(get_current_admin)):
    res = await db.updates.find_one_and_update(
        {"id": uid}, {"$set": payload.model_dump()}, return_document=True, projection={"_id": 0})
    if not res:
        raise HTTPException(status_code=404, detail="Not found")
    return res

@api_router.delete("/updates/{uid}")
async def delete_update(uid: str, user=Depends(get_current_admin)):
    await db.updates.delete_one({"id": uid})
    return {"ok": True}

# ---------------- Certificates ----------------
@api_router.get("/certificates", response_model=List[Certificate])
async def list_certificates():
    docs = await db.certificates.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs

@api_router.post("/certificates", response_model=Certificate)
async def create_certificate(payload: CertificateCreate, user=Depends(get_current_admin)):
    obj = Certificate(**payload.model_dump())
    await db.certificates.insert_one(obj.model_dump())
    return obj

@api_router.put("/certificates/{cid}", response_model=Certificate)
async def edit_certificate(cid: str, payload: CertificateCreate, user=Depends(get_current_admin)):
    res = await db.certificates.find_one_and_update(
        {"id": cid}, {"$set": payload.model_dump()}, return_document=True, projection={"_id": 0})
    if not res:
        raise HTTPException(status_code=404, detail="Not found")
    return res

@api_router.delete("/certificates/{cid}")
async def delete_certificate(cid: str, user=Depends(get_current_admin)):
    await db.certificates.delete_one({"id": cid})
    return {"ok": True}

@api_router.get("/")
async def root():
    return {"message": "NBMT Trading Co. API"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
