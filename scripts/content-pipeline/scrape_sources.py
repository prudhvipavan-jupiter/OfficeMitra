#!/usr/bin/env python3
"""
Scrape official AP government sources referenced in article topics.
Saves structured JSON for enrichment during article generation.

Usage:
  pip install -r scripts/content-pipeline/requirements.txt
  python scripts/content-pipeline/scrape_sources.py
"""

from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Install dependencies: pip install -r scripts/content-pipeline/requirements.txt")
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[2]
TOPICS_PATH = ROOT / "scripts" / "content-pipeline" / "topics" / "all-topics.mjs"
OUT_DIR = ROOT / "scripts" / "content-pipeline" / "scraped"
OUT_FILE = OUT_DIR / "sources.json"

HEADERS = {
    "User-Agent": "OfficeMitra-ContentBot/1.0 (+https://officemitra.vercel.app; research)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-IN,en;q=0.9",
}

# Known official portals — fetch homepage metadata when topic URLs are generic
PORTAL_PAGES = {
    "goir.ap.gov.in": "https://goir.ap.gov.in/",
    "apfinance.ap.gov.in": "https://www.apfinance.ap.gov.in/",
    "apgli.ap.gov.in": "https://www.apgli.ap.gov.in/",
    "health.ap.gov.in": "https://health.ap.gov.in/",
    "cfms.ap.gov.in": "https://cfms.ap.gov.in/",
    "treasury.ap.gov.in": "https://treasury.ap.gov.in/",
}


def extract_urls_from_topics() -> list[str]:
    text = TOPICS_PATH.read_text(encoding="utf-8")
    raw = re.findall(r'"(https?://[^"]+)"', text)
    urls = sorted(set(u.rstrip(".,;") for u in raw))
    return urls


def clean_text(html: str, max_len: int = 600) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header"]):
        tag.decompose()
    text = " ".join(soup.get_text(separator=" ", strip=True).split())
    return text[:max_len] + ("…" if len(text) > max_len else "")


def fetch_url(url: str) -> dict:
    result = {"url": url, "ok": False, "title": "", "snippet": "", "error": ""}
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
        resp.raise_for_status()
        result["ok"] = True
        result["status_code"] = resp.status_code
        soup = BeautifulSoup(resp.text, "html.parser")
        title = soup.title.string.strip() if soup.title and soup.title.string else ""
        result["title"] = title
        result["snippet"] = clean_text(resp.text)
    except Exception as exc:  # noqa: BLE001
        result["error"] = str(exc)
    return result


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    urls = extract_urls_from_topics()

    # Add portal homepages for domains we reference
    for url in list(urls):
        host = urlparse(url).netloc.replace("www.", "")
        if host in PORTAL_PAGES and PORTAL_PAGES[host] not in urls:
            urls.append(PORTAL_PAGES[host])

    urls = sorted(set(urls))
    print(f"Scraping {len(urls)} official URLs…")

    results: dict[str, dict] = {}
    for i, url in enumerate(urls, 1):
        print(f"  [{i}/{len(urls)}] {url}")
        results[url] = fetch_url(url)
        time.sleep(0.8)  # polite rate limit

    OUT_FILE.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
    ok = sum(1 for r in results.values() if r.get("ok"))
    print(f"\nDone: {ok}/{len(urls)} fetched successfully -> {OUT_FILE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
