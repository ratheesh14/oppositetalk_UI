from pydantic import BaseModel
from typing import List, Optional

class MatchingAnalyzeRequest(BaseModel):
    user1_id: str
    user2_id: str

class MatchingAnalyzeResponse(BaseModel):
    compatibility_score: float
    positive_factors: List[str]
    differences: List[str]

class ModerationClassifyRequest(BaseModel):
    content: str

class ModerationClassifyResponse(BaseModel):
    classification: str  # ALLOW, FLAG, REMOVE, REVIEW
    risk_score: float

class EmbeddingGenerateRequest(BaseModel):
    text: str

class EmbeddingGenerateResponse(BaseModel):
    embedding: List[float]
