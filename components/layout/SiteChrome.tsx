import { headers } from "next/headers";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileQuickBar } from "@/components/layout/MobileQuickBar";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main id="main-content" className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pb-[4.5rem] lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileQuickBar />
      <BackToTop />
    </>
  );
}
