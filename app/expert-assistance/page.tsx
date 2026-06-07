import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ExpertForm } from "@/components/expert/ExpertForm";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Health Department Expert Assistance",
  description:
    "Request personalized administrative guidance from experienced practitioners. Currently available for Andhra Pradesh Health Department institutions.",
  path: "/expert-assistance",
});

export default async function ExpertAssistancePage() {
  const { dict: t } = await getTranslations();

  return (
    <Container narrow className="py-10">
      <h1 className="text-3xl font-bold text-navy-900">{t.expert.title}</h1>
      <p className="mt-3 text-lg text-gray-600">{t.expert.subtitle}</p>

      <div
        role="note"
        className="mt-6 rounded-xl border border-gold-300 bg-gold-100 p-5 text-sm text-navy-900"
      >
        <strong>Notice:</strong> {t.expert.notice}
      </div>

      <div className="mt-4 rounded-lg border border-navy-100 bg-navy-50 p-4 text-sm text-navy-800">
        <strong>{t.expert.responseTime}</strong> {t.expert.responseDays}{" "}
        <strong>{t.expert.referenceFormat}</strong>{" "}
        <code className="rounded bg-white px-1">OM-EA-YYYY-XXXXX</code>
        {" · "}
        <Link href="/expert-assistance/track" className="font-medium underline">
          {t.expert.trackExisting}
        </Link>
      </div>

      <div className="mt-10">
        <ExpertForm />
      </div>
    </Container>
  );
}
