"""End-to-end backend API tests for NBMT Trading Co."""
import os
import uuid
import pytest


# ---------------- Health ----------------
class TestHealth:
    def test_root(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "NBMT Trading Co. API"


# ---------------- Public: updates ----------------
class TestUpdatesPublic:
    def test_list_updates(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/updates")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 3, f"Expected >=3 seeded updates, got {len(data)}"
        for u in data:
            assert u.get("published") is True
            assert u.get("slug")
            assert u.get("title")

    def test_get_update_by_slug(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/updates")
        slug = r.json()[0]["slug"]
        r2 = api_client.get(f"{base_url}/api/updates/{slug}")
        assert r2.status_code == 200
        assert r2.json()["slug"] == slug

    def test_get_update_404(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/updates/nonexistent-slug-xyz")
        assert r.status_code == 404


# ---------------- Public: certificates ----------------
class TestCertificatesPublic:
    def test_list_certificates(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/certificates")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 4, f"Expected >=4 seeded certificates, got {len(data)}"
        for c in data:
            assert c.get("id")
            assert c.get("name")


# ---------------- Public: enquiries ----------------
class TestEnquiriesPublic:
    def test_create_contact_enquiry(self, api_client, base_url):
        payload = {
            "type": "contact",
            "name": "TEST_John",
            "email": "test_contact@example.com",
            "company": "TestCo",
            "message": "Hello, this is a test.",
        }
        r = api_client.post(f"{base_url}/api/enquiries", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["id"]
        assert d["status"] == "new"
        assert d["type"] == "contact"
        assert d["email"] == payload["email"]

    def test_create_quote_enquiry(self, api_client, base_url):
        payload = {
            "type": "quote",
            "name": "TEST_Quote",
            "email": "test_quote@example.com",
            "product": "Basmati Rice 1121",
            "quantity": "25 MT",
            "incoterm": "FOB",
            "destination_port": "Rotterdam",
            "message": "Please quote.",
        }
        r = api_client.post(f"{base_url}/api/enquiries", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["type"] == "quote"
        assert d["product"] == payload["product"]
        assert d["incoterm"] == "FOB"
        assert d["status"] == "new"

    def test_create_enquiry_invalid_email(self, api_client, base_url):
        r = api_client.post(f"{base_url}/api/enquiries", json={
            "type": "contact", "name": "X", "email": "not-an-email",
        })
        assert r.status_code == 422


# ---------------- Admin auth gating ----------------
class TestAuthGating:
    def test_auth_me_unauth(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/auth/me")
        assert r.status_code == 401

    @pytest.mark.parametrize("method,path", [
        ("GET", "/api/enquiries"),
        ("PATCH", "/api/enquiries/some-id"),
        ("DELETE", "/api/enquiries/some-id"),
        ("POST", "/api/updates"),
        ("PUT", "/api/updates/some-id"),
        ("DELETE", "/api/updates/some-id"),
        ("POST", "/api/certificates"),
        ("PUT", "/api/certificates/some-id"),
        ("DELETE", "/api/certificates/some-id"),
        ("POST", "/api/upload"),
    ])
    def test_admin_endpoints_require_auth(self, api_client, base_url, method, path):
        r = api_client.request(method, f"{base_url}{path}", json={} if method in ("POST", "PATCH", "PUT") else None)
        assert r.status_code == 401, f"{method} {path} expected 401, got {r.status_code}"


# ---------------- Admin authenticated ----------------
class TestAdminAuthenticated:
    def test_auth_me(self, admin_client, base_url, admin_session):
        r = admin_client.get(f"{base_url}/api/auth/me")
        assert r.status_code == 200
        d = r.json()
        assert d["email"] == admin_session["email"]

    def test_list_enquiries(self, admin_client, base_url, api_client):
        # ensure at least one exists
        api_client.post(f"{base_url}/api/enquiries", json={
            "type": "contact", "name": "TEST_seed", "email": "seed@t.com", "message": "s"
        })
        r = admin_client.get(f"{base_url}/api/enquiries")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
        assert len(r.json()) >= 1

    def test_patch_enquiry_status(self, admin_client, base_url, api_client):
        # create one first (public)
        c = api_client.post(f"{base_url}/api/enquiries", json={
            "type": "quote", "name": "TEST_patch", "email": "patch@t.com",
            "product": "Wheat", "quantity": "10 MT"
        })
        eid = c.json()["id"]
        r = admin_client.patch(f"{base_url}/api/enquiries/{eid}", json={"status": "quoted"})
        assert r.status_code == 200
        assert r.json()["status"] == "quoted"
        # verify persistence
        r2 = admin_client.get(f"{base_url}/api/enquiries")
        found = next((x for x in r2.json() if x["id"] == eid), None)
        assert found is not None
        assert found["status"] == "quoted"

    def test_delete_enquiry(self, admin_client, base_url, api_client):
        c = api_client.post(f"{base_url}/api/enquiries", json={
            "type": "contact", "name": "TEST_del", "email": "del@t.com", "message": "d"
        })
        eid = c.json()["id"]
        r = admin_client.delete(f"{base_url}/api/enquiries/{eid}")
        assert r.status_code == 200
        # not in list
        r2 = admin_client.get(f"{base_url}/api/enquiries")
        assert all(x["id"] != eid for x in r2.json())

    def test_create_update_with_slug(self, admin_client, base_url, mongo):
        title = f"TEST Update {uuid.uuid4().hex[:6]}"
        payload = {
            "title": title, "category": "News",
            "excerpt": "E", "body": "B", "published": True,
        }
        r = admin_client.post(f"{base_url}/api/updates", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["slug"], "slug should be auto-generated"
        assert d["title"] == title
        # verify GET works
        r2 = admin_client.get(f"{base_url}/api/updates/{d['slug']}")
        assert r2.status_code == 200
        # cleanup
        mongo.updates.delete_one({"id": d["id"]})

    def test_update_edit_and_delete(self, admin_client, base_url, mongo):
        c = admin_client.post(f"{base_url}/api/updates", json={
            "title": f"TEST Edit {uuid.uuid4().hex[:6]}", "category": "News",
            "excerpt": "E", "body": "B", "published": True,
        })
        uid = c.json()["id"]
        r = admin_client.put(f"{base_url}/api/updates/{uid}", json={
            "title": "TEST Edited Title", "category": "News",
            "excerpt": "E2", "body": "B2", "published": False,
        })
        assert r.status_code == 200
        assert r.json()["title"] == "TEST Edited Title"
        assert r.json()["published"] is False
        d = admin_client.delete(f"{base_url}/api/updates/{uid}")
        assert d.status_code == 200
        mongo.updates.delete_one({"id": uid})  # ensure gone

    def test_create_certificate(self, admin_client, base_url, mongo):
        payload = {
            "name": f"TEST Cert {uuid.uuid4().hex[:6]}",
            "issuer": "TestOrg",
            "description": "Test",
            "image_path": None,
        }
        r = admin_client.post(f"{base_url}/api/certificates", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["id"]
        assert d["name"] == payload["name"]
        # verify in list
        lst = api_client_get(base_url)
        assert any(c["id"] == d["id"] for c in lst)
        # cleanup
        mongo.certificates.delete_one({"id": d["id"]})

    def test_certificate_edit_delete(self, admin_client, base_url, mongo):
        c = admin_client.post(f"{base_url}/api/certificates", json={
            "name": f"TEST CE {uuid.uuid4().hex[:6]}", "issuer": "X", "description": "",
        })
        cid = c.json()["id"]
        r = admin_client.put(f"{base_url}/api/certificates/{cid}", json={
            "name": "TEST Updated Cert", "issuer": "Y", "description": "z",
        })
        assert r.status_code == 200
        assert r.json()["name"] == "TEST Updated Cert"
        d = admin_client.delete(f"{base_url}/api/certificates/{cid}")
        assert d.status_code == 200
        mongo.certificates.delete_one({"id": cid})


def api_client_get(base_url):
    import requests
    return requests.get(f"{base_url}/api/certificates").json()


# ---------------- Invalid session ----------------
class TestInvalidSession:
    def test_bad_bearer(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/auth/me", headers={"Authorization": "Bearer garbage"})
        assert r.status_code == 401
