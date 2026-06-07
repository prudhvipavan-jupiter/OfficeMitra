import { ServicePeriodCalculatorPage } from "@/components/tools/ServicePeriodCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Service Period Calculator",
  description: "Calculate years, months, and days of service from joining date.",
  path: "/tools/service-period-calculator",
});

export default function Page() {
  return <ServicePeriodCalculatorPage />;
}
