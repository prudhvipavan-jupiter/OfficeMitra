import type { MetadataRoute } from "next";
import { getArticles, getProcedures, getUpdates } from "@/lib/content";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages = [
    "",
    "/knowledge",
    "/procedures",
    "/documents",
    "/templates",
    "/updates",
    "/official-links",
    "/tools",
    "/tools/probation-calculator",
    "/tools/el-encashment-calculator",
    "/tools/gpf-recovery-calculator",
    "/tools/service-period-calculator",
    "/tools/retirement-date-calculator",
    "/tools/increment-due-calculator",
    "/tools/pay-estimate-calculator",
    "/tools/working-days-calculator",
    "/community",
    "/faq",
    "/glossary",
    "/departments/health",
    "/expert-assistance",
    "/search",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const articles = getArticles().map((a) => ({
    url: `${base}/knowledge/${a.slug}`,
    lastModified: new Date(a.updated_at ?? a.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const procedures = getProcedures().map((p) => ({
    url: `${base}/procedures/${p.slug}`,
    lastModified: new Date(p.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const updates = getUpdates().map((u) => ({
    url: `${base}/updates/${u.slug}`,
    lastModified: new Date(u.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articles, ...procedures, ...updates];
}
