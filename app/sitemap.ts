import type { MetadataRoute } from "next";
import { loadArticles, loadProcedures } from "@/lib/cms/loaders";
import { getAllPublishedUpdates } from "@/lib/intelligence/merged-updates";
import { siteConfig } from "@/lib/metadata";
import { toolDefinitions } from "@/lib/tools/registry";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    ...toolDefinitions.map((t) => t.href),
    "/community",
    "/faq",
    "/glossary",
    "/departments/health",
    "/departments/finance",
    "/departments/education",
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

  const [articles, procedures, updates] = await Promise.all([
    loadArticles(),
    loadProcedures(),
    getAllPublishedUpdates(),
  ]);

  const articleEntries = articles.map((a) => ({
    url: `${base}/knowledge/${a.slug}`,
    lastModified: new Date(a.updated_at ?? a.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const procedureEntries = procedures.map((p) => ({
    url: `${base}/procedures/${p.slug}`,
    lastModified: new Date(p.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const updateEntries = updates.map((u) => ({
    url: `${base}/updates/${u.slug}`,
    lastModified: new Date(u.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articleEntries, ...procedureEntries, ...updateEntries];
}