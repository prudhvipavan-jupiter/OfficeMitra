"""Generate original administrative explanations from metadata only."""
from __future__ import annotations

import json
from typing import Any

from openai import OpenAI

from app.config import settings


SYSTEM_PROMPT = """You are OfficeMitra Intelligence, an assistant for Andhra Pradesh government ministerial staff.

You receive ONLY metadata about a detected government update (title, source name, category, URL).
You must NOT copy or reproduce text from government websites.

Write ORIGINAL explanatory content in clear administrative English suitable for establishment and finance staff.

Output valid JSON with these keys:
- title: clear OfficeMitra headline
- summary: 2-3 sentence overview
- what_changed: what appears to have changed (based on title/metadata inference)
- who_is_affected: likely affected staff categories
- action_required: practical steps staff should take (verify on official source)
- reference_source: how to verify on the official portal
- department_impact: which departments/offices are impacted
- keywords: array of 5-8 search keywords
- body: 2-4 paragraph original explanation (markdown allowed, no copied GO text)

Always remind users to verify the official order on the source URL before acting.
Never claim legal authority. Never reproduce verbatim government text."""


def _fallback_draft(item: dict[str, Any]) -> dict[str, Any]:
    title = item.get("title", "Government Update Detected")
    source_name = item.get("source_name", "Official Source")
    source_url = item.get("source_url", "")
    category = item.get("source_category", "Administration")

    return {
        "title": f"Update detected: {title[:120]}",
        "summary": (
            f"A new item was detected on {source_name}. "
            "OfficeMitra has not copied the source content — please review the official link and verify details before office action."
        ),
        "what_changed": f"A new publication or listing titled \"{title}\" appeared on {source_name}.",
        "who_is_affected": f"Potentially affected: AP ministerial staff under {category}. Confirm scope on the official source.",
        "action_required": (
            f"1. Open the official source: {source_url}\n"
            "2. Read the full order/circular/notification\n"
            "3. Route to Head of Office if establishment or finance action is required\n"
            "4. Update office records and Service Registers as applicable"
        ),
        "reference_source": f"Verify on official portal: {source_url}",
        "department_impact": category,
        "keywords": ["AP government", "ministerial staff", category.lower(), "GO", "circular"],
        "body": (
            f"## Administrative notice\n\n"
            f"OfficeMitra Intelligence detected a new item on **{source_name}**.\n\n"
            f"**Detected title:** {title}\n\n"
            f"This is an AI-assisted draft based on metadata only. "
            f"No government text has been copied. Open [{source_name}]({source_url}) to read the official document.\n\n"
            f"After verification, establishment or finance sections should prepare proceedings as per your Head of Office instructions."
        ),
    }


def generate_draft(item: dict[str, Any]) -> dict[str, Any]:
    if not settings.openai_api_key:
        return _fallback_draft(item)

    client = OpenAI(api_key=settings.openai_api_key)
    user_content = json.dumps(
        {
            "detected_title": item.get("title"),
            "source_name": item.get("source_name"),
            "source_category": item.get("source_category"),
            "source_url": item.get("source_url"),
            "published_date": item.get("published_date"),
        },
        indent=2,
    )

    try:
        response = client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": f"Generate an OfficeMitra update draft for:\n{user_content}",
                },
            ],
            response_format={"type": "json_object"},
            temperature=0.4,
        )
        content = response.choices[0].message.content or "{}"
        draft = json.loads(content)
        required = [
            "title",
            "summary",
            "what_changed",
            "who_is_affected",
            "action_required",
            "reference_source",
            "department_impact",
            "keywords",
            "body",
        ]
        for key in required:
            draft.setdefault(key, _fallback_draft(item).get(key))
        return draft
    except Exception:
        return _fallback_draft(item)
