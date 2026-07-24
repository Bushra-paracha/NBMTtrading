import os
import uuid
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path
from pymongo import MongoClient
from dotenv import load_dotenv

ROOT = Path(__file__).parent
load_dotenv(ROOT / ".env")

client = MongoClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

def slugify(t):
    s = re.sub(r"[^a-zA-Z0-9\s-]", "", t).strip().lower()
    return re.sub(r"[\s_-]+", "-", s)

def iso(days_ago):
    return (datetime.now(timezone.utc) - timedelta(days=days_ago)).isoformat()

UPDATES = [
    {
        "title": "New Season Basmati Rice Now Available for Export",
        "category": "Harvest",
        "excerpt": "Fresh new season 1121 basmati has been milled and is ready for shipment with excellent grain length and aroma.",
        "body": "We are pleased to announce that the new season 1121 basmati rice is now available for export. Carefully aged and sorted for uniformity, this crop offers the exceptional elongation and clean aroma our buyers expect.\n\nStock is ready for prompt shipment on FOB and CIF terms. Contact our trading desk for the latest offer and packing options.",
        "image": "https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "days": 4,
    },
    {
        "title": "Expanded Private Label Options for Himalayan Pink Salt",
        "category": "Product",
        "excerpt": "New grades, sizes and consumer packaging for retail and wellness brands under your own label.",
        "body": "NBMT Trading Co. now offers an expanded range of private label options for Himalayan Pink Salt. From fine table powder to coarse crystals and decorative rock, we can pack under your own brand for retail, food service and wellness markets.\n\nConsumer grinders, refill packs and bulk formats are all available. Talk to us about a private label programme tailored to your market.",
        "image": "https://images.pexels.com/photos/9974508/pexels-photo-9974508.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "days": 18,
    },
    {
        "title": "NBMT Trading Co. Welcomes New Buyers Across the Gulf",
        "category": "News",
        "excerpt": "We continue to build long standing partnerships with importers and distributors across the GCC.",
        "body": "As an independent UAE trading house, our focus remains on building reliable, long term partnerships. We are delighted to welcome new buyers across the Gulf region this quarter.\n\nWith our base in the UAE and strong access to global shipping lanes, we are well positioned to serve importers, distributors and re-exporters with consistent quality and dependable logistics.",
        "image": "https://images.pexels.com/photos/19612571/pexels-photo-19612571.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "days": 33,
    },
]

CERTIFICATES = [
    {"name": "ISO 9001 Quality Management", "issuer": "Quality Management System", "description": "Certification placeholder. Replace with the official scan from the admin dashboard."},
    {"name": "ISO 22000 Food Safety", "issuer": "Food Safety Management", "description": "Certification placeholder. Replace with the official scan from the admin dashboard."},
    {"name": "HACCP Certification", "issuer": "Hazard Analysis Critical Control Point", "description": "Certification placeholder. Replace with the official scan from the admin dashboard."},
    {"name": "HALAL Certification", "issuer": "Halal Compliance", "description": "Certification placeholder. Replace with the official scan from the admin dashboard."},
]
CERT_IMG = "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800"

if db.updates.count_documents({}) == 0:
    for u in UPDATES:
        doc = {
            "id": str(uuid.uuid4()),
            "title": u["title"],
            "slug": slugify(u["title"]),
            "category": u["category"],
            "excerpt": u["excerpt"],
            "body": u["body"],
            "image_path": u["image"],
            "published": True,
            "date": iso(u["days"]),
            "created_at": iso(u["days"]),
        }
        db.updates.insert_one(doc)
    print(f"Seeded {len(UPDATES)} updates")
else:
    print("Updates already present, skipping")

if db.certificates.count_documents({}) == 0:
    for c in CERTIFICATES:
        db.certificates.insert_one({
            "id": str(uuid.uuid4()),
            "name": c["name"],
            "issuer": c["issuer"],
            "description": c["description"],
            "image_path": CERT_IMG,
            "created_at": iso(1),
        })
    print(f"Seeded {len(CERTIFICATES)} certificates")
else:
    print("Certificates already present, skipping")

client.close()
