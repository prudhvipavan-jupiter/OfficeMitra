import { DepartmentHub } from "@/components/departments/DepartmentHub";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Finance & Treasury Hub",
  description: "APGLI, GPF, pay bills, medical reimbursement, and treasury resources for AP ministerial staff.",
  path: "/departments/finance",
});

export default function FinanceDepartmentPage() {
  return (
    <DepartmentHub
      config={{
        slug: "finance",
        titleKey: "finance",
        articleCategories: ["finance", "treasury", "apgli", "gpf"],
      }}
    />
  );
}
