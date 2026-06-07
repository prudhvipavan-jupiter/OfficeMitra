# OfficeMitra Modules

Module specifications with V1 scope boundaries. V1 includes all public content modules plus Expert Assistance and Admin Panel.

---

## V1 Scope Summary

| Module | V1 | Notes |
|---|---|---|
| Knowledge Hub | Yes | Full article schema |
| Procedure Guides | Yes | Step-by-step workflows |
| Document Library | Yes | Search, filter, download |
| Templates Library | Yes | Basic downloadable formats |
| Updates Centre | Yes | Curated summaries, not PDF-only |
| Expert Assistance | Yes | Request form MVP — the moat |
| Mitra AI | No | V3 |
| Admin Panel | Yes | Content + expert request management |

---

## Module 1 – Knowledge Hub

### Purpose

Provide structured knowledge articles that explain rules in practical, office-ready terms.

### Categories (V1)

- Establishment
- Finance
- Leave
- APGLI
- GPF
- Treasury
- Service Rules

### Article Structure

Every article must include:

| Section | Required | Description |
|---|---|---|
| Overview | Yes | Plain-language summary of the topic |
| Applicable Rules | Yes | Relevant service rules and regulations |
| Government Orders | Yes | Linked GO references with numbers and dates |
| Procedure | Yes | How to process the case in office |
| Checklist | Yes | Documents and steps required |
| Sample Draft | Recommended | Example proceeding, note, or memo |
| Service Register Entry | Recommended | SR entry format where applicable |
| Common Audit Objections | Recommended | What auditors flag and how to avoid it |
| References | Yes | Source documents and related articles |

### V1 Features

- Category browsing and filtering
- Full-text search
- Related articles and procedures
- Expert Assistance CTA on every article footer
- Mobile-responsive reading layout

### Out of V1

- User comments or ratings
- Version history UI (content versioned in git/CMS)

---

## Module 2 – Procedure Guides

### Purpose

Step-by-step workflows for common administrative processes.

### V1 Examples

**Establishment:** Promotion, Probation, Relinquishment, Seniority

**Finance:** APGLI Loan, GPF Advance, Medical Reimbursement

### Structure

| Field | Type | Description |
|---|---|---|
| title | string | Procedure name |
| category | enum | Establishment, Finance, Leave, etc. |
| summary | string | One-line description |
| prerequisites | list | What must be in place before starting |
| steps | ordered list | Numbered steps with details |
| required_documents | list | Documents needed at each stage |
| common_mistakes | list | Pitfalls to avoid |
| related_articles | refs | Links to Knowledge Hub articles |
| related_templates | refs | Links to Templates Library |
| expert_assistance_cta | boolean | Show CTA (default: true) |

### V1 Features

- Step-by-step UI with progress indication
- Printable checklist view
- Cross-links to documents and templates

---

## Module 3 – Document Library

### Purpose

Centralized repository for official documents.

### Content Types

- Government Orders (GOs)
- Circulars
- Manuals
- Checklists
- Forms

### V1 Features

- Search by title, number, keyword
- Filter by category, year, department
- PDF download
- Metadata display (GO number, date, department, subject)

### Out of V1

- Automated GO scraping/ingestion
- OCR full-text inside PDFs

---

## Module 4 – Templates Library

### Purpose

Ready-to-use office document formats.

### V1 Examples

- Proceedings
- Office Notes
- Memos
- Agreements
- Notices
- Service Register Entries

### V1 Features

- Category browsing
- Preview before download
- Download as Word (.docx) or PDF
- Brief usage notes per template

### Out of V1

- Interactive Draft Builder (V4)
- Advanced/premium templates (OfficeMitra Plus)

---

## Module 5 – Updates Centre

### Purpose

Track and explain important policy and administrative changes.

### Categories

- Finance Updates
- Establishment Updates
- Health Updates
- APPSC Notifications

### Structure

Each update entry includes:

| Field | Description |
|---|---|
| title | Update headline |
| date | Effective or publication date |
| category | Finance, Establishment, Health, APPSC |
| what_changed | Plain-language summary |
| who_is_affected | Target employees/institutions |
| action_required | Steps offices must take |
| source_document | Link to GO/circular in Document Library |
| related_articles | Updated or new articles |

### Difference From Other Sites

OfficeMitra does not only upload GOs. Every update explains **what changed**, **who is affected**, and **what action is required**.

---

## Module 6 – Expert Assistance

### Purpose

Personalized guidance from administrative experts. **V1 launch — platform moat.**

See full specification: [EXPERT-ASSISTANCE.md](EXPERT-ASSISTANCE.md)

### V1 Scope

- Public request form
- Five service types
- Health Department institutions only
- Email-based expert response
- Admin request management

### Out of V1

- In-app messaging (V2)
- Expanded departments (V2)
- Priority/paid tiers (OfficeMitra Plus)
- Automated AI review (V3+)

---

## Module 7 – Mitra AI

### Purpose

Administrative AI assistant.

### Status

**V3 — not in V1 or V2.**

Planned capabilities: rule lookup, GO references, procedure guidance, checklists, draft suggestions. Trained on platform content and anonymized Expert Assistance patterns.

---

## Admin Panel

### Purpose

Internal tool for content management and Expert Assistance operations.

### V1 Features

| Area | Capability |
|---|---|
| Content | Create, edit, publish articles, procedures, updates |
| Documents | Upload and categorize GOs, circulars, forms |
| Templates | Upload and manage template files |
| Expert Requests | View, assign, update status, log responses |
| Search Analytics | Basic view of popular searches (optional V1.1) |

### Out of V1

- Multi-user roles and permissions (single admin initially)
- Content approval workflows
- Automated publishing schedules

---

## Homepage Integration

All modules surface on the homepage:

- **Hero search** across articles, procedures, documents
- **Quick category tiles:** Establishment, Finance, Leave, Templates, Documents, Updates
- **Latest Updates** feed
- **Popular Procedures**
- **Expert Assistance banner** — live CTA, not "coming soon"

---

*See also: [VISION](VISION.md) · [ROADMAP](ROADMAP.md) · [EXPERT-ASSISTANCE](EXPERT-ASSISTANCE.md)*
