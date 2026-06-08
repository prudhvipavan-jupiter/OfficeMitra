import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { ExpertBanner } from "@/components/home/ExpertBanner";
import { ArticleFeedback } from "@/components/feedback/ArticleFeedback";
import { ArticleResources } from "@/components/article/ArticleResources";
import { MobileTableOfContents } from "@/components/article/MobileTableOfContents";
import { TableOfContents } from "@/components/article/TableOfContents";
import { VerifiedBadge } from "@/components/article/VerifiedBadge";
import { WorkflowStrip } from "@/components/article/WorkflowStrip";

import { Container } from "@/components/ui/Container";

import { WhatsAppShare } from "@/components/ui/WhatsAppShare";

import {
  extractHeadings,
  type ArticleCategory,
} from "@/lib/content";
import { loadArticles, loadArticleBySlug } from "@/lib/cms/loaders";

import { getTranslations } from "@/lib/i18n/server";

import { siteConfig } from "@/lib/metadata";

import { formatDate } from "@/lib/utils";

import { notFound } from "next/navigation";
import type { Metadata } from "next";



interface PageProps {

  params: Promise<{ slug: string }>;

}



export async function generateStaticParams() {
  const articles = await loadArticles();
  return articles.map((a) => ({ slug: a.slug }));
}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticleBySlug(slug);
  if (!article) return {};
  const url = `${siteConfig.url}/knowledge/${slug}`;
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url,
      siteName: siteConfig.name,
      type: "article",
    },
    alternates: { canonical: url },
  };
}



export default async function ArticlePage({ params }: PageProps) {

  const { slug } = await params;

  const { dict: t, locale } = await getTranslations();

  const article = await loadArticleBySlug(slug);

  if (!article) notFound();



  const headings = extractHeadings(article.content);

  const related = (await loadArticles())

    .filter((a) => a.category === article.category && a.slug !== slug)

    .slice(0, 3);



  const contentWithIds = article.content.replace(

    /^## (.+)$/gm,

    (_, title) => {

      const id = title

        .trim()

        .toLowerCase()

        .replace(/[^a-z0-9]+/g, "-")

        .replace(/(^-|-$)/g, "");

      return `## ${title.trim()} {#${id}}`;

    }

  );



  return (

    <Container className="py-10">

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">

        <article className="max-w-[720px]">

          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">

            <Link href="/knowledge" className="hover:text-navy-700">

              {t.nav.knowledge}

            </Link>

            <span className="mx-2">/</span>

            <span>{t.categories[article.category as ArticleCategory]}</span>

          </nav>



          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-navy-100 px-3 py-0.5 text-xs font-medium text-navy-700">

              {t.categories[article.category as ArticleCategory]}

            </span>

            <time dateTime={article.published_at} className="text-xs text-gray-500">

              {formatDate(article.published_at)}

            </time>

          </div>



          <h1 className="mt-4 text-3xl font-bold text-navy-900">

            {article.title}

          </h1>

          {article.telugu_summary && (

            <div className="mt-3 rounded-lg border border-navy-100 bg-navy-50 px-4 py-3">

              <p className="text-xs font-semibold uppercase text-navy-600">

                {t.knowledge.teluguOverview}

              </p>

              <p className="mt-1 text-base text-navy-800">{article.telugu_summary}</p>
              {article.telugu_overview && (
                <p className="mt-3 text-sm leading-relaxed text-navy-800 whitespace-pre-line">
                  {article.telugu_overview}
                </p>
              )}

            </div>

          )}

          <p className="mt-3 text-lg text-gray-600">{article.summary}</p>

          <MobileTableOfContents headings={headings} />

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">

            {article.updated_at && (

              <span>

                {t.common.updated} {formatDate(article.updated_at)}

              </span>

            )}

            {article.verified_at && (
              <VerifiedBadge verifiedAt={article.verified_at} />
            )}
            {!article.verified_at && article.verified_go && (
              <VerifiedBadge note={article.verified_go} />
            )}
            <WhatsAppShare
              title={article.title}
              url={`${siteConfig.url}/knowledge/${article.slug}`}
              slug={article.slug}
              contentType="article"
              compact
            />

          </div>



          <div className="mt-6">

            <WorkflowStrip

              articleSlug={article.slug}

              procedureSlug={article.related_procedures?.[0]}

            />

          </div>



          {locale === "te" && (

            <p className="mt-4 rounded-lg border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-navy-800">

              {t.common.contentInEnglish}

            </p>

          )}



          <p className="mt-4 rounded-lg border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-800">

            {t.common.guidanceOnly}

          </p>



          <div className="prose-article mt-10">
            <ReactMarkdown
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  const id = text
                    .replace(/\s*\{#[^}]+\}\s*$/, "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                  const display = text.replace(/\s*\{#[^}]+\}\s*$/, "");
                  return <h2 id={id}>{display}</h2>;
                },
              }}
            >
              {contentWithIds}
            </ReactMarkdown>
          </div>

          <ArticleResources slug={article.slug} />

          <div className="mt-8">
            <ArticleFeedback slug={article.slug} />
          </div>

          {related.length > 0 && (

            <section className="mt-12 border-t border-gray-200 pt-8">

              <h2 className="text-lg font-semibold text-navy-900">

                {t.knowledge.relatedArticles}

              </h2>

              <ul className="mt-4 space-y-2">

                {related.map((a) => (

                  <li key={a.slug}>

                    <Link

                      href={`/knowledge/${a.slug}`}

                      className="text-navy-700 hover:underline"

                    >

                      {a.title}

                    </Link>

                  </li>

                ))}

              </ul>

            </section>

          )}



          <div className="mt-10">

            <ExpertBanner articleSlug={article.slug} fullWidth={false} />

          </div>

        </article>



        <aside className="hidden lg:block">

          <TableOfContents headings={headings} />

        </aside>

      </div>

    </Container>

  );

}

