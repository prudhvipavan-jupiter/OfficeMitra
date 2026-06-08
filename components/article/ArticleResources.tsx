import Link from "next/link";
import { Calculator, Download, FileText } from "lucide-react";
import { getArticleResources } from "@/lib/article-resources";
import { getTranslations } from "@/lib/i18n/server";
import { toolHrefByKey, type ToolKey } from "@/lib/tools/registry";

const toolPaths = toolHrefByKey;

interface ArticleResourcesProps {
  slug: string;
}

export async function ArticleResources({ slug }: ArticleResourcesProps) {
  const { dict: t } = await getTranslations();
  const resources = await getArticleResources(slug);

  if (!resources) return null;

  const hasContent =
    resources.tools.length > 0 ||
    resources.templates.length > 0 ||
    resources.documents.length > 0;

  if (!hasContent) return null;

  return (
    <section className="mt-10 rounded-xl border border-navy-100 bg-navy-50/50 p-6">
      <h2 className="text-lg font-semibold text-navy-900">{t.articleResources.title}</h2>
      <p className="mt-1 text-sm text-gray-600">{t.articleResources.subtitle}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {resources.tools.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
              <Calculator className="h-4 w-4" /> {t.nav.tools}
            </h3>
            <ul className="mt-2 space-y-1">
              {resources.tools.map((key) => (
                <li key={key}>
                  <Link
                    href={toolPaths[key]}
                    className="text-sm text-navy-700 hover:underline"
                  >
                    {t.tools[key].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resources.templates.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
              <FileText className="h-4 w-4" /> {t.nav.templates}
            </h3>
            <ul className="mt-2 space-y-1">
              {resources.templates.map((tpl) => (
                <li key={tpl!.id}>
                  <Link href="/templates" className="text-sm text-navy-700 hover:underline">
                    {tpl!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resources.documents.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
              <Download className="h-4 w-4" /> {t.nav.documents}
            </h3>
            <ul className="mt-2 space-y-1">
              {resources.documents.map((doc) => (
                <li key={doc!.id}>
                  <a
                    href={doc!.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-navy-700 hover:underline"
                  >
                    {doc!.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
