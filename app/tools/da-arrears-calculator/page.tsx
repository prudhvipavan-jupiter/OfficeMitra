import { DaArrearsCalculatorPage } from "@/components/tools/DaArrearsCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DA Arrears Calculator",
  description: "Estimate DA arrears when DA rate is revised for AP government employees.",
  path: "/tools/da-arrears-calculator",
});

export default function Page() {
  return <DaArrearsCalculatorPage />;
}
