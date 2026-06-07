import { notFound } from "next/navigation";
import { ProcedureView } from "@/components/procedures/ProcedureView";
import { getProcedureBySlug, getProcedures } from "@/lib/content";
import { siteConfig } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProcedures().map((p) => ({ slug: p.slug }));
}

export default async function ProcedurePage({ params }: PageProps) {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) notFound();
  return (
    <ProcedureView
      procedure={procedure}
      shareUrl={`${siteConfig.url}/procedures/${slug}`}
    />
  );
}
