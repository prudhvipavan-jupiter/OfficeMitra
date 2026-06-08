import { GpfSubscriptionCalculatorPage } from "@/components/tools/GpfSubscriptionCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "GPF Subscription Calculator",
  description: "Calculate monthly GPF subscription from basic pay and percentage for AP government staff.",
  path: "/tools/gpf-subscription-calculator",
});

export default function Page() {
  return <GpfSubscriptionCalculatorPage />;
}
