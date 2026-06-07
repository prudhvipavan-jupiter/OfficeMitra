import { ElEncashmentCalculatorPage } from "@/components/tools/ElEncashmentCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "EL Encashment Calculator",
  description: "Estimate earned leave encashment amount on retirement for AP government staff.",
  path: "/tools/el-encashment-calculator",
});

export default function ElEncashmentPage() {
  return <ElEncashmentCalculatorPage />;
}
