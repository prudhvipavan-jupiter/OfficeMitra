import { PayBillChecklistPage } from "@/components/tools/PayBillChecklist";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Pay Bill Checklist",
  description: "Interactive checklist for AP government pay bill preparation — APGLI, GPF, DA, and SR updates.",
  path: "/tools/pay-bill-checklist",
});

export default function PayBillChecklistRoute() {
  return <PayBillChecklistPage />;
}
