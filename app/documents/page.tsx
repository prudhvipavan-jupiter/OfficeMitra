import Link from "next/link";

import { Download, FileText } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/Container";

import { filterDocuments, type DocumentType } from "@/lib/documents";
import { loadDocuments } from "@/lib/cms/loaders";

import { getTranslations } from "@/lib/i18n/server";

import type { ArticleCategory } from "@/lib/categories";

import { formatDate } from "@/lib/utils";

import { createPageMetadata } from "@/lib/metadata";



export const metadata = createPageMetadata({

  title: "Document Library",

  description: "Search and download GOs, circulars, manuals, and forms for Andhra Pradesh government administration.",

  path: "/documents",

});



interface PageProps {

  searchParams: Promise<{

    department?: string;

    year?: string;

    category?: string;

    type?: string;

    q?: string;

    id?: string;

  }>;

}



export default async function DocumentsPage({ searchParams }: PageProps) {

  const params = await searchParams;

  const { dict: t } = await getTranslations();

  const allDocs = await loadDocuments();
  const documents = filterDocuments(params, allDocs);

  const years = [...new Set(allDocs.map((d) => d.year))].sort((a, b) => b - a);

  const categoryKeys = Object.keys(t.categories) as ArticleCategory[];

  const docTypeKeys = Object.keys(t.docTypes) as DocumentType[];



  return (

    <Container className="py-10">

      <SectionHeading title={t.documents.title} subtitle={t.documents.subtitle} />



      <form method="get" className="mb-8 grid gap-4 rounded-xl border border-navy-100 bg-navy-50 p-5 sm:grid-cols-2 lg:grid-cols-5">

        <input

          name="q"

          defaultValue={params.q}

          placeholder={t.documents.searchPlaceholder}

          className="input-field lg:col-span-2"

        />

        <select

          name="category"

          defaultValue={params.category ?? ""}

          className="input-field"

        >

          <option value="">{t.documents.allCategories}</option>

          {categoryKeys.map((k) => (

            <option key={k} value={k}>

              {t.categories[k]}

            </option>

          ))}

        </select>

        <select

          name="year"

          defaultValue={params.year ?? ""}

          className="input-field"

        >

          <option value="">{t.documents.allYears}</option>

          {years.map((y) => (

            <option key={y} value={y}>

              {y}

            </option>

          ))}

        </select>

        <select

          name="type"

          defaultValue={params.type ?? ""}

          className="input-field"

        >

          <option value="">{t.documents.allTypes}</option>

          {docTypeKeys.map((k) => (

            <option key={k} value={k}>

              {t.docTypes[k]}

            </option>

          ))}

        </select>

        <button

          type="submit"

          className="rounded-lg bg-navy-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-navy-600 sm:col-span-2 lg:col-span-1"

        >

          {t.common.filter}

        </button>

      </form>



      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {documents.map((doc) => (

          <article

            key={doc.id}

            id={doc.id}

            className={`rounded-xl border bg-white p-5 shadow-sm ${

              params.id === doc.id

                ? "border-gold-600 ring-2 ring-gold-100"

                : "border-navy-100"

            }`}

          >

            <div className="flex gap-3">

              <FileText className="h-8 w-8 shrink-0 text-navy-700" />

              <div>

                <span className="text-xs font-medium text-gold-600">

                  {t.docTypes[doc.type as DocumentType]}

                </span>

                <h3 className="font-semibold text-navy-900">{doc.number}</h3>

                <p className="mt-1 text-sm text-gray-600">{doc.subject}</p>

                <p className="mt-2 text-xs text-gray-500">

                  {formatDate(doc.date)} · {doc.department}

                </p>

              </div>

            </div>

            {doc.related_articles.length > 0 && (

              <div className="mt-3 text-xs text-gray-500">

                {t.documents.related}{" "}

                {doc.related_articles.map((slug) => (

                  <Link

                    key={slug}

                    href={`/knowledge/${slug}`}

                    className="text-navy-700 hover:underline"

                  >

                    {slug}

                  </Link>

                ))}

              </div>

            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {doc.file?.endsWith(".pdf") && (
                <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                  PDF
                </span>
              )}
              <a
                href={doc.file ?? `#${doc.id}`}
                download={doc.file?.endsWith(".pdf") ? undefined : true}
                target={doc.file?.endsWith(".pdf") ? "_blank" : undefined}
                rel={doc.file?.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-md bg-navy-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-navy-600"
              >

                <Download className="h-4 w-4" />

                {t.common.download}

              </a>

              {doc.goir_url && (

                <a

                  href={doc.goir_url}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="inline-flex items-center gap-2 rounded-md border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-700 hover:bg-navy-50"

                >

                  {t.documents.viewOnGoir}

                </a>

              )}

            </div>

          </article>

        ))}

      </div>



      {documents.length === 0 && (

        <p className="text-center text-gray-500">{t.documents.empty}</p>

      )}

    </Container>

  );

}

