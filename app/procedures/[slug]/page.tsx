import { notFound } from "next/navigation";
import { ProcedureView } from "@/components/procedures/ProcedureView";
import { loadProcedureBySlug, loadProcedures } from "@/lib/cms/loaders";
import { siteConfig } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const procedures = await loadProcedures();
  return procedures.map((p) => ({ slug: p.slug }));
}

export default async function ProcedurePage({ params }: PageProps) {
  const { slug } = await params;
  const procedure = await loadProcedureBySlug(slug);
  if (!procedure) notFound();
  return (
    <ProcedureView
      procedure={procedure}
      shareUrl={`${siteConfig.url}/procedures/${slug}`}
    />
  );
}
