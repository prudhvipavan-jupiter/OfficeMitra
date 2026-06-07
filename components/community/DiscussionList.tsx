"use client";

import Link from "next/link";
import { MessageSquare, Eye } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { formatDate } from "@/lib/utils";

export interface DiscussionListItem {
  id: string;
  created_at: string;
  author_name: string;
  designation: string;
  institution: string;
  category: string;
  title: string;
  body: string;
  reply_count: number;
  views: number;
}

interface DiscussionListProps {
  discussions: DiscussionListItem[];
}

export function DiscussionList({ discussions }: DiscussionListProps) {
  const t = useTranslations();

  if (discussions.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-navy-200 bg-navy-50 px-6 py-10 text-center text-gray-600">
        {t.community.empty}
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {discussions.map((d) => (
        <li key={d.id}>
          <Link
            href={`/community/${d.id}`}
            className="block rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition hover:border-navy-700 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-navy-100 px-2.5 py-0.5 font-medium text-navy-700">
                {d.category === "general"
                  ? t.community.categories.general
                  : (t.categories as Record<string, string>)[d.category] ?? d.category}
              </span>
              <time dateTime={d.created_at} className="text-gray-500">
                {formatDate(d.created_at)}
              </time>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-navy-900">{d.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{d.body}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <span>
                {d.author_name} · {d.designation}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {d.reply_count} {t.community.replies}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {d.views}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
