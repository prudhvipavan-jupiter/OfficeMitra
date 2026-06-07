# OfficeMitra Intelligence Engine

Background monitoring service for AP government administrative sources.

## Quick start (local)

### Windows (PowerShell)

```powershell
cd intelligence-engine

# One-time setup
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# Edit .env — set DATABASE_URL to your Supabase/Postgres URI

# Run worker (use python -m uvicorn — not bare "uvicorn" unless venv is active)
$env:PYTHONPATH = (Get-Location).Path
python -m uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

Or double-click **`start-worker.bat`** (after creating `.env`).

### macOS / Linux

```bash
cd intelligence-engine
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
export PYTHONPATH=$(pwd)
uvicorn app.main:app --reload --port 8080
```

The scheduler runs every **30 minutes** automatically. Trigger manually:

```bash
curl -X POST http://localhost:8080/monitor/run -H "X-Intelligence-Key: your-key"
```

## Database setup

1. Create Supabase project (or use existing Postgres / Vercel Postgres)
2. Run `supabase/migrations/001_intelligence_engine.sql` in SQL Editor
3. Set `DATABASE_URL` to the Postgres connection string (same as `POSTGRES_URL` in Next.js)

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres / Supabase connection URI |
| `INTELLIGENCE_API_KEY` | Yes | Secures worker API endpoints |
| `OPENAI_API_KEY` | Recommended | AI draft generation (fallback templates if missing) |
| `OPENAI_MODEL` | No | Default `gpt-4o-mini` |
| `MONITOR_INTERVAL_MINUTES` | No | Default `30` |
| `RESEND_API_KEY` | For alerts | Admin email on new detections |
| `ADMIN_EMAIL` | For alerts | Alert recipient |

## Deploy worker (Railway / Render / Fly.io)

1. Deploy `intelligence-engine/` as a Docker or Python service
2. Set environment variables
3. Ensure port 8080 is exposed
4. In Vercel (Next.js), set:
   - `INTELLIGENCE_WORKER_URL=https://your-worker.example.com`
   - `INTELLIGENCE_API_KEY=<same key as worker>`

## Architecture

```
Government sites → Python monitor (30 min) → Supabase Postgres
                        ↓
                  AI draft (metadata only)
                        ↓
              Admin review (Next.js /admin/intelligence)
                        ↓
              Manual Approve → Publish → /updates
```

**Nothing is auto-published.** The monitor only stores metadata + AI-generated original summaries.

## Future expansion hooks

- `priority_score` column (reserved in config JSON)
- `department_feed` filtering via source category
- Mitra AI: consume `intel_detected_updates` as training signal
- WhatsApp alerts: extend `app/email/notifier.py`

See `docs/INTELLIGENCE-ENGINE.md` for full deployment guide.
