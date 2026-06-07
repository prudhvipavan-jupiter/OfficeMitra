import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "OfficeMitra terms of use.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container narrow className="py-10">
      <h1 className="text-3xl font-bold text-navy-900">Terms of Use</h1>
      <div className="prose-article mt-8 space-y-4 text-gray-700">
        <p>
          By using OfficeMitra, you agree that content is provided for
          administrative guidance only and is not legal advice or official
          government direction.
        </p>
        <p>
          You are responsible for verifying information with current Government
          Orders and your controlling officer before taking official action.
        </p>
        <p>
          Expert Assistance responses are based on the information you provide
          and practical office experience. OfficeMitra is not liable for
          decisions made solely on platform guidance.
        </p>
      </div>
    </Container>
  );
}
