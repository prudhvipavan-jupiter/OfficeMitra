import { getUpdates, type UpdateEntry } from "@/lib/content";
import { intelUpdateToPublicEntry } from "@/lib/intelligence/public";
import { getPublishedIntelUpdates, isIntelligenceEnabled } from "@/lib/intelligence/store";

export async function getAllPublishedUpdates(): Promise<UpdateEntry[]> {
  const markdown = getUpdates();

  if (!isIntelligenceEnabled()) {
    return markdown;
  }

  try {
    const intel = await getPublishedIntelUpdates();
    const intelEntries = intel.map(intelUpdateToPublicEntry);
    return [...markdown, ...intelEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return markdown;
  }
}

export async function getPublishedUpdateBySlug(
  slug: string
): Promise<UpdateEntry | undefined> {
  const markdown = getUpdates().find((u) => u.slug === slug);
  if (markdown) return markdown;

  if (!isIntelligenceEnabled()) return undefined;

  try {
    const { getPublishedIntelUpdateBySlug } = await import("@/lib/intelligence/store");
    const intel = await getPublishedIntelUpdateBySlug(slug);
    return intel ? intelUpdateToPublicEntry(intel) : undefined;
  } catch {
    return undefined;
  }
}
