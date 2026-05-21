import { ImageResponse } from "next/og"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  const productCount = cat ? getProductsByCategory(category).length : 0
  const heading = cat ? `Best ${cat.name} in Australia ${new Date().getFullYear()}` : "RackRatings"
  const icon = cat?.icon ?? "🏷️"

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
        <div style={{ fontSize: 56, marginBottom: 24 }}>{icon}</div>

        <div style={{ width: 60, height: 6, background: "#3b82f6", borderRadius: 3, marginBottom: 32 }} />

        <div style={{ fontSize: 54, fontWeight: 900, color: "#ffffff", lineHeight: 1.15, maxWidth: 900, marginBottom: 24 }}>
          {heading}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              background: "#1e3a5f",
              borderRadius: 12,
              padding: "10px 24px",
              fontSize: 22,
              color: "#93c5fd",
              fontWeight: 600,
            }}
          >
            {productCount} products rated
          </div>
          <div style={{ fontSize: 22, color: "#4b6a8a", fontWeight: 600 }}>Prices in AUD</div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 20,
            color: "#4b6a8a",
            fontWeight: 700,
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
