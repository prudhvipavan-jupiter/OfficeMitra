"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  HelpCircle,
  ListTodo,
  MessageCircle,
  Users,
} from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { casePaths } from "@/lib/case-paths";
import { toolHrefByKey } from "@/lib/tools/registry";

const caseLabels: Record<string, string> = {
  probation: "declareProbation",
  promotion: "promotion",
  apgli: "processApgli",
  gpf: "gpfAdvance",
  medical: "medicalReimbursement",
  sr: "fixSr",
  el: "elEncashment",
  bill: "submitBill",
};

export function CaseWizard() {
  const t = useTranslations();
  const [selected, setSelected] = useState<string | null>(null);

  if (casePaths.length === 0) return null;

  const path = casePaths.find((p) => p.id === selected);

  return (
    <section className="border-y border-navy-100 bg-gradient-to-b from-navy-50/80 to-white py-12 dark:border-navy-800 dark:from-[#0f1f38] dark:to-[#0a1628] md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-navy-900 md:text-3xl">{t.caseWizard.title}</h2>
          <p className="mt-2 text-gray-600 dark:text-navy-200">{t.caseWizard.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="listbox" aria-label={t.caseWizard.title}>
          {casePaths.map((c) => {
            const isSelected = selected === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => setSelected(c.id === selected ? null : c.id)}
                className={`rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  isSelected
                    ? "border-gold-500 bg-navy-700 text-white shadow-md ring-1 ring-gold-500/40 dark:border-gold-500 dark:bg-navy-800"
                    : "border-navy-100 bg-white text-navy-900 hover:border-navy-300 hover:shadow-sm dark:border-navy-700 dark:bg-navy-800/60 dark:text-navy-100 dark:hover:border-navy-500 dark:hover:bg-navy-800"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">
                  {(t.categories as Record<string, string>)[c.category]}
                </span>
                <p className="mt-1">
                  {t.caseFinder[caseLabels[c.id] as keyof typeof t.caseFinder]}
                </p>
              </button>
            );
          })}
        </div>

        {path && (
          <div className="wizard-panel-enter mx-auto mt-8 max-w-3xl rounded-2xl border border-gold-200 bg-white p-6 shadow-lg dark:border-gold-500/30 dark:bg-navy-800">
            <p className="text-xs font-bold uppercase tracking-wide text-gold-700">
              {t.caseWizard.yourPath}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <WizardLink href={`/knowledge/${path.articleSlug}`} icon={BookOpen} label={t.caseWizard.readArticle} />
              {path.procedureSlug && (
                <WizardLink href={`/procedures/${path.procedureSlug}`} icon={ListTodo} label={t.caseWizard.followProcedure} />
              )}
              {path.tool && (
                <WizardLink href={toolHrefByKey[path.tool]} icon={Calculator} label={t.caseWizard.useTool} />
              )}
              {path.faqHref && (
                <WizardLink href={path.faqHref} icon={HelpCircle} label={t.caseWizard.checkFaq} />
              )}
              <WizardLink href="/community" icon={MessageCircle} label={t.caseFinder.askCommunity} />
              <WizardLink
                href={`/expert-assistance?article=${path.expertPrefill ?? path.articleSlug}`}
                icon={Users}
                label={t.caseWizard.expertHelp}
                highlight
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function WizardLink({
  href,
  icon: Icon,
  label,
  highlight,
}: {
  href: string;
  icon: typeof BookOpen;
  label: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl border p-4 transition hover:shadow-sm ${
        highlight
          ? "border-gold-200 bg-gold-50 hover:bg-gold-100 dark:border-gold-500/30 dark:bg-gold-600/10 dark:hover:bg-gold-600/20"
          : "border-navy-100 hover:bg-navy-50 dark:border-navy-700 dark:hover:bg-navy-700/50"
      }`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${highlight ? "text-gold-700" : "text-navy-700"}`} />
      <span className="text-sm font-medium">{label}</span>
      {highlight && <ArrowRight className="ml-auto h-4 w-4 text-gold-700" />}
    </Link>
  );
}

