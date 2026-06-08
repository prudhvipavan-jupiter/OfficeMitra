import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { loadDocuments } from "@/lib/cms/loaders";
import type { DocumentType } from "@/lib/documents";
import { formatDate } from "@/lib/utils";
import { getTranslations } from "@/lib/i18n/server";

export async function FeaturedDocuments() {
  const { dict: t } = await getTranslations();
  const documents = (await loadDocuments()).slice(0, 3);

  return (
    <section className="section-alt py-16 md:py-20">
      <Container>
        <SectionHeading
          title={t.featuredDocuments.title}
          subtitle={t.featuredDocuments.subtitle}
          action={
            <Link
              href="/documents"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-gold-700"
            >
              {t.featuredDocuments.browse}
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {documents.map((doc) => (
            <article
              key={doc.id}
              className="card-hover flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50">
                  <FileText className="h-5 w-5 text-navy-700" />
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wide text-gold-700">
                    {t.docTypes[doc.type as DocumentType]}
                  </span>
                  <h3 className="mt-1 truncate font-bold text-navy-900">{doc.number}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{doc.subject}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    {formatDate(doc.date)} · {doc.department}
                  </p>
                </div>
              </div>
              <a
                href={doc.file ?? `/documents?id=${doc.id}`}
                download={!!doc.file}
                className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
              >
                <Download className="h-4 w-4" />
                {t.common.download}
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
