import { IntelligenceDashboard } from "@/components/admin/IntelligenceDashboard";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "OfficeMitra Intelligence",
  description: "Government source monitoring and update review queue.",
  path: "/admin/intelligence",
});

export default function IntelligenceAdminPage() {
  return <IntelligenceDashboard />;
}
