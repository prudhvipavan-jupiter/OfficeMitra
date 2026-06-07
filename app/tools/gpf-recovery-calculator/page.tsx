import { GpfRecoveryCalculatorPage } from "@/components/tools/GpfRecoveryCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "GPF Recovery Calculator",
  description: "Calculate monthly GPF advance recovery installments for AP government staff.",
  path: "/tools/gpf-recovery-calculator",
});

export default function Page() {
  return <GpfRecoveryCalculatorPage />;
}
