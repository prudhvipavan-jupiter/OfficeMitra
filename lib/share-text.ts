import { siteConfig } from "./metadata";

interface ShareContent {
  title: string;
  slug: string;
  type: "article" | "procedure" | "update" | "tool";
}

const teluguIntros: Record<string, string> = {};

export function buildWhatsAppShareText(
  content: ShareContent,
  locale: "en" | "te" = "en"
): string {
  const url = `${siteConfig.url}/${content.type === "article" ? "knowledge" : content.type === "procedure" ? "procedures" : content.type === "update" ? "updates" : "tools"}/${content.slug}`;

  if (locale === "te" && teluguIntros[content.slug]) {
    return `${teluguIntros[content.slug]}\n📋 ${content.title}\n\n${url}\n\n— OfficeMitra (AP govt staff)`;
  }

  return `📋 ${content.title}\n\nUseful guide for AP ministerial staff on OfficeMitra.\n\n${url}`;
}
