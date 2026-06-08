# Hero Content Pipeline

Generates **50 draft knowledge articles** for admin review before publishing.

## Quick start

```powershell
# 1. Scrape official AP gov portals (optional enrichment)
pip install -r scripts/content-pipeline/requirements.txt
npm run content:scrape

# 2. Generate markdown + SVG hero images
npm run content:generate

# 3. Import into CMS as drafts (local or Neon via POSTGRES_URL)
npm run content:import

# Or all at once (skip scrape):
npm run content:pipeline
```

## Review workflow

1. Open **Admin → Content → Knowledge articles** (`/admin/content/article`)
2. Filter by **Draft** — articles marked **Week 1** are launch priority
3. Edit any article, verify GO references, adjust content
4. Change status to **Published** when approved (or use **Publish all drafts**)

Drafts are **not visible** on the public site until published.

## Files

| Path | Purpose |
|------|---------|
| `topics/all-topics.mjs` | 50 article definitions (7 categories) |
| `builder.mjs` | Markdown + SVG generator |
| `scrape_sources.py` | Fetches official portal metadata |
| `scraped/sources.json` | Scraped reference data |
| `manifest.json` | Generated article index |
| `content/articles/{category}/*.md` | Draft markdown files |
| `public/images/articles/*.svg` | Category hero images |

## Week 1 priority (10 articles)

- Probation Declaration
- Relinquishment of Promotion (Rule 28)
- Promotion Process
- Service Register Maintenance
- Earned Leave Rules
- APGLI Loan Application
- GPF Advance
- Increment Sanction
- BCR Maintenance
- Charge Memo Preparation

## Regenerating

Re-running `content:generate` overwrites markdown files. Re-run `content:import` to update CMS records. Existing CMS edits may be overwritten on import — prefer editing in admin after first import.
