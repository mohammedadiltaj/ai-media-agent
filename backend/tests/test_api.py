import pytest
from agent.models import AgentRequest, ContentData

@pytest.fixture
def mock_request_data():
    return {
        "content": {
            "title_id": "TEST-01",
            "duration_minutes": 52,
            "description": "A gripping true-crime documentary following a decade-long investigation.",
            "genre": "Documentary"
        }
    }

def test_health_check():
    from fastapi.testclient import TestClient
    from main import app
    client = TestClient(app)
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_pydantic_models(mock_request_data):
    req = AgentRequest(**mock_request_data)
    assert req.content.title_id == "TEST-01"
    assert req.content.genre == "Documentary"
    assert req.content.duration_minutes == 52
    assert "true-crime" in req.content.description
