import { CheckCircle, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";

export async function TrustSection() {
  const { dict: t } = await getTranslations();

  return (
    <section className="section-alt border-y border-navy-100 py-12 md:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
          <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-navy-100 lg:mx-0">
            <Shield className="h-8 w-8 text-navy-700" />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-xl font-bold text-navy-900 md:text-2xl">{t.trust.title}</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-600 lg:max-w-none">
              {t.trust.description}
            </p>
          </div>

          <ul className="space-y-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm lg:min-w-[260px]">
            {[t.trust.point1, t.trust.point2, t.trust.point3].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
