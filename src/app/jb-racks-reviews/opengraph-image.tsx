import { ImageResponse } from "next/og"

export const alt = `JB Racks Reviews ${new Date().getFullYear()} – 4.9/5 from Australian Owners | RackRatings`
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
        <div style={{ fontSize: 16, color: "#3b82f6", fontWeight: 700, letterSpacing: "0.15em", marginBottom: 20, display: "flex" }}>
          RACKRATINGS INDEPENDENT REVIEW
        </div>

        <div style={{ width: 60, height: 6, background: "#3b82f6", borderRadius: 3, marginBottom: 32, display: "flex" }} />

        <div style={{ fontSize: 62, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, marginBottom: 20, display: "flex" }}>
          JB Racks Reviews {new Date().getFullYear()}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[1,2,3,4,5].map((i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 4, background: "#f59e0b", display: "flex" }} />
            ))}
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", display: "flex" }}>4.9 / 5</div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["15,000+ Australian owners", "4-year warranty", "Free AU shipping"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "#1e3a5f",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 16,
                color: "#93c5fd",
                fontWeight: 600,
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 20,
            color: "#4b6a8a",
            fontWeight: 700,
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
