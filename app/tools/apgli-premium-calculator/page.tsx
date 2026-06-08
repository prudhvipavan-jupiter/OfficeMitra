import { ApgliPremiumCalculatorPage } from "@/components/tools/ApgliPremiumCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "APGLI Premium Calculator",
  description: "Estimate monthly APGLI premium from basic pay and sum assured for AP government staff.",
  path: "/tools/apgli-premium-calculator",
});

export default function Page() {
  return <ApgliPremiumCalculatorPage />;
}
