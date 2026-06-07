# OfficeMitra Content Model

Structured schemas for all content types and the V1 authoring decision.

---

## Authoring Model Decision

**Chosen approach: Hybrid (MDX in repo for V1, CMS migration path for V2+)**

| Phase | Approach | Rationale |
|---|---|---|
| V1 launch | MDX files with YAML frontmatter in git | Fast start, version-controlled, no CMS hosting cost, structured sections map to MDX components |
| V2+ | Migrate to headless CMS (Payload or Sanity) | When non-developer authors need self-service publishing |

### Why Hybrid

- Article schema has 9 structured sections — frontmatter + MDX section headings enforce this in V1
- Expert Assistance and admin panel need a database regardless; content can stay in git initially
- Avoids CMS setup delay before V1 launch
- Git history provides audit trail for content changes (important for government-adjacent content)

### MDX File Structure (V1)

```
content/
├── articles/
│   └── establishment/
│       └── probation-declaration.mdx
├── procedures/
│   └── establishment/
│       └── probation-declaration.mdx
├── documents/
│   └── metadata.json          # PDF files in public/documents/
├── templates/
│   └── metadata.json          # Template files in public/templates/
└── updates/
    └── 2026/
        └── finance-apgli-rate-change.mdx
```

---

## Article Schema

### Frontmatter

```yaml
---
title: "Probation Declaration — Procedure and Draft"
slug: probation-declaration
category: establishment          # establishment | finance | leave | apgli | gpf | treasury | service-rules
tags: [probation, establishment, health-department]
summary: "How to declare probation for Health Department staff under AP service rules."
status: published                # draft | published | archived
published_at: 2026-06-01
updated_at: 2026-06-01
author: OfficeMitra
related_procedures: [probation-declaration-procedure]
related_documents: [go-ms-123-2020]
related_templates: [probation-proceedings-template]
expert_assistance_cta: true
---
```

### Body Sections (required MDX headings)

```mdx
## Overview
## Applicable Rules
## Government Orders
## Procedure
## Checklist
## Sample Draft
## Service Register Entry
## Common Audit Objections
## References
```

Sections marked "Recommended" in MODULES.md may use `<!-- optional -->` in draft articles but should be filled before publishing.

---

## Procedure Schema

### Frontmatter

```yaml
---
title: "Probation Declaration — Step-by-Step"
slug: probation-declaration-procedure
category: establishment
summary: "Complete workflow for declaring probation."
estimated_time: "2-3 working days"
prerequisites:
  - "Appointment order issued"
  - "Six months service completed"
required_documents:
  - "Appointment order copy"
  - "Service certificate"
  - "Qualifying certificate"
common_mistakes:
  - "Declaring probation before six months"
  - "Missing SR entry"
related_articles: [probation-declaration]
related_templates: [probation-proceedings-template]
status: published
published_at: 2026-06-01
---
```

### Body

Ordered steps as MDX:

```mdx
## Step 1: Verify Eligibility
## Step 2: Prepare Proceedings
...
```

---

## Document Schema

Stored as JSON metadata; PDF files in `public/documents/`.

```json
{
  "id": "go-ms-123-2020",
  "title": "GO Ms.No.123 — Probation Rules Amendment",
  "type": "go",
  "number": "GO Ms.No.123",
  "date": "2020-05-15",
  "department": "General Administration",
  "category": "establishment",
  "subject": "Amendment to probation rules for AP state services",
  "file": "/documents/go-ms-123-2020.pdf",
  "tags": ["probation", "establishment"],
  "related_articles": ["probation-declaration"],
  "status": "published"
}
```

### Document Types

| type | Description |
|---|---|
| go | Government Order |
| circular | Department circular |
| manual | Office manual or handbook |
| checklist | Standalone checklist |
| form | Official form |

---

## Template Schema

```json
{
  "id": "probation-proceedings-template",
  "title": "Probation Declaration Proceedings",
  "category": "establishment",
  "description": "Standard proceedings format for probation declaration in Health Department institutions.",
  "file_docx": "/templates/probation-proceedings.docx",
  "file_pdf": "/templates/probation-proceedings.pdf",
  "usage_notes": "Fill in employee name, designation, date of appointment, and probation period.",
  "related_articles": ["probation-declaration"],
  "related_procedures": ["probation-declaration-procedure"],
  "status": "published"
}
```

---

## Update Schema

### Frontmatter

```yaml
---
title: "APGLI Premium Rate Revision — June 2026"
slug: apgli-premium-rate-june-2026
date: 2026-06-01
category: finance                 # finance | establishment | health | appsc
what_changed: "APGLI premium rates revised effective 1 June 2026."
who_is_affected: "All APGLI subscribers in Health Department institutions."
action_required: "Update deduction schedules in pay bills from June 2026."
source_document: go-ms-456-2026
related_articles: [apgli-premium-deduction]
status: published
---
```

---

## Expert Request Schema

Stored in database (not MDX). See [EXPERT-ASSISTANCE.md](EXPERT-ASSISTANCE.md).

```typescript
interface ExpertRequest {
  id: string;                    // UUID
  reference_number: string;        // OM-EA-2026-00001
  created_at: Date;
  status: 'pending' | 'assigned' | 'in_review' | 'responded' | 'closed';
  
  // Requester
  name: string;
  designation: string;
  institution: string;
  department: string;            // Must be Health Department institution (V1)
  email: string;
  phone?: string;
  
  // Request
  service_type: ServiceType;
  case_summary: string;
  attachment_url?: string;
  related_article_slug?: string;
  
  // Admin
  assigned_to?: string;
  response_notes?: string;
  responded_at?: Date;
}

type ServiceType =
  | 'draft_review'
  | 'rule_clarification'
  | 'establishment_guidance'
  | 'finance_guidance'
  | 'document_review';
```

---

## Search Index Fields

All public content types indexed for V1 full-text search (Pagefind or equivalent):

| Content Type | Indexed Fields |
|---|---|
| Article | title, summary, tags, all body sections |
| Procedure | title, summary, steps, prerequisites, common_mistakes |
| Document | title, number, subject, tags |
| Template | title, description, usage_notes |
| Update | title, what_changed, who_is_affected, action_required |

---

## CMS Migration Path (V2+)

When migrating to Payload or Sanity:

1. Map frontmatter fields to CMS collection schemas (1:1)
2. Import MDX body as rich text or portable text
3. Keep git as backup/export until CMS is stable
4. Admin panel switches from file-based to CMS API

---

*See also: [MODULES](MODULES.md) · [TECH-STACK](TECH-STACK.md) · [SEED-CONTENT](SEED-CONTENT.md)*
