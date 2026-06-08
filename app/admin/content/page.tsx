import Link from "next/link";
import {
  BookOpen,
  FileText,
  FolderOpen,
  HelpCircle,
  Library,
  ListTodo,
  Newspaper,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { CMS_TYPE_LABELS, type CmsContentType } from "@/lib/cms/types";
import { cmsStorageMode } from "@/lib/cms/seed";
import { cmsList } from "@/lib/cms/store";

const types: { type: CmsContentType; icon: typeof BookOpen; href: string }[] = [
  { type: "article", icon: BookOpen, href: "/admin/content/article" },
  { type: "procedure", icon: ListTodo, href: "/admin/content/procedure" },
  { type: "update", icon: Newspaper, href: "/admin/content/update" },
  { type: "document", icon: FolderOpen, href: "/admin/content/document" },
  { type: "template", icon: FileText, href: "/admin/content/template" },
  { type: "faq", icon: HelpCircle, href: "/admin/content/faq" },
  { type: "glossary", icon: Library, href: "/admin/content/glossary" },
];

export default async function AdminContentHubPage() {
  const counts = await Promise.all(types.map(async ({ type }) => (await cmsList(type, { includeDeleted: true })).length));
  const storage = cmsStorageMode();

  return (
    <Container className="py-8">
      <SectionHeading
        title="Site content"
        subtitle={`Manage everything visitors see — articles, documents, FAQ, and more. Stored in ${storage}.`}
      />

      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-navy-800 dark:border-emerald-500/30 dark:bg-emerald-600/10 dark:text-navy-100">
        <strong>Automated:</strong> Empty sections sync from project files on server start. A daily cron keeps CMS in
        sync with git. Use <em>Sync from files</em> for an immediate update, or edit items here — changes go live when
        status is <em>published</em>.
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {types.map(({ type, icon: Icon, href }, i) => (
          <Link
            key={type}
            href={href}
            className="card-hover rounded-xl border border-navy-100 bg-white p-6 dark:border-navy-700 dark:bg-navy-800/80"
          >
            <Icon className="h-7 w-7 text-navy-700 dark:text-navy-200" />
            <h2 className="mt-3 font-semibold text-navy-900 dark:text-white">{CMS_TYPE_LABELS[type]}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-navy-300">{counts[i]} items in CMS</p>
            <span className="card-link-cta mt-3">Manage →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/admin" className="rounded-xl border border-navy-100 bg-white p-5 text-sm dark:border-navy-700 dark:bg-navy-800/80">
          <strong className="text-navy-900 dark:text-white">Community & expert requests</strong>
          <p className="mt-1 text-gray-600 dark:text-navy-300">Moderate Q&A and respond to expert assistance on the main dashboard.</p>
        </Link>
        <Link href="/admin/intelligence" className="rounded-xl border border-navy-100 bg-white p-5 text-sm dark:border-navy-700 dark:bg-navy-800/80">
          <strong className="text-navy-900 dark:text-white">Intelligence engine</strong>
          <p className="mt-1 text-gray-600 dark:text-navy-300">Review detected GOs and publish policy updates.</p>
        </Link>
      </div>
    </Container>
  );
}
