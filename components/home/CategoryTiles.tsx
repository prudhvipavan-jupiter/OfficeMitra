import Link from "next/link";

import {

  Bell,

  BookOpen,

  Calculator,

  ExternalLink,

  FileText,

  FolderOpen,

  Wallet,

} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/Container";

import { getTranslations } from "@/lib/i18n/server";



export async function CategoryTiles() {

  const { dict: t } = await getTranslations();



  const categories = [

    {

      label: t.quickAccess.establishment,

      href: "/knowledge?category=establishment",

      icon: BookOpen,

      description: t.quickAccess.establishmentDesc,

    },

    {

      label: t.quickAccess.finance,

      href: "/knowledge?category=finance",

      icon: Wallet,

      description: t.quickAccess.financeDesc,

    },

    {

      label: t.quickAccess.leave,

      href: "/knowledge?category=leave",

      icon: Bell,

      description: t.quickAccess.leaveDesc,

    },

    {

      label: t.quickAccess.templates,

      href: "/templates",

      icon: FileText,

      description: t.quickAccess.templatesDesc,

    },

    {

      label: t.quickAccess.documents,

      href: "/documents",

      icon: FolderOpen,

      description: t.quickAccess.documentsDesc,

    },

    {

      label: t.quickAccess.updates,

      href: "/updates",

      icon: Bell,

      description: t.quickAccess.updatesDesc,

    },

    {

      label: t.quickAccess.officialLinks,

      href: "/official-links",

      icon: ExternalLink,

      description: t.quickAccess.officialLinksDesc,

    },

    {

      label: t.nav.tools,

      href: "/tools",

      icon: Calculator,

      description: t.tools.subtitle,

    },

  ];



  return (

    <section className="py-16">

      <Container>

        <SectionHeading title={t.quickAccess.title} subtitle={t.quickAccess.subtitle} />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {categories.map(({ label, href, icon: Icon, description }) => (

            <Link

              key={label}

              href={href}

              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-md"

            >

              <Icon className="h-8 w-8 text-navy-700 transition group-hover:text-gold-600" />

              <span className="mt-3 font-semibold text-navy-900">{label}</span>

              <span className="mt-1 hidden text-xs text-gray-500 sm:block">

                {description}

              </span>

            </Link>

          ))}

        </div>

      </Container>

    </section>

  );

}

