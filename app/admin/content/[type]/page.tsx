import { ContentManager } from "@/components/admin/ContentManager";
import type { CmsContentType } from "@/lib/cms/types";
import { notFound } from "next/navigation";

const VALID: CmsContentType[] = ["article", "procedure", "update", "document", "template", "faq", "glossary"];

export default async function AdminContentTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!VALID.includes(type as CmsContentType)) notFound();
  return <ContentManager type={type as CmsContentType} />;
}
