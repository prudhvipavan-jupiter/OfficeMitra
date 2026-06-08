import Link from "next/link";
import {
  Calculator,
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  Clock,
  Home,
  IndianRupee,
  Landmark,
  Percent,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import { toolDefinitions, type ToolKey } from "@/lib/tools/registry";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Office Tools",
  description: "Free calculators and utilities for AP government administrative work.",
  path: "/tools",
});

const iconMap: Record<ToolKey, LucideIcon> = {
  probation: Calculator,
  elEncashment: CalendarDays,
  gpfRecovery: Wallet,
  servicePeriod: Clock,
  retirementDate: CalendarDays,
  incrementDue: TrendingUp,
  payEstimate: IndianRupee,
  workingDays: CalendarDays,
  payBillChecklist: ClipboardList,
  apgliPremium: ShieldCheck,
  hraCalculator: Home,
  gpfSubscription: Landmark,
  lwpImpact: TrendingDown,
  leaveAccrual: CalendarPlus,
  daArrears: Percent,
};

export default async function ToolsPage() {
  const { dict: t } = await getTranslations();

  const tools = toolDefinitions.map(({ key, href }) => {
    const section = t.tools[key];
    return {
      href,
      icon: iconMap[key],
      title: section.title,
      description: section.subtitle,
    };
  });

  return (
    <Container className="py-10 md:py-14">
      <SectionHeading title={t.tools.title} subtitle={t.tools.subtitle} />
      <p className="-mt-6 mb-8 text-sm text-gray-500">{t.tools.freeNote}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="card-hover group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-gold-100 group-hover:text-gold-700">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-semibold text-navy-900">{title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{description}</p>
            <span className="card-link-cta">
              {t.common.learnMore} →
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
