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
          position: "relative",
        }}
      >
        <div style={{ width: 60, height: 6, background: "#3b82f6", borderRadius: 3, marginBottom: 40, display: "flex" }} />

        <div style={{ fontSize: 72, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 20, display: "flex" }}>
          RackRatings
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#93c5fd", fontWeight: 500 }}>
            Australia&apos;s #1 Vehicle Rack
          </div>
          <div style={{ fontSize: 30, color: "#93c5fd", fontWeight: 500 }}>
            Comparison &amp; Rating Site
          </div>
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
            display: "flex",
          }}
        >
          rackratings.com.au
        </div>
      </div>
    ),
    { ...size }
  )
}
