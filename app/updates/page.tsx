import Link from "next/link";

import { Container, SectionHeading } from "@/components/ui/Container";

import { getAllPublishedUpdates, getPublishedUpdateBySlug } from "@/lib/intelligence/merged-updates";

import { getTranslations } from "@/lib/i18n/server";

import { formatDate } from "@/lib/utils";

import { createPageMetadata } from "@/lib/metadata";



export const metadata = createPageMetadata({

  title: "Updates Centre",

  description: "Curated summaries of policy changes — what changed, who is affected, and what action is required.",

  path: "/updates",

});



export const dynamic = "force-dynamic";

export default async function UpdatesPage() {

  const { dict: t } = await getTranslations();

  const updates = await getAllPublishedUpdates();



  return (

    <Container className="py-10">

      <SectionHeading title={t.updates.title} subtitle={t.updates.subtitle} />



      <div className="space-y-6">

        {updates.map((update) => (

          <article

            key={update.slug}

            className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm transition hover:shadow-md"

          >

            <div className="border-l-4 border-gold-600 p-6 md:p-8">

              <div className="flex flex-wrap gap-2 text-xs">

                <span className="rounded-full bg-navy-100 px-3 py-0.5 font-semibold capitalize text-navy-700">

                  {update.category}

                </span>

                <time dateTime={update.date} className="text-gray-500">

                  {formatDate(update.date)}

                </time>

              </div>

              <h2 className="mt-3 text-xl font-bold text-navy-900 md:text-2xl">

                <Link href={`/updates/${update.slug}`} className="hover:text-navy-700">

                  {update.title}

                </Link>

              </h2>

              <dl className="mt-4 grid gap-3 text-sm md:grid-cols-3">

                <div>

                  <dt className="font-semibold text-navy-900">{t.updates.whatChanged}</dt>

                  <dd className="mt-1 text-gray-600">{update.what_changed}</dd>

                </div>

                <div>

                  <dt className="font-semibold text-navy-900">{t.updates.whoAffected}</dt>

                  <dd className="mt-1 text-gray-600">{update.who_is_affected}</dd>

                </div>

                <div>

                  <dt className="font-semibold text-navy-900">{t.updates.actionRequired}</dt>

                  <dd className="mt-1 text-gray-600">{update.action_required}</dd>

                </div>

              </dl>

              <Link

                href={`/updates/${update.slug}`}

                className="mt-4 inline-block text-sm font-medium text-navy-700 hover:underline"

              >

                {t.updates.readFull}

              </Link>

            </div>

          </article>

        ))}

      </div>

    </Container>

  );

}

