from pydantic import BaseModel, Field
from typing import List, Dict

class ContentData(BaseModel):
    title_id: str = Field(description="Unique identifier for the title")
    duration_minutes: int = Field(description="Duration of the content in minutes")
    description: str = Field(description="Synopsis or description of the content")
    genre: str = Field(description="Primary genre, e.g. Action, Drama, Documentary")

class AgentRequest(BaseModel):
    content: ContentData

class AgentDecision(BaseModel):
    title_id: str
    recommended_release_schedule: str = Field(description="Optimal release timing based on content type and genre")
    windowing_strategy: str = Field(description="Strategy for releasing across multiple platforms over time")
    promotional_spend_allocation: Dict[str, float] = Field(description="Recommended spend across different channels")
    platform_placement: List[str] = Field(description="Recommended platforms to maximize ROI")
    reasoning: str = Field(description="Detailed explanation of why these decisions were made based on the content metadata")
    estimated_lifetime_value_uplift: float = Field(description="Percentage uplift in LTV expected")
