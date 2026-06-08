"use client";



import Link from "next/link";

import { Printer } from "lucide-react";

import ReactMarkdown from "react-markdown";

import { useTranslations } from "@/components/i18n/LanguageProvider";

import { ExpertBanner } from "@/components/home/ExpertBanner";

import { Container } from "@/components/ui/Container";

import { WhatsAppShare } from "@/components/ui/WhatsAppShare";

import type { Procedure } from "@/lib/content";

interface ProcedureViewProps {
  procedure: Procedure;
  shareUrl: string;
}

export function ProcedureView({ procedure, shareUrl }: ProcedureViewProps) {
  const t = useTranslations();

  const steps = procedure.content
    .split(/^## Step \d+:/gm)
    .filter(Boolean)
    .map((block, i) => ({
      number: i + 1,
      content: block.trim(),
    }));

  const checklistItems =
    procedure.checklist?.length
      ? procedure.checklist
      : [
          t.procedures.checklistItems.verify,
          t.procedures.checklistItems.collect,
          t.procedures.checklistItems.prepare,
          t.procedures.checklistItems.approval,
          t.procedures.checklistItems.sr,
        ];

  const docItems =
    procedure.required_documents?.length
      ? procedure.required_documents
      : [
          t.procedures.docItems.appointment,
          t.procedures.docItems.service,
          t.procedures.docItems.acrs,
          t.procedures.docItems.go,
        ];



  return (

    <Container className="py-10">

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">

        <div className="max-w-[720px]">

          <nav className="text-sm text-gray-500">

            <Link href="/procedures" className="hover:text-navy-700">

              {t.nav.procedures}

            </Link>

            <span className="mx-2">/</span>

            <span>{t.categories[procedure.category]}</span>

          </nav>



          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

            <div>

              <span className="text-xs font-semibold uppercase text-gold-600">

                {t.categories[procedure.category]}

              </span>

              <h1 className="mt-1 text-3xl font-bold text-navy-900">

                {procedure.title}

              </h1>

              <p className="mt-2 text-gray-600">{procedure.summary}</p>

            </div>

            <div className="no-print flex flex-wrap items-center gap-2">

              <button

                type="button"

                onClick={() => window.print()}

                className="inline-flex items-center gap-2 rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"

              >

                <Printer className="h-4 w-4" />

                {t.common.print}

              </button>

              <WhatsAppShare
                title={procedure.title}
                url={shareUrl}
                slug={procedure.slug}
                contentType="procedure"
                compact
              />

            </div>

          </div>



          {procedure.related_articles?.map((slug) => (

            <Link

              key={slug}

              href={`/knowledge/${slug}`}

              className="mt-4 inline-block text-sm font-medium text-navy-700 hover:underline"

            >

              {t.procedures.viewRelatedArticle}

            </Link>

          ))}

          {procedure.sr_reminder && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <strong>SR reminder:</strong> {procedure.sr_reminder}
            </p>
          )}



          <ol className="mt-10 space-y-6">

            {steps.map((step) => (

              <li

                key={step.number}

                className="flex gap-4 rounded-xl border border-navy-100 bg-white p-5 shadow-sm"

              >

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-700 text-sm font-bold text-white">

                  {step.number}

                </span>

                <div className="prose-article flex-1 pt-1">

                  <ReactMarkdown>{step.content}</ReactMarkdown>

                </div>

              </li>

            ))}

          </ol>



          <div className="no-print mt-10">

            <ExpertBanner fullWidth={false} />

          </div>

        </div>



        <aside className="no-print mt-10 space-y-6 lg:mt-0">

          {procedure.estimated_time && (

            <div className="rounded-xl border border-navy-100 bg-navy-50 p-5">

              <h2 className="text-sm font-semibold text-navy-900">

                {t.procedures.estimatedTime}

              </h2>

              <p className="mt-1 text-gray-700">{procedure.estimated_time}</p>

            </div>

          )}



          <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">

            <h2 className="text-sm font-semibold text-navy-900">

              {t.procedures.checklist}

            </h2>

            <ul className="mt-3 space-y-2 text-sm text-gray-700">

              {checklistItems.map((item) => (

                <li key={item} className="flex gap-2">

                  <span className="text-navy-700">☐</span> {item}

                </li>

              ))}

            </ul>

          </div>



          <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">

            <h2 className="text-sm font-semibold text-navy-900">

              {t.procedures.requiredDocuments}

            </h2>

            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-700">

              {docItems.map((item) => (

                <li key={item}>{item}</li>

              ))}

            </ul>

          </div>



          <Link

            href="/templates"

            className="block rounded-xl border border-gold-200 bg-gold-50 p-5 text-sm font-medium text-navy-900 hover:bg-gold-100"

          >

            {t.procedures.relatedTemplate}

          </Link>

        </aside>

      </div>

    </Container>

  );

}

