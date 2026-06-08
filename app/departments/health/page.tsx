import { DepartmentHub } from "@/components/departments/DepartmentHub";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Health Department Hub",
  description:
    "Curated knowledge, procedures, and resources for Andhra Pradesh Health Department ministerial staff.",
  path: "/departments/health",
});

export default function HealthDepartmentPage() {
  return (
    <DepartmentHub
      config={{
        slug: "health",
        titleKey: "health",
        articleTags: ["health-department"],
      }}
    />
  );
}
