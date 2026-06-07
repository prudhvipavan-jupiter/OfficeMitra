import { ProbationCalculatorPage } from "@/components/tools/ProbationCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Probation Date Calculator",
  description: "Calculate probation completion date for AP government employees.",
  path: "/tools/probation-calculator",
});

export default function ProbationCalculatorRoute() {
  return <ProbationCalculatorPage />;
}
