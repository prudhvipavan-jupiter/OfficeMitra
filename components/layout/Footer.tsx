import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import { siteConfig } from "@/lib/metadata";

export async function Footer() {
  const { dict: t } = await getTranslations();

  const platformLinks = [
    { href: "/knowledge", label: t.nav.knowledge },
    { href: "/procedures", label: t.nav.procedures },
    { href: "/documents", label: t.nav.documents },
    { href: "/templates", label: t.nav.templates },
    { href: "/updates", label: t.nav.updates },
    { href: "/community", label: t.nav.community },
  ];

  const resourceLinks = [
    { href: "/faq", label: t.nav.faq },
    { href: "/glossary", label: t.nav.glossary },
    { href: "/tools", label: t.nav.tools },
    { href: "/official-links", label: t.nav.officialLinks },
    { href: "/departments/health", label: t.departments.health.title },
    { href: "/expert-assistance", label: t.nav.expertAssistance },
  ];

  const companyLinks = [
    { href: "/about", label: t.footer.about },
    { href: "/contact", label: t.footer.contact },
    { href: "/privacy", label: t.footer.privacy },
    { href: "/terms", label: t.footer.terms },
  ];

  return (
    <footer className="mt-auto border-t border-navy-800 bg-navy-900 text-navy-100">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-600 text-sm font-bold text-white">
                OM
              </span>
              <div>
                <p className="text-lg font-bold text-white">{siteConfig.name}</p>
                <p className="text-xs font-medium text-gold-500">{t.meta.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
              {t.meta.siteDescription}
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-white">{t.footer.platform}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-navy-200 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-white">Resources</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-navy-200 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-white">{t.footer.company}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-navy-200 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-800 pt-8">
          <p className="text-sm leading-relaxed text-navy-200">
            <strong className="font-semibold text-white">Disclaimer:</strong>{" "}
            {t.footer.disclaimer}
          </p>
          <p className="mt-4 text-center text-xs text-navy-300">
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}
