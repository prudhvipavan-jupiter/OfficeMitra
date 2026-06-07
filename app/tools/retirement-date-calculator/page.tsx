import { RetirementDateCalculatorPage } from "@/components/tools/ServicePeriodCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Retirement Date Calculator",
  description: "Estimate superannuation date from date of birth and retirement age.",
  path: "/tools/retirement-date-calculator",
});

export default function Page() {
  return <RetirementDateCalculatorPage />;
}
