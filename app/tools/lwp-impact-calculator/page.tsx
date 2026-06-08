import { LwpImpactCalculatorPage } from "@/components/tools/LwpImpactCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "LWP Salary Impact Calculator",
  description: "Estimate salary deduction for Leave Without Pay days in a pay month.",
  path: "/tools/lwp-impact-calculator",
});

export default function Page() {
  return <LwpImpactCalculatorPage />;
}
