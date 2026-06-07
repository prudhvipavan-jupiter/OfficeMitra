import { IncrementDueCalculatorPage } from "@/components/tools/ServicePeriodCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Increment Due Date Calculator",
  description: "Calculate next increment due date from last increment and interval.",
  path: "/tools/increment-due-calculator",
});

export default function Page() {
  return <IncrementDueCalculatorPage />;
}
