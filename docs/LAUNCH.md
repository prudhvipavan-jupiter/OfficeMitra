# OfficeMitra Launch Checklist

Use this checklist before pointing **TheOfficeMitra.com** to production.

## 1. Environment variables

Copy `.env.example` to `.env.local` (local) and set in Vercel (production):

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://theofficemitra.com` |
| `POSTGRES_URL` | **Yes (production)** | Vercel Postgres, Neon, or Supabase — stores expert requests, community, feedback |
| `ADMIN_PASSWORD` | Yes | Strong password — not the default |
| `ADMIN_SESSION_TOKEN` | Yes | Long random string (32+ chars) |
| `RESEND_API_KEY` | Yes for email | From [resend.com](https://resend.com) |
| `EMAIL_FROM` | Yes | Verified sender domain |
| `ADMIN_EMAIL` | Yes | Receives BCC on new expert requests |

Without `POSTGRES_URL`, forms work locally (JSON files in `data/`) but **do not persist on Vercel**.

## 2. Database setup

**Option A — Vercel Postgres (recommended)**

1. Vercel project → Storage → Create Database → Postgres
2. Connect to project — `POSTGRES_URL` is injected automatically
3. Deploy — tables auto-create on first request

**Option B — Neon / Supabase**

1. Create a free Postgres database
2. Copy connection string to `POSTGRES_URL` in Vercel
3. Run locally once: `npm run db:setup` (optional — app also migrates on first request)

## 3. Deploy to Vercel

```bash
npm run build   # must pass locally first
git add . && git commit -m "Initial production deploy"
git push
```

1. Push repo to GitHub
2. Import project in Vercel
3. Set environment variables (especially `POSTGRES_URL`)
4. Deploy
5. Add custom domain `theofficemitra.com` + `www` redirect

## 4. Post-deploy verification

- [ ] Homepage, Knowledge Hub, Procedures load
- [ ] Language switcher (EN / తె) works
- [ ] Search returns results
- [ ] Expert Assistance form submits → reference number shown → **survives page refresh**
- [ ] Confirmation email received (if Resend configured)
- [ ] `/admin/login` works with production password
- [ ] Admin can update request status and email user
- [ ] `/community` shows seed discussions; new question appears in admin after submit
- [ ] Admin can publish community reply
- [ ] Article “Was this helpful?” increments counts
- [ ] `/tools/probation-calculator` and `/tools/el-encashment-calculator` work
- [ ] `/official-links` opens external portals
- [ ] `/faq`, `/glossary`, `/departments/health` load
- [ ] WhatsApp share opens with correct URL
- [ ] `sitemap.xml` and `robots.txt` accessible

## 5. Content before marketing

- [ ] Replace `.txt` document downloads with official GO PDFs from GOIR where possible
- [ ] Verify `verified_go` dates on flagship articles
- [ ] Publish 1 Updates Centre entry per week for first month
- [ ] Share 3 flagship articles on WhatsApp groups

## 6. Security

- [ ] Change default admin credentials
- [ ] Expert form rate-limited (5 requests/hour/IP — built in)
- [ ] Community form rate-limited (3 posts/hour/IP — built in)
- [ ] Do not commit `.env.local` or `data/` (gitignored) with real PII

## 7. Optional next steps

- Google Search Console + sitemap submit
- Plausible or GA analytics
- FAQ/glossary/community in global search
- Full Telugu markdown bodies for articles
- Favicon + Open Graph share image

---

**Support:** contact@theofficemitra.com
