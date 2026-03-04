import pytest
from unittest.mock import patch, MagicMock
from agent.core import MediaAgent
from agent.models import AgentRequest

@pytest.fixture
def mock_request_data():
    return AgentRequest(**{
        "performance": {
            "title_id": "TEST-01",
            "views": 1000,
            "completion_rate": 0.5,
            "engagement_score": 7.0
        },
        "audience": {
            "title_id": "TEST-01",
            "target_demographics": ["Adults"],
            "regional_interest": {"US": 0.8}
        },
        "licensing": {
            "title_id": "TEST-01",
            "current_platforms": [],
            "rights_expiration": "2025-01-01",
            "exclusive": False
        }
    })

@patch("agent.core.os.getenv")
def test_agent_initialization(mock_getenv):
    mock_getenv.side_effect = lambda k, d=None: "api_key_test" if k == "GEMINI_API_KEY" else "gemini"
    agent = MediaAgent()
    assert agent.provider == "gemini"
    prompt = agent.generate_prompt(mock_request_data())
    assert "TEST-01" in prompt
