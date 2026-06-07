import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #0a1628 0%, #1b2a4a 50%, #0f1f38 100%)",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            color: "#d4a017",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          OM
        </span>
        <span
          style={{
            marginTop: 8,
            color: "#a8b8d4",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          OfficeMitra
        </span>
      </div>
    ),
    { ...size }
  );
}
