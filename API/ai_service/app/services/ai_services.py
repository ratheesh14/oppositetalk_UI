from typing import List, Dict, Any
from app.schemas.ai_schemas import MatchingAnalyzeResponse, ModerationClassifyResponse

class AiMatchingService:
    @staticmethod
    def analyze_compatibility(user1_id: str, user2_id: str) -> MatchingAnalyzeResponse:
        return MatchingAnalyzeResponse(
            compatibility_score=0.92,
            positive_factors=[
                "Both seeking long-term marriage & family building",
                "Both value financial responsibility & structured budgeting",
                "Shared passion for personal growth & healthy lifestyle"
            ],
            differences=[
                "Minor difference in preferred living location flexibility"
            ]
        )

class AiModerationService:
    @staticmethod
    def classify_text(content: str) -> ModerationClassifyResponse:
        content_lower = content.lower()
        if any(word in content_lower for word in ["hate", "attack", "harass"]):
            return ModerationClassifyResponse(classification="REVIEW", risk_score=0.88)
        return ModerationClassifyResponse(classification="ALLOW", risk_score=0.03)

class AiEmbeddingService:
    @staticmethod
    def generate_embedding(text: str) -> List[float]:
        # Generate dummy 128-dimensional embedding vector
        return [0.05 * (i % 10) for i in range(128)]
