import Link from "next/link";
import {
  BookOpen,
  Calculator,
  FileText,
  HelpCircle,
  Link2,
  MessageCircle,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";

export async function OneStopHub() {
  const { dict: t } = await getTranslations();

  const tiles = [
    { href: "/knowledge", icon: BookOpen, title: t.oneStop.knowledge, desc: t.oneStop.knowledgeDesc },
    { href: "/procedures", icon: FileText, title: t.oneStop.procedures, desc: t.oneStop.proceduresDesc },
    { href: "/community", icon: MessageCircle, title: t.oneStop.community, desc: t.oneStop.communityDesc },
    { href: "/faq", icon: HelpCircle, title: t.oneStop.faq, desc: t.oneStop.faqDesc },
    { href: "/glossary", icon: BookOpen, title: t.oneStop.glossary, desc: t.oneStop.glossaryDesc },
    { href: "/tools", icon: Calculator, title: t.oneStop.tools, desc: t.oneStop.toolsDesc },
    { href: "/official-links", icon: Link2, title: t.oneStop.portals, desc: t.oneStop.portalsDesc },
    { href: "/expert-assistance", icon: Users, title: t.oneStop.expert, desc: t.oneStop.expertDesc },
  ];

  return (
    <section className="section-alt py-14 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
            Platform
          </p>
          <h2 className="mt-2 text-2xl font-bold text-navy-900 md:text-3xl">
            {t.oneStop.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            {t.oneStop.subtitle}
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ href, icon: Icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="card-hover group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm dark:border-navy-700 dark:bg-navy-800/80"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-gold-100 group-hover:text-gold-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{desc}</p>
              <span className="card-link-cta">
                {t.common.learnMore} →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
