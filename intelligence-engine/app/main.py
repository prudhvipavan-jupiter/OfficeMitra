"""FastAPI application — Intelligence Engine worker API."""
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import connection as db
from app.monitor.runner import run_monitoring_cycle
from app.monitor.scheduler import start_scheduler, stop_scheduler


def verify_api_key(x_intelligence_key: str = Header(default="")):
    if x_intelligence_key != settings.intelligence_api_key:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return True


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.ensure_schema()
    start_scheduler()
    yield
    stop_scheduler()


app = FastAPI(
    title="OfficeMitra Intelligence Engine",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://theofficemitra.com", "http://localhost:3000"],
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "officemitra-intelligence"}


@app.post("/monitor/run", dependencies=[Depends(verify_api_key)])
async def trigger_monitor():
    result = await run_monitoring_cycle()
    return {"success": True, **result}


@app.get("/monitor/status", dependencies=[Depends(verify_api_key)])
def monitor_status():
    last = db.fetch_one(
        "SELECT * FROM intel_monitoring_runs ORDER BY started_at DESC LIMIT 1"
    )
    sources = db.fetch_one(
        "SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE active)::int AS active FROM intel_sources"
    )
    pending = db.fetch_one(
        """
        SELECT COUNT(*)::int AS count FROM intel_detected_updates
        WHERE status IN ('NEW', 'DRAFT_GENERATED')
        """
    )
    return {
        "last_run": last,
        "sources": sources,
        "pending_review": pending,
        "interval_minutes": settings.monitor_interval_minutes,
    }


@app.get("/sources", dependencies=[Depends(verify_api_key)])
def list_sources():
    return {"sources": db.fetch_all("SELECT * FROM intel_sources ORDER BY category, name")}


@app.post("/sources", dependencies=[Depends(verify_api_key)])
def create_source(body: dict):
    import uuid

    source_id = str(uuid.uuid4())
    db.execute(
        """
        INSERT INTO intel_sources (id, name, url, category, active, check_method, feed_url, link_selector, config)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s::jsonb)
        """,
        (
            source_id,
            body["name"],
            body["url"],
            body.get("category", "General"),
            body.get("active", True),
            body.get("check_method", "html_links"),
            body.get("feed_url"),
            body.get("link_selector"),
            __import__("json").dumps(body.get("config", {})),
        ),
    )
    return {"id": source_id}


@app.patch("/sources/{source_id}", dependencies=[Depends(verify_api_key)])
def update_source(source_id: str, body: dict):
    db.execute(
        """
        UPDATE intel_sources SET
            name = COALESCE(%s, name),
            url = COALESCE(%s, url),
            category = COALESCE(%s, category),
            active = COALESCE(%s, active),
            check_method = COALESCE(%s, check_method),
            feed_url = COALESCE(%s, feed_url),
            link_selector = COALESCE(%s, link_selector),
            updated_at = NOW()
        WHERE id = %s
        """,
        (
            body.get("name"),
            body.get("url"),
            body.get("category"),
            body.get("active"),
            body.get("check_method"),
            body.get("feed_url"),
            body.get("link_selector"),
            source_id,
        ),
    )
    return {"success": True}


@app.get("/updates", dependencies=[Depends(verify_api_key)])
def list_updates(status: str | None = None):
    if status:
        rows = db.fetch_all(
            """
            SELECT u.*, s.name AS source_name, s.category AS source_category
            FROM intel_detected_updates u
            JOIN intel_sources s ON s.id = u.source_id
            WHERE u.status = %s ORDER BY u.detected_at DESC LIMIT 200
            """,
            (status,),
        )
    else:
        rows = db.fetch_all(
            """
            SELECT u.*, s.name AS source_name, s.category AS source_category
            FROM intel_detected_updates u
            JOIN intel_sources s ON s.id = u.source_id
            ORDER BY u.detected_at DESC LIMIT 200
            """
        )
    return {"updates": rows}


@app.get("/activity", dependencies=[Depends(verify_api_key)])
def activity(limit: int = 30):
    return {
        "activity": db.fetch_all(
            "SELECT * FROM intel_activity_log ORDER BY created_at DESC LIMIT %s",
            (limit,),
        )
    }
