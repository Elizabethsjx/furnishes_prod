import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#FAF0E3",
        color: "#3B2A1A",
        fontSize: 72,
        fontWeight: 600,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "6px solid #F2AE7E",
          paddingLeft: 36,
        }}
      >
        <div>furnishes.</div>
        <div style={{ fontSize: 32, marginTop: 24, fontWeight: 400 }}>
          Space design, furniture and 3D.
        </div>
      </div>
    </div>,
    size,
  );
}
