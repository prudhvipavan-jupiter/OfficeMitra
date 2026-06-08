/**
 * Builds markdown articles and category SVG hero images from topic definitions.
 */

const CATEGORY_COLORS = {
  establishment: { bg: "#1e3a5f", accent: "#c9a227", icon: "📋" },
  leave: { bg: "#2d5016", accent: "#7cb342", icon: "🏖" },
  apgli: { bg: "#4a148c", accent: "#ce93d8", icon: "🛡" },
  gpf: { bg: "#01579b", accent: "#4fc3f7", icon: "💰" },
  finance: { bg: "#1b5e20", accent: "#ffd54f", icon: "📊" },
  conduct: { bg: "#b71c1c", accent: "#ffcdd2", icon: "⚖" },
  health: { bg: "#00695c", accent: "#80cbc4", icon: "🏥" },
};

export function buildArticleMarkdown(topic, scrapedNotes = "") {
  const rules = topic.primaryRules.map((r) => `- ${r}`).join("\n");
  const steps = topic.procedureSteps.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const checklist = topic.checklist.map((c) => `- [ ] ${c}`).join("\n");
  const audit = topic.auditObjections.map((a, i) => `${i + 1}. ${a}`).join("\n");
  const refs = [
    ...topic.scrapedSources.map((u) => `- [Official source](${u})`),
    scrapedNotes ? `- Scraped reference notes: ${scrapedNotes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const fm = `---
title: "${topic.title.replace(/"/g, '\\"')}"
slug: ${topic.slug}
category: ${topic.category}
tags: [${topic.tags.join(", ")}]
summary: "${topic.summary.replace(/"/g, '\\"')}"
telugu_summary: "${topic.telugu_summary.replace(/"/g, '\\"')}"
status: draft
priority: ${topic.priority ?? 2}
published_at: 2026-06-07
updated_at: 2026-06-07
author: OfficeMitra
verified_go: "Verify current GO on GOIR before processing"
expert_assistance_cta: true
hero_image: /images/articles/${topic.slug}.svg
---

![${topic.title}](/images/articles/${topic.slug}.svg)

`;

  return (
    fm +
    section("Overview", topic.summary + "\n\n" + topic.example.split("\n\n")[0]) +
    section("Applicable Rules", rules) +
    section("Government Orders", topic.goReferences) +
    section("Procedure", steps) +
    section("Checklist", checklist) +
    section("Practical Example", topic.example) +
    section("Sample Draft", topic.sampleDraft) +
    section("Service Register Entry", topic.srEntry) +
    section("Common Audit Objections", audit) +
    section("References", refs)
  );
}

function section(title, body) {
  return `## ${title}\n\n${body.trim()}\n\n`;
}

export function buildHeroSvg(topic) {
  const palette = CATEGORY_COLORS[topic.category] ?? CATEGORY_COLORS.establishment;
  const title =
    topic.title.length > 42 ? topic.title.slice(0, 40) + "…" : topic.title;
  const categoryLabel = topic.category.replace(/-/g, " ").toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420" role="img" aria-label="${topic.title}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette.bg}"/>
      <stop offset="100%" style="stop-color:#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" fill="url(#bg)"/>
  <rect x="0" y="360" width="800" height="4" fill="${palette.accent}"/>
  <circle cx="700" cy="80" r="120" fill="${palette.accent}" opacity="0.12"/>
  <circle cx="100" cy="340" r="80" fill="${palette.accent}" opacity="0.08"/>
  <text x="48" y="72" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="${palette.accent}" letter-spacing="2">${categoryLabel}</text>
  <text x="48" y="140" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" fill="#ffffff">${escapeXml(title)}</text>
  <text x="48" y="190" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#cbd5e1" opacity="0.9">OfficeMitra · AP Health Department Guide</text>
  <text x="48" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="48">${palette.icon}</text>
  ${topic.priority === 1 ? `<rect x="48" y="340" width="120" height="28" rx="14" fill="${palette.accent}"/><text x="108" y="359" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="700" fill="${palette.bg}">WEEK 1</text>` : ""}
</svg>`;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
