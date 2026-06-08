"use client";

import Link from "next/link";
import { ArrowRight, FileText, FolderOpen, ListTodo } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";

interface WorkflowStripProps {
  articleSlug: string;
  procedureSlug?: string;
}

export function WorkflowStrip({ articleSlug, procedureSlug }: WorkflowStripProps) {
  const t = useTranslations();

  const steps = [
    {
      label: t.workflow.article,
      href: `/knowledge/${articleSlug}`,
      icon: FileText,
      active: true,
    },
    procedureSlug
      ? {
          label: t.workflow.procedure,
          href: `/procedures/${procedureSlug}`,
          icon: ListTodo,
          active: false,
        }
      : null,
    {
      label: t.workflow.documents,
      href: `/documents?q=${articleSlug.split("-")[0]}`,
      icon: FolderOpen,
      active: false,
    },
    {
      label: t.workflow.templates,
      href: "/templates",
      icon: FileText,
      active: false,
    },
    {
      label: t.workflow.expertHelp,
      href: `/expert-assistance?article=${articleSlug}`,
      icon: ArrowRight,
      active: false,
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    icon: typeof FileText;
    active: boolean;
  }[];

  return (
    <nav
      aria-label={t.workflow.completeCase}
      className="rounded-xl border border-navy-100 bg-navy-50 p-4"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
        {t.workflow.completeCase}
      </p>
      <ol className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <Link
              href={step.href}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                step.active
                  ? "bg-navy-700 text-white"
                  : "bg-white text-navy-700 hover:bg-navy-100"
              }`}
            >
              <step.icon className="h-4 w-4" />
              {step.label}
            </Link>
            {i < steps.length - 1 && (
              <ArrowRight
                className="hidden h-4 w-4 text-gray-400 sm:block"
                aria-hidden
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
