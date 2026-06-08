import { LeaveAccrualCalculatorPage } from "@/components/tools/LeaveAccrualCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Leave Accrual Estimator",
  description: "Estimate EL or HPL balance accrued from date of joining for AP government staff.",
  path: "/tools/leave-accrual-calculator",
});

export default function Page() {
  return <LeaveAccrualCalculatorPage />;
}
