from fastapi import FastAPI
from app.schemas.ai_schemas import (
    MatchingAnalyzeRequest, MatchingAnalyzeResponse,
    ModerationClassifyRequest, ModerationClassifyResponse,
    EmbeddingGenerateRequest, EmbeddingGenerateResponse
)
from app.services.ai_services import AiMatchingService, AiModerationService, AiEmbeddingService

app = FastAPI(
    title="OppositeTalk AI Intelligence Service",
    description="Internal FastAPI AI service for semantic matching, moderation classification, and vector embeddings.",
    version="1.0.0"
)

@app.get("/health")
def health_check():
    return {"status": "Healthy", "service": "FastAPI AI Engine"}

@app.post("/internal/ai/matching/analyze", response_model=MatchingAnalyzeResponse)
def analyze_matching(req: MatchingAnalyzeRequest):
    return AiMatchingService.analyze_compatibility(req.user1_id, req.user2_id)

@app.post("/internal/ai/moderation/classify", response_model=ModerationClassifyResponse)
def classify_moderation(req: ModerationClassifyRequest):
    return AiModerationService.classify_text(req.content)

@app.post("/internal/ai/embeddings", response_model=EmbeddingGenerateResponse)
def generate_embeddings(req: EmbeddingGenerateRequest):
    embedding = AiEmbeddingService.generate_embedding(req.text)
    return EmbeddingGenerateResponse(embedding=embedding)
