"""Main monitoring orchestration — runs every 30 minutes."""
from __future__ import annotations

import asyncio
import json
from datetime import datetime, timezone

from app.ai.draft_generator import generate_draft
from app.db.connection import (
    get_active_sources,
    get_new_updates_without_draft,
    insert_detected_update,
    log_activity,
    save_ai_draft,
    start_monitoring_run,
    finish_monitoring_run,
    update_source_checked,
)
from app.email.notifier import send_detection_alert
from app.monitor.fetcher import check_source, make_fingerprint


async def run_monitoring_cycle() -> dict:
    run_id = start_monitoring_run()
    sources_checked = 0
    items_found = 0
    drafts_generated = 0
    errors: list[str] = []

    try:
        sources = get_active_sources()
        for source in sources:
            sources_checked += 1
            source_id = str(source["id"])
            try:
                detected = await check_source(source)
                update_source_checked(source_id)

                config = source.get("config") or {}
                if isinstance(config, str):
                    config = json.loads(config)

                # Page hash dedup stored in config
                if source.get("check_method") == "page_hash" and detected:
                    import hashlib

                    from app.monitor.fetcher import fetch_url, page_hash

                    html = await fetch_url(source["url"])
                    h = page_hash(html)
                    prev = config.get("last_page_hash")
                    if prev == h:
                        continue
                    config["last_page_hash"] = h
                    from app.db.connection import execute

                    execute(
                        "UPDATE intel_sources SET config = %s::jsonb WHERE id = %s",
                        (json.dumps(config), source_id),
                    )

                for item in detected:
                    fp = make_fingerprint(source_id, item.url, item.title)
                    new_id = insert_detected_update(
                        source_id,
                        item.title,
                        item.url,
                        fp,
                        item.published_date,
                    )
                    if new_id:
                        items_found += 1
                        detected_at = datetime.now(timezone.utc).isoformat()
                        await send_detection_alert(
                            source["name"], item.title, detected_at
                        )
                        log_activity(
                            "update_detected",
                            f"New update from {source['name']}: {item.title[:100]}",
                            {"update_id": new_id, "source_id": source_id},
                        )
            except Exception as exc:
                errors.append(f"{source.get('name')}: {exc}")
                log_activity(
                    "source_error",
                    f"Failed to check {source.get('name')}",
                    {"error": str(exc)},
                )

        # Generate AI drafts for NEW items
        for row in get_new_updates_without_draft():
            try:
                draft = generate_draft(row)
                save_ai_draft(str(row["id"]), draft)
                drafts_generated += 1
                log_activity(
                    "draft_generated",
                    f"AI draft created: {draft.get('title', row.get('title'))}",
                    {"update_id": str(row["id"])},
                )
            except Exception as exc:
                errors.append(f"Draft {row.get('id')}: {exc}")

        finish_monitoring_run(
            run_id,
            "completed" if not errors else "completed",
            sources_checked,
            items_found,
            drafts_generated,
            "; ".join(errors) if errors else None,
            {"errors": errors},
        )
        log_activity(
            "monitoring_complete",
            f"Run complete: {items_found} new, {drafts_generated} drafts",
            {"run_id": run_id},
        )
    except Exception as exc:
        finish_monitoring_run(run_id, "failed", sources_checked, items_found, 0, str(exc))
        log_activity("monitoring_failed", str(exc), {"run_id": run_id})
        raise

    return {
        "run_id": run_id,
        "sources_checked": sources_checked,
        "items_found": items_found,
        "drafts_generated": drafts_generated,
        "errors": errors,
    }


def run_monitoring_sync():
    return asyncio.run(run_monitoring_cycle())
