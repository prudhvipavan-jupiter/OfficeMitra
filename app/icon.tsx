import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1628 0%, #1b2a4a 100%)",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: "#d4a017",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: -0.5,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          OM
        </span>
      </div>
    ),
    { ...size }
  );
}
