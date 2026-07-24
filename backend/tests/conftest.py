"""Shared fixtures for backend tests."""
import os
import uuid
from datetime import datetime, timezone, timedelta
import pytest
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent.parent / ".env")

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://global-grains-3.preview.emergentagent.com"

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

# Frontend .env not always visible to pytest -- use explicit env value from file
_FRONTEND_ENV = Path("/app/frontend/.env")
if _FRONTEND_ENV.exists():
    for line in _FRONTEND_ENV.read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")


@pytest.fixture(scope="session")
def base_url():
    return BASE_URL


@pytest.fixture(scope="session")
def mongo():
    client = MongoClient(MONGO_URL)
    yield client[DB_NAME]
    client.close()


@pytest.fixture(scope="session")
def admin_session(mongo):
    """Insert a whitelisted admin user + session token into Mongo and return token."""
    user_id = f"user_test_{uuid.uuid4().hex[:8]}"
    email = "ktcmktg@gmail.com"  # whitelisted
    token = f"testtok_{uuid.uuid4().hex}"
    mongo.users.insert_one({
        "user_id": user_id,
        "email": email,
        "name": "Test Admin",
        "picture": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    mongo.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    yield {"user_id": user_id, "token": token, "email": email}
    # cleanup
    mongo.user_sessions.delete_many({"user_id": user_id})
    mongo.users.delete_one({"user_id": user_id})


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture
def admin_client(admin_session):
    s = requests.Session()
    s.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {admin_session['token']}",
    })
    return s
