# OfficeMitra Tech Stack — V1 Decision

Technology choices for V1 development, aligned with content model and Expert Assistance requirements.

---

## Decision Summary

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SEO, API routes for forms, admin routes, strong ecosystem |
| Language | **TypeScript** | Type safety for content schemas and request models |
| Styling | **Tailwind CSS** | Matches design system tokens; mobile-first utilities |
| Content (V1) | **MDX + YAML frontmatter** | Per CONTENT-MODEL.md hybrid approach |
| Search (V1) | **Pagefind** | Static full-text search, no external service cost |
| Database | **JSON file store** (V1) | Expert requests in `data/expert-requests.json`; SQLite planned when native build tools available |
| File storage | **Local / Vercel Blob** | Document and template uploads |
| Email | **Resend** (or Nodemailer + SMTP) | Request confirmations and expert responses |
| Hosting | **Vercel** | Next.js native; easy preview deployments |
| Auth (admin) | **NextAuth.js** | Single admin user initially; expandable |

---

## Why Next.js Over Alternatives

### vs Astro

- Expert Assistance form needs API routes and database — Astro would require a separate backend service
- Admin panel fits naturally as Next.js protected routes
- Single deployment target for content + forms + admin

### vs WordPress

- Structured article schema (9 sections) is easier to enforce with MDX components than WordPress blocks
- Developer-led content at launch; CMS migration planned for V2+
- No PHP hosting or plugin maintenance

---

## Project Structure (V1 Scaffold)

```
OfficeMitra/
├── app/                        # Next.js App Router
│   ├── (public)/               # Public pages
│   │   ├── page.tsx            # Homepage
│   │   ├── knowledge/          # Knowledge Hub
│   │   ├── procedures/         # Procedure Guides
│   │   ├── documents/          # Document Library
│   │   ├── templates/          # Templates Library
│   │   ├── updates/            # Updates Centre
│   │   └── expert-assistance/  # Request form
│   ├── admin/                  # Protected admin panel
│   └── api/                    # Form submission, search
├── components/                 # UI components
├── content/                    # MDX articles, procedures, updates
├── public/
│   ├── documents/              # PDF files
│   └── templates/              # DOCX/PDF templates
├── lib/                        # DB, email, content utilities
├── docs/                       # Project documentation (this folder)
└── drizzle/                    # Database migrations
```

---

## Key Dependencies (Planned)

```json
{
  "next": "^15",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^4",
  "@next/mdx": "latest",
  "drizzle-orm": "latest",
  "better-sqlite3": "latest",
  "next-auth": "^5",
  "resend": "latest",
  "pagefind": "latest",
  "zod": "latest"
}
```

---

## Search Strategy

### V1 — Pagefind

- Index at build time from MDX content and document metadata
- Client-side search, no external API cost
- Homepage hero search uses same index

### V3 — Semantic Search (Mitra AI)

- Vector embeddings over article content
- Expert Assistance query history as training signal
- Evaluate: Pinecone, pgvector, or Vercel AI SDK

---

## Database Schema (V1)

Minimal tables for Expert Assistance and admin:

| Table | Purpose |
|---|---|
| `expert_requests` | Form submissions and status tracking |
| `admin_users` | Admin authentication |
| `search_logs` | Optional — popular queries (V1.1) |

Content stays in MDX/git for V1 — no content tables until CMS migration.

---

## Deployment

| Environment | Target | Notes |
|---|---|---|
| Development | `localhost:3000` | SQLite local file |
| Preview | Vercel preview branches | Per-PR deployments |
| Production | Vercel + custom domain | SQLite → Turso or Postgres when scaling |

### Environment Variables

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
RESEND_API_KEY=
ADMIN_EMAIL=
```

---

## Security (V1)

- Admin routes protected by NextAuth
- Form submission rate limiting (API route)
- File upload: type validation (PDF, DOCX only), 5 MB max
- CSRF protection on forms
- HTTPS enforced in production

---

## Out of V1 Tech Scope

- Mitra AI / LLM integration (V3)
- Payment processing (OfficeMitra Plus)
- Real-time in-app messaging (V2)
- Headless CMS (V2+ migration)
- Mobile native apps

---

## Foundation Status

Documentation foundation is complete. V1 scaffold exists with:

- Homepage, Knowledge Hub, procedures, updates, documents, templates pages
- Expert Assistance form and API route
- Admin request viewer
- Sample P0 content (Probation Declaration article and procedure)

### Next development steps

1. Resolve local `npm install` (file-lock / antivirus on `node_modules`)
2. Run `npm run dev` and verify all routes
3. Complete remaining P0 seed content (see [SEED-CONTENT.md](SEED-CONTENT.md))
4. Add Pagefind search index at build time
5. Wire Resend email for Expert Assistance confirmations

---

*See also: [CONTENT-MODEL](CONTENT-MODEL.md) · [DESIGN-SYSTEM](DESIGN-SYSTEM.md) · [ROADMAP](ROADMAP.md)*
