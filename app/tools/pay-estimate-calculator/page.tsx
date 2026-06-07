import { PayEstimateCalculatorPage } from "@/components/tools/PayEstimateCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Pay Estimate Calculator",
  description: "Estimate basic + DA + HRA gross pay for AP government employees.",
  path: "/tools/pay-estimate-calculator",
});

export default function Page() {
  return <PayEstimateCalculatorPage />;
}
