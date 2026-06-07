import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { Container } from "@/components/ui/Container";

import { WhatsAppShare } from "@/components/ui/WhatsAppShare";

import { getPublishedUpdateBySlug } from "@/lib/intelligence/merged-updates";
import { getUpdates } from "@/lib/content";

import { getTranslations } from "@/lib/i18n/server";

import { siteConfig } from "@/lib/metadata";

import { formatDate } from "@/lib/utils";

import { notFound } from "next/navigation";



interface PageProps {

  params: Promise<{ slug: string }>;

}



export const dynamic = "force-dynamic";

export async function generateStaticParams() {

  return getUpdates().map((u) => ({ slug: u.slug }));

}



export default async function UpdatePage({ params }: PageProps) {

  const { slug } = await params;

  const { dict: t, locale } = await getTranslations();

  const update = await getPublishedUpdateBySlug(slug);

  if (!update) notFound();



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

          compact

        />

      </div>



      <h1 className="mt-4 text-3xl font-bold text-navy-900">{update.title}</h1>



      <dl className="mt-8 space-y-5 rounded-xl border border-navy-100 bg-navy-50 p-6">

        <div>

          <dt className="text-sm font-bold text-navy-900">{t.updates.whatChanged}</dt>

          <dd className="mt-1 text-gray-700">{update.what_changed}</dd>

        </div>

        <div>

          <dt className="text-sm font-bold text-navy-900">{t.updates.whoAffected}</dt>

          <dd className="mt-1 text-gray-700">{update.who_is_affected}</dd>

        </div>

        <div>

          <dt className="text-sm font-bold text-navy-900">{t.updates.actionRequired}</dt>

          <dd className="mt-1 text-gray-700">{update.action_required}</dd>

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



      <Link

        href="/knowledge"

        className="mt-8 inline-block text-sm font-medium text-navy-700 hover:underline"

      >

        {t.updates.browseArticles}

      </Link>

    </Container>

  );

}

