# OppositeTalk Backend Architecture

Production-ready backend for **OppositeTalk** using **Clean Architecture**, **.NET Minimal API** as the authoritative system of record, and **Python FastAPI** as the AI intelligence layer.

---

## Architecture Principles

- **System of Record (.NET)**: Owns Authentication, Users, Profiles, Eligibility, Preferences, Matching rules, Posts, Communities, Messages (SignalR), Reports, Moderation, Audit logs.
- **Intelligence Layer (FastAPI)**: Owns AI Profile Assistance, Semantic Matching, Embeddings, Content Classification, and Recommendation algorithms.

---

## System Structure

```
API/
├── src/
│   ├── Api/                  # ASP.NET Core Minimal API Endpoints & SignalR ChatHub
│   ├── Application/          # Application Logic, DTOs, Eligibility Engine, Services
│   ├── Domain/               # Entities, Enums, Value Objects
│   ├── Infrastructure/       # EF Core (PostgreSQL + pgvector), Redis, JWT, FastApiClient
│   └── Shared/               # Standardized ApiResponse & ProblemDetails format
├── ai_service/               # Python FastAPI Intelligence Engine
│   └── app/                  # Internal endpoints (/internal/ai/*)
├── Dockerfile.api            # Docker container manifest for .NET API
├── Dockerfile.ai             # Docker container manifest for Python FastAPI AI Service
└── docker-compose.yml        # Docker orchestration (PostgreSQL + pgvector, Redis, .NET, FastAPI)
```

---

## Quickstart Instructions

### 1. Run via Docker Compose (Recommended)
```bash
docker-compose up --build
```
- **.NET Minimal API**: `http://localhost:5000`
- **FastAPI AI Engine**: `http://localhost:8000`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

### 2. Run .NET API Locally
```bash
dotnet run --project src/Api
```
Health Check: `http://localhost:5000/health`

### 3. Run FastAPI AI Service Locally
```bash
cd ai_service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Health Check: `http://localhost:8000/health`
