import Link from "next/link";
import { Download, ExternalLink, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/ui/Container";
import { WhatsAppShare } from "@/components/ui/WhatsAppShare";
import { getPublishedUpdateBySlug } from "@/lib/intelligence/merged-updates";
import { documentsForTitle } from "@/lib/intelligence/document-links";
import { loadUpdates } from "@/lib/cms/loaders";
import { getTranslations } from "@/lib/i18n/server";
import { siteConfig } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const updates = await loadUpdates();
  return updates.map((u) => ({ slug: u.slug }));
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const { dict: t, locale } = await getTranslations();
  const update = await getPublishedUpdateBySlug(slug);
  if (!update) notFound();

  const extraDocs = documentsForTitle(update.title);
  const hasDocs =
    update.source_url || update.document_url || update.related_knowledge_slug || extraDocs.length > 0;

  return (
    <Container narrow className="py-10">
      <nav className="text-sm text-gray-500">
        <Link href="/updates" className="hover:text-navy-700">
          {t.updates.title}
        </Link>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-navy-100 px-3 py-0.5 text-xs font-semibold capitalize text-navy-700">
          {update.category}
        </span>
        <time dateTime={update.date} className="text-xs text-gray-500">
          {formatDate(update.date)}
        </time>
        <WhatsAppShare
          title={update.title}
          url={`${siteConfig.url}/updates/${update.slug}`}
          slug={update.slug}
          contentType="update"
          compact
        />
      </div>

      <h1 className="mt-4 text-3xl font-bold text-navy-900">{update.title}</h1>

      {hasDocs && (
        <div className="mt-6 rounded-xl border border-gold-200 bg-gold-50 p-5 dark:border-gold-800 dark:bg-gold-950/30">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy-900 dark:text-white">
            <FileText className="h-4 w-4 text-gold-700" />
            Official documents &amp; links
          </h2>
          <ul className="mt-3 space-y-2">
            {update.document_url && (
              <li>
                <a
                  href={update.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700"
                >
                  <Download className="h-4 w-4" />
                  Download official document (PDF)
                </a>
              </li>
            )}
            {update.source_url && (
              <li>
                <a
                  href={update.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-gold-700 dark:text-navy-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on official source portal
                </a>
              </li>
            )}
            {extraDocs.map((doc) => (
              <li key={doc.url}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-gold-700 dark:text-navy-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  {doc.label}
                  <span className="text-xs text-gray-500">({doc.type})</span>
                </a>
              </li>
            ))}
            {update.related_knowledge_slug && (
              <li>
                <Link
                  href={`/knowledge/${update.related_knowledge_slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-800 hover:text-gold-600"
                >
                  <FileText className="h-4 w-4" />
                  Read full OfficeMitra step-by-step guide →
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      <dl className="mt-8 space-y-5 rounded-xl border border-navy-100 bg-navy-50 p-6 dark:border-navy-700 dark:bg-navy-900/50">
        <div>
          <dt className="text-sm font-bold text-navy-900 dark:text-white">{t.updates.whatChanged}</dt>
          <dd className="mt-1 whitespace-pre-line text-gray-700 dark:text-gray-300">{update.what_changed}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-navy-900 dark:text-white">{t.updates.whoAffected}</dt>
          <dd className="mt-1 whitespace-pre-line text-gray-700 dark:text-gray-300">{update.who_is_affected}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-navy-900 dark:text-white">{t.updates.actionRequired}</dt>
          <dd className="mt-1 whitespace-pre-line text-gray-700 dark:text-gray-300">{update.action_required}</dd>
        </div>
      </dl>

      {locale === "te" && (
        <p className="mt-4 rounded-lg border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-navy-800">
          {t.common.contentInEnglish}
        </p>
      )}

      {update.content && (
        <article className="prose-article mt-8">
          <ReactMarkdown>{update.content}</ReactMarkdown>
        </article>
      )}

      <Link href="/knowledge" className="mt-8 inline-block text-sm font-medium text-navy-700 hover:underline">
        {t.updates.browseArticles}
      </Link>
    </Container>
  );
}
