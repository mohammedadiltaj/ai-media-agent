from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agent.models import AgentRequest, AgentDecision
from agent.core import MediaAgent

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/analyze", response_model=AgentDecision)
def analyze_media(request: AgentRequest):
    try:
        agent = MediaAgent()
        decision = agent.run(request)
        return decision
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
