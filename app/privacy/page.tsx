import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "OfficeMitra privacy policy — how we handle your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container narrow className="py-10">
      <h1 className="text-3xl font-bold text-navy-900">Privacy Policy</h1>
      <div className="prose-article mt-8 space-y-4 text-gray-700">
        <p>
          OfficeMitra collects information you provide when using Expert
          Assistance: name, designation, institution, email, phone, and case
          details.
        </p>
        <p>
          This information is used solely to provide administrative guidance
          and improve platform content. We do not sell or share personal data
          with third parties.
        </p>
        <p>
          Case details are handled confidentially. Attachments and case summaries
          are retained for 12 months after case closure, then deleted.
          Anonymized metadata may be retained for analytics.
        </p>
        <p>
          To request deletion of your personal data, contact us through the
          Contact page.
        </p>
      </div>
    </Container>
  );
}
