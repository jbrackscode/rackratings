import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata({
  title: "All Product Categories",
  description:
    "Browse all product categories on RackRatings. Expert ratings and comparisons across electronics, home appliances, fitness equipment, outdoor gear, automotive, and more in Australia.",
  path: "/categories",
})

export default function CategoriesPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Categories</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h1>
        <p className="text-gray-500 mb-10">
          Explore expert ratings and in-depth comparisons across {categories.length} product categories, all priced in AUD.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`}>
              <Card className="hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer h-full group">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h2 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">{cat.productCount} products</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
