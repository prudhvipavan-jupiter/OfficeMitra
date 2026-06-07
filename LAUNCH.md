# OfficeMitra — Launch Checklist

## Pre-launch configuration

1. Copy `.env.example` to `.env.local`
2. Set strong values for:
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_TOKEN`
   - `NEXT_PUBLIC_SITE_URL=https://theofficemitra.com`
3. Optional: set `RESEND_API_KEY` for Expert Assistance email confirmations

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000

## Production build

```powershell
npm.cmd run build
npm.cmd start
```

## Admin access

- URL: `/admin/login`
- Default password (change in `.env.local`): `officemitra2026`

## Launch content included

| Content | Count |
|---|---|
| P0 Knowledge Hub articles | 8 |
| Procedure guides | 8 |
| Documents (downloadable) | 20 |
| Templates (downloadable) | 8 |
| Updates Centre entries | 5 |

## Key URLs

| Page | URL |
|---|---|
| Homepage | `/` |
| Knowledge Hub | `/knowledge` |
| Expert Assistance | `/expert-assistance` |
| Track request | `/expert-assistance/track?ref=OM-EA-2026-00001` |
| Admin | `/admin/login` |
| Sitemap | `/sitemap.xml` |

## Deploy to Vercel

1. Push repo to GitHub
2. Import project in Vercel
3. Set environment variables from `.env.example`
4. Point domain `theofficemitra.com` to Vercel

## Before going live

- [ ] Change admin password and session token
- [ ] Configure Resend for email
- [ ] Replace reference document `.txt` files with official GO PDFs where available
- [ ] Add Google Analytics (optional)
- [ ] Test Expert Assistance form end-to-end

## Re-seed content

```powershell
npm.cmd run seed
```
