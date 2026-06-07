"""Fetch and parse government source listings — metadata only, no content copying."""
from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from urllib.parse import urljoin, urlparse

import feedparser
import httpx
from bs4 import BeautifulSoup

from app.config import settings


@dataclass
class DetectedItem:
    title: str
    url: str
    published_date: str | None = None


def make_fingerprint(source_id: str, url: str, title: str) -> str:
    raw = f"{source_id}|{url.strip().lower()}|{title.strip().lower()}"
    return hashlib.sha256(raw.encode()).hexdigest()


async def fetch_url(url: str) -> str:
    async with httpx.AsyncClient(
        timeout=settings.request_timeout_seconds,
        follow_redirects=True,
        headers={"User-Agent": settings.user_agent},
    ) as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.text


def parse_rss(content: str, base_url: str, config: dict) -> list[DetectedItem]:
    feed = feedparser.parse(content)
    max_items = int(config.get("max_items", 25))
    items: list[DetectedItem] = []
    for entry in feed.entries[:max_items]:
        title = (entry.get("title") or "").strip()
        link = entry.get("link") or ""
        if not title or not link:
            continue
        pub = None
        if entry.get("published_parsed"):
            try:
                pub = "-".join(str(x) for x in entry.published_parsed[:3])
            except Exception:
                pub = None
        items.append(DetectedItem(title=title, url=link, published_date=pub))
    return items


def parse_html_links(
    html: str, base_url: str, selector: str, config: dict
) -> list[DetectedItem]:
    soup = BeautifulSoup(html, "html.parser")
    pattern = config.get("link_pattern", "")
    regex = re.compile(pattern, re.I) if pattern else None
    max_items = int(config.get("max_items", 25))
    seen: set[str] = set()
    items: list[DetectedItem] = []

    for anchor in soup.select(selector or "a[href]"):
        href = anchor.get("href", "").strip()
        title = anchor.get_text(" ", strip=True)
        if not href or not title or len(title) < 8:
            continue
        full_url = urljoin(base_url, href)
        if full_url in seen:
            continue
        if not _same_domain(base_url, full_url) and not _is_document_link(full_url):
            continue
        if regex and not (regex.search(full_url) or regex.search(title)):
            continue
        seen.add(full_url)
        items.append(DetectedItem(title=title[:500], url=full_url))
        if len(items) >= max_items:
            break
    return items


def page_hash(html: str) -> str:
    text = BeautifulSoup(html, "html.parser").get_text(" ", strip=True)
    return hashlib.sha256(text[:8000].encode()).hexdigest()


def _same_domain(a: str, b: str) -> bool:
    return urlparse(a).netloc.replace("www.", "") == urlparse(b).netloc.replace(
        "www.", ""
    )


def _is_document_link(url: str) -> bool:
    return bool(re.search(r"\.(pdf|doc|docx)$", url, re.I))


async def check_source(source: dict) -> list[DetectedItem]:
    method = source.get("check_method") or "html_links"
    config = source.get("config") or {}
    if isinstance(config, str):
        import json

        config = json.loads(config)

    url = source["url"]
    feed_url = source.get("feed_url")

    if method == "rss" and feed_url:
        content = await fetch_url(feed_url)
        return parse_rss(content, url, config)

    html = await fetch_url(feed_url or url)

    if method == "page_hash":
        h = page_hash(html)
        return [
            DetectedItem(
                title=f"Page content change detected at {source['name']}",
                url=url,
            )
        ]

    selector = source.get("link_selector") or "a[href]"
    return parse_html_links(html, url, selector, config)
