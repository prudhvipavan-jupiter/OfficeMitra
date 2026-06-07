"""Email alerts when new updates are detected."""
from __future__ import annotations

import httpx

from app.config import settings


async def send_detection_alert(source_name: str, title: str, detected_at: str):
    if not settings.resend_api_key:
        print(f"[Intelligence Alert] {source_name}: {title} @ {detected_at}")
        return

    subject = "OfficeMitra Intelligence Alert"
    body = f"""New government update detected

Source: {source_name}
Title: {title}
Detected: {detected_at}

Review in Admin → OfficeMitra Intelligence:
https://theofficemitra.com/admin/intelligence

No content has been auto-published. Manual approval required.

— OfficeMitra Intelligence Engine
"""

    async with httpx.AsyncClient(timeout=20) as client:
        await client.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.resend_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "from": settings.email_from,
                "to": [settings.admin_email],
                "subject": subject,
                "text": body,
            },
        )
