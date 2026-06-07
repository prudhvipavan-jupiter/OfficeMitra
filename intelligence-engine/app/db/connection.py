"""PostgreSQL / Supabase database layer."""
from __future__ import annotations

import json
import uuid
from contextlib import contextmanager
from datetime import datetime, timezone
from typing import Any

import psycopg2
import psycopg2.extras

from app.config import settings

psycopg2.extras.register_uuid()


@contextmanager
def get_conn():
    conn = psycopg2.connect(settings.database_url)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def ensure_schema():
    """Verify intelligence tables exist (created via supabase/migrations SQL)."""
    try:
        fetch_one("SELECT 1 FROM intel_sources LIMIT 1")
    except Exception as exc:
        raise RuntimeError(
            "Intelligence tables not found. Run supabase/migrations/001_intelligence_engine.sql"
        ) from exc


def fetch_all(query: str, params: tuple | None = None) -> list[dict[str, Any]]:
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(query, params)
            rows = cur.fetchall()
            return [dict(r) for r in rows]


def fetch_one(query: str, params: tuple | None = None) -> dict[str, Any] | None:
    rows = fetch_all(query, params)
    return rows[0] if rows else None


def execute(query: str, params: tuple | None = None) -> None:
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(query, params)


def log_activity(event_type: str, message: str, metadata: dict | None = None):
    execute(
        """
        INSERT INTO intel_activity_log (id, event_type, message, metadata)
        VALUES (%s, %s, %s, %s::jsonb)
        """,
        (str(uuid.uuid4()), event_type, message, json.dumps(metadata or {})),
    )


def get_active_sources() -> list[dict[str, Any]]:
    return fetch_all(
        "SELECT * FROM intel_sources WHERE active = true ORDER BY category, name"
    )


def fingerprint_exists(fingerprint: str) -> bool:
    row = fetch_one(
        "SELECT 1 FROM intel_detected_updates WHERE fingerprint = %s LIMIT 1",
        (fingerprint,),
    )
    return row is not None


def insert_detected_update(
    source_id: str,
    title: str,
    source_url: str,
    fingerprint: str,
    published_date: str | None = None,
) -> str | None:
    if fingerprint_exists(fingerprint):
        return None

    update_id = str(uuid.uuid4())
    execute(
        """
        INSERT INTO intel_detected_updates (
            id, source_id, title, source_url, published_date, fingerprint, status
        ) VALUES (%s, %s, %s, %s, %s, %s, 'NEW')
        """,
        (update_id, source_id, title[:500], source_url[:2000], published_date, fingerprint),
    )
    execute(
        "UPDATE intel_sources SET last_update_found = NOW() WHERE id = %s",
        (source_id,),
    )
    return update_id


def update_source_checked(source_id: str):
    execute(
        "UPDATE intel_sources SET last_checked = NOW() WHERE id = %s",
        (source_id,),
    )


def save_ai_draft(update_id: str, draft: dict[str, Any]):
    execute(
        """
        UPDATE intel_detected_updates SET
            status = 'DRAFT_GENERATED',
            ai_title = %s,
            ai_summary = %s,
            ai_what_changed = %s,
            ai_who_affected = %s,
            ai_action_required = %s,
            ai_reference_source = %s,
            ai_department_impact = %s,
            ai_keywords = %s::jsonb,
            ai_body = %s,
            updated_at = NOW()
        WHERE id = %s
        """,
        (
            draft.get("title"),
            draft.get("summary"),
            draft.get("what_changed"),
            draft.get("who_is_affected"),
            draft.get("action_required"),
            draft.get("reference_source"),
            draft.get("department_impact"),
            json.dumps(draft.get("keywords", [])),
            draft.get("body"),
            update_id,
        ),
    )


def start_monitoring_run() -> str:
    run_id = str(uuid.uuid4())
    execute(
        """
        INSERT INTO intel_monitoring_runs (id, status, started_at)
        VALUES (%s, 'running', NOW())
        """,
        (run_id,),
    )
    return run_id


def finish_monitoring_run(
    run_id: str,
    status: str,
    sources_checked: int,
    items_found: int,
    drafts_generated: int,
    error_message: str | None = None,
    details: dict | None = None,
):
    execute(
        """
        UPDATE intel_monitoring_runs SET
            finished_at = NOW(),
            status = %s,
            sources_checked = %s,
            items_found = %s,
            drafts_generated = %s,
            error_message = %s,
            details = %s::jsonb
        WHERE id = %s
        """,
        (
            status,
            sources_checked,
            items_found,
            drafts_generated,
            error_message,
            json.dumps(details or {}),
            run_id,
        ),
    )


def get_new_updates_without_draft(limit: int = 50) -> list[dict[str, Any]]:
    return fetch_all(
        """
        SELECT u.*, s.name AS source_name, s.category AS source_category
        FROM intel_detected_updates u
        JOIN intel_sources s ON s.id = u.source_id
        WHERE u.status = 'NEW'
        ORDER BY u.detected_at ASC
        LIMIT %s
        """,
        (limit,),
    )


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()
