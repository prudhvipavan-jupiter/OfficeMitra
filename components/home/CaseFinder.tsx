import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import type { Dictionary } from "@/lib/i18n";

function getCases(t: Dictionary) {
  return [
    { label: t.caseFinder.declareProbation, href: "/knowledge/probation-declaration", category: t.categories.establishment },
    { label: t.caseFinder.processApgli, href: "/knowledge/apgli-loan-application", category: t.categories.finance },
    { label: t.caseFinder.gpfAdvance, href: "/knowledge/gpf-advance", category: t.categories.finance },
    { label: t.caseFinder.medicalReimbursement, href: "/knowledge/medical-reimbursement", category: t.categories.finance },
    { label: t.caseFinder.fixSr, href: "/knowledge/service-register-maintenance", category: t.categories.establishment },
    { label: t.caseFinder.elEncashment, href: "/knowledge/el-encashment-retirement", category: t.categories.leave },
    { label: t.caseFinder.submitBill, href: "/knowledge/bill-submission-treasury", category: t.categories.treasury },
    { label: t.caseFinder.promotion, href: "/knowledge/promotion-zone-category", category: t.categories.establishment },
  ];
}

export async function CaseFinder() {
  const { dict: t } = await getTranslations();
  const cases = getCases(t);

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading title={t.caseFinder.title} subtitle={t.caseFinder.subtitle} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="card-hover group rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-4 transition hover:border-navy-300 hover:bg-white"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gold-700">
                {c.category}
              </span>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
                {c.label}
              </p>
              <ArrowRight className="mt-2 h-4 w-4 text-navy-400 opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
