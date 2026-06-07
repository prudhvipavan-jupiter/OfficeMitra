# OfficeMitra Intelligence Engine

Automated **detection** and **AI-assisted drafting** of government updates — with **mandatory manual approval** before anything goes public.

## What it does

1. Checks configured AP government sources every **30 minutes**
2. Detects **new** listings (title + URL metadata only — no content copying)
3. Generates **original** OfficeMitra explanatory drafts via AI
4. Queues drafts for **admin review** at `/admin/intelligence`
5. Sends **email alerts** to admin when new items are detected
6. Publishes to `/updates` only after **Approve → Publish**

## Folder structure

```
supabase/migrations/001_intelligence_engine.sql   # Database schema + seed sources
intelligence-engine/                              # Python worker (FastAPI + APScheduler)
  app/main.py                                     # API + scheduler lifecycle
  app/monitor/runner.py                           # Monitoring orchestration
  app/monitor/fetcher.py                          # RSS/HTML metadata extraction
  app/ai/draft_generator.py                       # Original AI summaries
  app/email/notifier.py                           # Admin alerts
lib/intelligence/                                 # Next.js data layer
app/admin/intelligence/                           # Admin dashboard UI
app/api/admin/intelligence/                       # Admin API (auth required)
```

## Setup checklist

### 1. Database (Supabase PostgreSQL)

1. Open Supabase → SQL Editor
2. Paste and run `supabase/migrations/001_intelligence_engine.sql`
3. Copy **Database URI** → use as both:
   - Vercel `POSTGRES_URL` (Next.js app)
   - Worker `DATABASE_URL`

### 2. Next.js (Vercel)

Add environment variables:

```
POSTGRES_URL=postgresql://...
INTELLIGENCE_WORKER_URL=https://your-worker.railway.app
INTELLIGENCE_API_KEY=<long random string>
OPENAI_API_KEY=sk-...          # optional on Next.js; required on worker for AI
```

### 3. Python worker

Deploy `intelligence-engine/` to Railway, Render, or Fly.io:

```
DATABASE_URL=postgresql://...
INTELLIGENCE_API_KEY=<same as Vercel>
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
ADMIN_EMAIL=admin@theofficemitra.com
MONITOR_INTERVAL_MINUTES=30
```

Docker:

```bash
cd intelligence-engine
docker build -t officemitra-intelligence .
docker run -p 8080:8080 --env-file .env officemitra-intelligence
```

### 4. Verify

- Worker health: `GET /health`
- Manual run: `POST /monitor/run` with header `X-Intelligence-Key`
- Admin UI: `https://theofficemitra.com/admin/intelligence`
- Approve a draft → Publish → appears on `/updates`

## Workflow

| Status | Meaning |
|---|---|
| `NEW` | Detected, awaiting AI draft |
| `DRAFT_GENERATED` | AI draft ready for review |
| `APPROVED` | Admin approved, ready to publish |
| `PUBLISHED` | Live on Updates Centre |
| `REJECTED` | Dismissed |

## Security

- `/admin/intelligence` protected by existing admin session middleware
- Worker API requires `X-Intelligence-Key` header
- Public users cannot access review queue or approve content
- Monitor never stores full GO/circular body text from source sites

## Compliance

- **No automatic republication** of government content
- AI prompts instruct: metadata only, original explanatory text
- Every published update links to official `source_url` for verification

## Scaling notes

- Add sources via Admin Panel sidebar or `POST /sources` on worker API
- Increase worker instances only if manual `/monitor/run` load grows; one scheduler instance is sufficient
- For Mitra AI (V3): query `intel_detected_updates` keywords + categories as retrieval signals
