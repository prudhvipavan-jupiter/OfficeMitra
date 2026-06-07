import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/metadata";

export const alt = `${siteConfig.name} — AP Government Administrative Knowledge Platform`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(165deg, #0a1628 0%, #1b2a4a 45%, #0f1f38 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "rgba(212, 160, 23, 0.15)",
              border: "2px solid #d4a017",
              color: "#d4a017",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            OM
          </div>
          <span style={{ color: "#ffffff", fontSize: 36, fontWeight: 700 }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
          <p style={{ margin: 0, color: "#ffffff", fontSize: 52, fontWeight: 800, lineHeight: 1.15 }}>
            One Stop for AP Ministerial Staff
          </p>
          <p style={{ margin: 0, color: "#a8b8d4", fontSize: 28, lineHeight: 1.4 }}>
            Knowledge · Procedures · Tools · Expert Guidance
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#d4a017", fontSize: 24, fontWeight: 600 }}>
            {siteConfig.domain}
          </span>
          <span style={{ color: "#6b7280", fontSize: 20 }}>
            Andhra Pradesh Government
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
