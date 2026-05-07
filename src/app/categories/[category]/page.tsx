import { notFound } from "next/navigation"
import Link from "next/link"
import { RatingCard } from "@/components/ratings/rating-card"
import { AdvertorialCard } from "@/components/advertorial/advertorial-card"
import { categories, getProductsByCategory, getCategoryBySlug, advertorials } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return {}

  return buildMetadata({
    title: `Best ${cat.name} in Australia ${new Date().getFullYear()} – Ratings & Reviews`,
    description: `Compare and rate the best ${cat.name.toLowerCase()} available in Australia. Expert reviews, real user ratings, and side-by-side comparisons in AUD.`,
    path: `/categories/${cat.slug}`,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()

  const products = getProductsByCategory(category)
  const categoryAds = advertorials.filter(
    (ad) => ad.category.toLowerCase() === cat.name.toLowerCase()
  )

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: cat.name, href: `/categories/${cat.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-gray-700">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{cat.name}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Best {cat.name} in Australia {new Date().getFullYear()}
              </h1>
              <p className="text-gray-500 mt-1">{cat.description}</p>
              <p className="text-sm text-gray-400 mt-1">{products.length} products rated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main product list */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="flex flex-col gap-4">
                {products.map((product, i) => (
                  <RatingCard key={product.slug} product={product} rank={i + 1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">No products in this category yet.</p>
                <p className="text-sm mt-2">Check back soon – we&apos;re adding reviews regularly.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="flex flex-col gap-4 sticky top-20">
              {/* Compare CTA */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-1">Compare {cat.name}</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Select any two {cat.name.toLowerCase()} for a side-by-side spec comparison.
                </p>
                <Link
                  href={`/compare?category=${cat.slug}`}
                  className="block w-full text-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Start Comparing
                </Link>
              </div>

              {/* Advertorial cards */}
              {categoryAds.map((ad) => (
                <AdvertorialCard key={ad.slug} advertorial={ad} />
              ))}

              {/* All categories */}
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Other Categories</h3>
                <div className="flex flex-col gap-1">
                  {categories
                    .filter((c) => c.slug !== category)
                    .slice(0, 6)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/categories/${c.slug}`}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
