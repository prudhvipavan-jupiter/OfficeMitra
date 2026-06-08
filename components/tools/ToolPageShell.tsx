"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/components/i18n/LanguageProvider";

interface ToolPageShellProps {
  title: string;
  subtitle: string;
  note?: string;
  children: React.ReactNode;
}

export function ToolPageShell({ title, subtitle, note, children }: ToolPageShellProps) {
  const t = useTranslations();

  return (
    <Container className="py-10">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-gold-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.tools.backToTools}
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-navy-900">{title}</h1>
      <p className="mt-2 max-w-2xl text-gray-600">{subtitle}</p>
      <div className="mt-8">{children}</div>
      <p className="mt-6 text-sm text-gray-500">{note ?? t.common.guidanceOnly}</p>
    </Container>
  );
}

export function ToolResultBox({
  items,
  note,
}: {
  items: { label: string; value: string; highlight?: boolean }[];
  note?: string;
}) {
  return (
    <dl className="mt-6 grid gap-4 rounded-xl bg-navy-50 p-5 sm:grid-cols-2">
      {items.map(({ label, value, highlight }) => (
        <div key={label}>
          <dt className="text-sm font-semibold text-navy-900">{label}</dt>
          <dd
            className={`mt-1 text-lg font-bold ${highlight ? "text-gold-700" : "text-navy-700"}`}
          >
            {value}
          </dd>
        </div>
      ))}
      {note && (
        <div className="sm:col-span-2">
          <p className="text-sm text-gray-600">{note}</p>
        </div>
      )}
    </dl>
  );
}

export const inputClass = "input-field mt-1";

export const labelClass = "block text-sm font-medium text-gray-700";
