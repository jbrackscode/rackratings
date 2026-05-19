import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { brands, getProductsByBrand, getReviewsByBrand } from "@/lib/data"
import { buildMetadata } from "@/lib/seo"
import { StarRating } from "@/components/ui/star-rating"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata({
  title: "Brand Reviews – Rack Ratings by Manufacturer",
  description:
    "Read verified Australian reviews for every rack brand rated on RackRatings. Compare JB Racks, Thule, Rhino-Rack, Yakima, and more.",
  path: "/brands",
})

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Brand Reviews</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Reviews</h1>
      <p className="text-gray-500 mb-10">
        Verified ratings and real owner reviews for every brand stocked by Australian retailers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {brands.map((brand) => {
          const brandProducts = getProductsByBrand(brand.name)
          const brandReviews = getReviewsByBrand(brand.name)
          const avgRating =
            brandReviews.length > 0
              ? Math.round((brandReviews.reduce((s, r) => s + r.rating, 0) / brandReviews.length) * 10) / 10
              : null

          return (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">{brand.country}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
              </div>

              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{brand.description}</p>

              <div className="flex items-center gap-4 text-sm">
                {avgRating !== null ? (
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={avgRating} size="sm" showValue />
                    <span className="text-gray-400">({brandReviews.length})</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">No reviews yet</span>
                )}
                <span className="text-gray-300">·</span>
                <span className="text-gray-500">{brandProducts.length} products</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
