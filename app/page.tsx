import { HeroSearch } from "@/components/home/HeroSearch";
import { CaseFinder } from "@/components/home/CaseFinder";
import { ExpertBanner } from "@/components/home/ExpertBanner";
import { FeaturedDocuments } from "@/components/home/FeaturedDocuments";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { OneStopHub, StaffAlertsBar } from "@/components/home/OneStopHub";
import { PopularProcedures } from "@/components/home/PopularProcedures";
import { TrustSection } from "@/components/home/TrustSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "One Stop Platform for AP Government Staff",
  description:
    "OfficeMitra — knowledge, procedures, community discussions, FAQ, tools, official portals, and expert guidance for Andhra Pradesh ministerial staff.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSearch />
      <StaffAlertsBar />
      <OneStopHub />
      <TrustSection />
      <CaseFinder />
      <PopularProcedures />
      <LatestUpdates />
      <FeaturedDocuments />
      <ExpertBanner />
    </>
  );
}
