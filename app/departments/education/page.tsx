import { DepartmentHub } from "@/components/departments/DepartmentHub";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Education Department Hub",
  description: "Establishment and service rules resources for Andhra Pradesh education department offices.",
  path: "/departments/education",
});

export default function EducationDepartmentPage() {
  return (
    <DepartmentHub
      config={{
        slug: "education",
        titleKey: "education",
        articleCategories: ["establishment", "service-rules", "leave"],
      }}
    />
  );
}
