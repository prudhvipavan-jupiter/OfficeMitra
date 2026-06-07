# OfficeMitra

A professional administrative knowledge, guidance, drafting, and assistance platform for government employees — starting with **Andhra Pradesh Government Administration**, with deep expertise from **Health Department Administration**.

## What OfficeMitra Is

OfficeMitra helps government employees find rules, follow procedures, download documents and templates, track policy updates, and request **Expert Assistance** from practitioners who understand real office work.

It is **not** an official government website and **not** a legal advisory service.

## Who It Serves

**Primary:** Junior Assistants, Senior Assistants, Superintendents, Administrative Officers, DDOs

**Secondary:** Hospital Administrators, Accounts Staff, Establishment Staff, Departmental Test Candidates

## Platform Modules

| Module | Description |
|---|---|
| [Knowledge Hub](docs/MODULES.md#module-1--knowledge-hub) | Structured articles on rules and procedures |
| [Procedure Guides](docs/MODULES.md#module-2--procedure-guides) | Step-by-step workflows |
| [Document Library](docs/MODULES.md#module-3--document-library) | GOs, circulars, manuals, forms |
| [Templates Library](docs/MODULES.md#module-4--templates-library) | Ready-to-use office formats |
| [Updates Centre](docs/MODULES.md#module-5--updates-centre) | Curated policy change summaries |
| [Expert Assistance](docs/EXPERT-ASSISTANCE.md) | Personalized guidance from administrative experts |
| Mitra AI | AI assistant *(V3 — planned)* |
| Admin Panel | Content publishing and request management |

## Documentation

| Document | Purpose |
|---|---|
| [docs/VISION.md](docs/VISION.md) | Master vision — read this first |
| [docs/ROADMAP.md](docs/ROADMAP.md) | V1–V6 release phases and success metrics |
| [docs/MODULES.md](docs/MODULES.md) | Module specs and V1 scope |
| [docs/CONTENT-MODEL.md](docs/CONTENT-MODEL.md) | Content schemas and authoring model |
| [docs/EXPERT-ASSISTANCE.md](docs/EXPERT-ASSISTANCE.md) | Expert Assistance V1 specification |
| [docs/SEED-CONTENT.md](docs/SEED-CONTENT.md) | Launch content priorities |
| [docs/TECH-STACK.md](docs/TECH-STACK.md) | V1 technology decisions |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Colours, typography, UI principles |
| [docs/POSITIONING.md](docs/POSITIONING.md) | Legal disclaimers and brand positioning |

## Current Phase

**Launch-ready V1** — full platform with 8 P0 articles, downloads, Expert Assistance, admin, and SEO.

See [LAUNCH.md](LAUNCH.md) for deployment checklist.

### Run locally

**PowerShell users:** If you see `running scripts is disabled`, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set admin credentials before production.

## V1 Launch Definition

A public site with:

- Homepage (search, categories, updates, Expert Assistance CTA)
- All six content modules (articles, procedures, documents, templates, updates)
- Working Expert Assistance request form
- Admin panel for content and request management

## Design

- **Primary:** Navy Blue
- **Secondary:** Gold
- **Background:** White
- Professional, government-oriented, clean, mobile-first
