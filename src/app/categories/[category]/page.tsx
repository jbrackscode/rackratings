import { notFound } from "next/navigation"
import Link from "next/link"
import { RatingCard } from "@/components/ratings/rating-card"
import { AdvertorialCard } from "@/components/advertorial/advertorial-card"
import { PageMasthead } from "@/components/layout/page-masthead"
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

      <PageMasthead
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: cat.name },
        ]}
        icon={cat.icon}
        heading={`Best ${cat.name} in Australia ${new Date().getFullYear()}`}
        description={cat.description}
        updatedAt={products[0]?.updatedAt}
        productCount={products.length}
        topProduct={
          products[0]
            ? {
                name: products[0].name,
                rating: products[0].rating,
                href: `/products/${products[0].categorySlug}/${products[0].slug}`,
              }
            : undefined
        }
      />

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
