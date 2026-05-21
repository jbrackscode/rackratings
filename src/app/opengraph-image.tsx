import { ImageResponse } from "next/og"

export const alt = "RackRatings – Australia's #1 Vehicle Rack Comparison & Rating Site"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d2340",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bar */}
        <div style={{ width: 60, height: 6, background: "#3b82f6", borderRadius: 3, marginBottom: 40 }} />

        <div style={{ fontSize: 72, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 20 }}>
          RackRatings
        </div>
        <div style={{ fontSize: 30, color: "#93c5fd", fontWeight: 500, lineHeight: 1.4, maxWidth: 700 }}>
          Australia&apos;s #1 Vehicle Rack<br />Comparison &amp; Rating Site
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 18,
            color: "#4b6a8a",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          rackratings.com.au
        </div>
      </div>
    ),
    { ...size }
  )
}
