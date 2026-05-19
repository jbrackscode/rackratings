import Link from "next/link"
import { ComparisonTable } from "@/components/ratings/comparison-table"
import { RatingCard } from "@/components/ratings/rating-card"
import { products, categories } from "@/lib/data"
import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata({
  title: "Compare Products Side by Side",
  description:
    "Compare Australian products side by side with full specs, ratings, and prices. Find which product is right for you with RackRatings' comparison tool.",
  path: "/compare",
})

export default function ComparePage() {
  const sampleProducts = products.filter((p) => p.categorySlug === "headphones")

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Compare</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Comparison Tool</h1>
      <p className="text-gray-500 mb-10">
        Compare any two or three products side by side to find the best option for your budget and needs.
      </p>

      {/* Comparison links by category */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/compare/${cat.slug}`}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 group"
          >
            <span>{cat.icon}</span>
            <span className="group-hover:text-blue-700">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Featured comparison */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Featured Comparison</h2>
        <ComparisonTable products={sampleProducts} />
      </div>

      {/* Popular comparisons */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Comparisons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([] as { title: string; href: string }[]).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <span className="text-blue-600 font-medium text-sm group-hover:underline">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
