import { HraCalculatorPage } from "@/components/tools/HraCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "HRA Calculator",
  description: "Calculate House Rent Allowance from basic pay and city class for AP government employees.",
  path: "/tools/hra-calculator",
});

export default function Page() {
  return <HraCalculatorPage />;
}
