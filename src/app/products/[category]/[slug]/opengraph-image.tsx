import { ImageResponse } from "next/og"
import { getProductBySlug } from "@/lib/data"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  const name = product?.name ?? "Product Review"
  const brand = product?.brand ?? ""
  const rating = product?.rating ?? 0
  const price = product?.priceFormatted ?? ""

  const filledStars = Math.round(rating)
  const emptyStars = 5 - filledStars

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
        <div style={{ fontSize: 18, color: "#4b6a8a", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 20, display: "flex" }}>
          RACKRATINGS REVIEW
        </div>

        <div style={{ width: 60, height: 6, background: "#3b82f6", borderRadius: 3, marginBottom: 32, display: "flex" }} />

        <div style={{ fontSize: 56, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, maxWidth: 850, marginBottom: 16, display: "flex" }}>
          {name}
        </div>

        {brand ? (
          <div style={{ fontSize: 28, color: "#93c5fd", fontWeight: 600, marginBottom: 32, display: "flex" }}>
            {brand}
          </div>
        ) : (
          <div style={{ marginBottom: 32, display: "flex" }} />
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: filledStars }).map((_, i) => (
                <div key={i} style={{ fontSize: 32, color: "#f59e0b", display: "flex" }}>★</div>
              ))}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <div key={i} style={{ fontSize: 32, color: "#334d6b", display: "flex" }}>★</div>
              ))}
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#ffffff", display: "flex" }}>
              {rating}/5
            </div>
          </div>
          {price ? (
            <div
              style={{
                background: "#1e3a5f",
                borderRadius: 12,
                padding: "10px 24px",
                fontSize: 26,
                color: "#ffffff",
                fontWeight: 800,
                display: "flex",
              }}
            >
              {price}
            </div>
          ) : null}
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
