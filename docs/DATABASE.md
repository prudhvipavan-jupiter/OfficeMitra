# Database Setup

OfficeMitra stores **dynamic data** in Postgres:

- Expert Assistance requests
- Community discussions and replies
- Article feedback counts

Static content (articles, procedures, documents) remains in git markdown/JSON files.

## Local development (no database)

Without `POSTGRES_URL`, data is saved to `data/*.json` (gitignored). This is fine for local testing.

## Production (Vercel)

**You must set `POSTGRES_URL`.** Vercel's filesystem is read-only — JSON files do not persist.

### Recommended: Vercel Postgres

1. Open your Vercel project → **Storage** → **Create Database** → **Postgres**
2. Connect the database to the project
3. Redeploy — `POSTGRES_URL` is added automatically

Tables are created on the first API request. Sample community discussions are seeded if the table is empty.

### Alternative: Neon or Supabase

1. Create a Postgres database at [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com)
2. Copy the connection string
3. Add as `POSTGRES_URL` in Vercel environment variables
4. Optional: run `npm run db:setup` locally with the same URL to verify

## Manual setup

```bash
POSTGRES_URL="postgresql://..." npm run db:setup
```

## Schema

| Table | Purpose |
|---|---|
| `expert_requests` | Expert Assistance form submissions |
| `discussions` | Community Q&A (replies stored as JSONB) |
| `article_feedback` | Helpful / not helpful counts per article slug |

## Migrating existing local JSON data

If you have requests in `data/expert-requests.json` before switching to Postgres, import them manually or re-submit test requests after deploy. The JSON files are not auto-imported.
