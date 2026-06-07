# OfficeMitra Design System

Visual and interaction standards for a professional, government-oriented platform.

---

## Design Principles

1. **Professional** — trustworthy, serious, office-appropriate
2. **Government-oriented** — familiar to AP government employees without mimicking official sites
3. **Clean and minimal** — content first, no clutter
4. **Mobile-first** — many users access from phones in office settings
5. **Accessible** — readable text, sufficient contrast, keyboard navigable

---

## Colour Palette

### Primary — Navy Blue

| Token | Hex | Usage |
|---|---|---|
| `navy-900` | `#0A1628` | Headings, primary text on light backgrounds |
| `navy-800` | `#1B2A4A` | Navigation bar, footer |
| `navy-700` | `#2C3E6B` | Primary buttons, links |
| `navy-600` | `#3D528C` | Hover states |
| `navy-100` | `#E8ECF4` | Light backgrounds, card borders |
| `navy-50` | `#F4F6FA` | Section backgrounds |

### Secondary — Gold

| Token | Hex | Usage |
|---|---|---|
| `gold-600` | `#B8860B` | Accent highlights, badges, Expert Assistance CTA |
| `gold-500` | `#D4A017` | Hover on gold elements |
| `gold-100` | `#FBF5E6` | Expert Assistance banner background |
| `gold-50` | `#FDFAF0` | Subtle accent backgrounds |

### Neutral

| Token | Hex | Usage |
|---|---|---|
| `white` | `#FFFFFF` | Page background |
| `gray-50` | `#F9FAFB` | Alternate section background |
| `gray-200` | `#E5E7EB` | Borders, dividers |
| `gray-500` | `#6B7280` | Secondary text, metadata |
| `gray-700` | `#374151` | Body text |
| `gray-900` | `#111827` | Primary body text |

### Semantic

| Token | Hex | Usage |
|---|---|---|
| `success` | `#059669` | Confirmations, completed steps |
| `warning` | `#D97706` | Cautions, audit objections |
| `error` | `#DC2626` | Form errors, critical alerts |
| `info` | `#2563EB` | Informational callouts |

---

## Typography

### Font Stack

```css
--font-heading: 'Inter', 'Segoe UI', system-ui, sans-serif;
--font-body: 'Inter', 'Segoe UI', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Consolas', monospace;
```

Inter is recommended for clean readability. Fallback to Segoe UI on Windows.

### Scale

| Element | Size | Weight | Line Height |
|---|---|---|---|
| H1 (page title) | 2rem / 32px | 700 | 1.2 |
| H2 (section) | 1.5rem / 24px | 600 | 1.3 |
| H3 (subsection) | 1.25rem / 20px | 600 | 1.4 |
| Body | 1rem / 16px | 400 | 1.6 |
| Small / meta | 0.875rem / 14px | 400 | 1.5 |
| Caption | 0.75rem / 12px | 400 | 1.4 |

### Article Content

- Max content width: 720px for readability
- Paragraph spacing: 1.25rem
- Section heading margin-top: 2.5rem

---

## Spacing

Base unit: 4px

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight inline spacing |
| `space-2` | 8px | Icon gaps |
| `space-3` | 12px | Form field padding |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section gaps |
| `space-12` | 48px | Section padding (mobile) |
| `space-16` | 64px | Section padding (desktop) |

---

## Components

### Navigation Bar

- Background: `navy-800`
- Text: white
- Logo left, nav links center/right
- Mobile: hamburger menu
- Sticky on scroll

### Hero Search

- Full-width on homepage
- Large input with placeholder: "Search Rules, Procedures, APGLI, Leave, Promotion..."
- Search button: `navy-700` background, white text
- Subtle shadow, rounded corners (8px)

### Category Tiles

- Grid: 2 columns mobile, 3 tablet, 6 desktop
- Icon + label
- Background: white, border: `navy-100`
- Hover: `navy-50` background, `navy-700` border

Categories: Establishment, Finance, Leave, Templates, Documents, Updates

### Expert Assistance Banner

- Background: `gold-100` with `gold-600` left border accent
- Headline: "Need Professional Guidance?"
- CTA button: `gold-600` background, white text
- Prominent placement on homepage and article footers

### Article Layout

- Breadcrumb navigation
- Category badge
- Table of contents (sticky sidebar on desktop)
- Section headings with anchor links
- Expert Assistance CTA at footer
- Related articles/procedures at bottom

### Procedure Steps

- Numbered steps with circle indicators (`navy-700`)
- Active step highlighted
- Checklist with checkboxes
- Print-friendly stylesheet

### Document Cards

- GO number, date, department, subject
- Download button
- Category tag

### Forms (Expert Assistance)

- Clear labels, required field indicators
- Inline validation
- Disclaimer checkbox before submit
- Submit button: `navy-700`
- Success state with reference number display

### Footer

- Background: `navy-800`
- Disclaimer text (see POSITIONING.md)
- Links: About, Expert Assistance, Contact
- Copyright

---

## Icons

Use Lucide Icons (consistent, clean line style). No emoji in production UI.

| Context | Icon |
|---|---|
| Establishment | `users` |
| Finance | `wallet` |
| Leave | `calendar` |
| Templates | `file-text` |
| Documents | `folder` |
| Updates | `bell` |
| Expert Assistance | `message-circle` |
| Search | `search` |
| Download | `download` |

---

## Responsive Breakpoints

| Name | Width | Notes |
|---|---|---|
| mobile | < 640px | Default, single column |
| tablet | 640–1024px | 2-column grids |
| desktop | > 1024px | Full layout, sidebar TOC |

---

## Tailwind Configuration Reference

```javascript
// tailwind.config — key extensions
colors: {
  navy: {
    50: '#F4F6FA', 100: '#E8ECF4', 600: '#3D528C',
    700: '#2C3E6B', 800: '#1B2A4A', 900: '#0A1628',
  },
  gold: {
    50: '#FDFAF0', 100: '#FBF5E6', 500: '#D4A017', 600: '#B8860B',
  },
}
```

---

## Do Not

- Mimic official AP government website branding (differentiate clearly)
- Use red/green saffron combinations associated with government portals
- Use decorative fonts or heavy gradients
- Use emoji in navigation or headings
- Clutter pages with ads or popups

---

*See also: [VISION](VISION.md) · [POSITIONING](POSITIONING.md)*
