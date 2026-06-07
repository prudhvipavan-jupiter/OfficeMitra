import { WorkingDaysCalculatorPage } from "@/components/tools/PayEstimateCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Working Days Calculator",
  description: "Count working days between two dates for leave and establishment work.",
  path: "/tools/working-days-calculator",
});

export default function Page() {
  return <WorkingDaysCalculatorPage />;
}
