import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theofficemitra.com";

export const siteConfig = {
  name: "OfficeMitra",
  domain: "TheOfficeMitra.com",
  tagline: "One Stop • Knowledge • Guidance",
  url: siteUrl,
  description:
    "Andhra Pradesh's one-stop platform for ministerial staff — knowledge, procedures, discussions, tools, and expert guidance.",
};

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: { canonical: url },
  };
}
