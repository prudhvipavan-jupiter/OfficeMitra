import { CommunityForm } from "@/components/community/CommunityForm";
import { DiscussionList } from "@/components/community/DiscussionList";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getDiscussions } from "@/lib/db/discussions";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Staff Community",
  description:
    "Public Q&A and discussions for Andhra Pradesh government ministerial staff — moderated by OfficeMitra.",
  path: "/community",
});

export default async function CommunityPage() {
  const { dict: t } = await getTranslations();
  const discussions = (await getDiscussions({ status: "published" })).map((d) => ({
    id: d.id,
    created_at: d.created_at,
    author_name: d.author_name,
    designation: d.designation,
    institution: d.institution,
    category: d.category,
    title: d.title,
    body: d.body,
    reply_count: d.replies.length,
    views: d.views,
  }));

  return (
    <Container className="py-10">
      <SectionHeading title={t.community.title} subtitle={t.community.subtitle} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="text-lg font-semibold text-navy-900">{t.community.recentTitle}</h2>
          <div className="mt-4">
            <DiscussionList discussions={discussions} />
          </div>
        </div>
        <aside>
          <CommunityForm />
          <p className="mt-4 text-xs leading-relaxed text-gray-500">{t.community.moderationNote}</p>
        </aside>
      </div>
    </Container>
  );
}
