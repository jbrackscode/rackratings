import { notFound } from "next/navigation"
import Link from "next/link"
import { ComparisonTable } from "@/components/ratings/comparison-table"
import { RatingCard } from "@/components/ratings/rating-card"
import { products, getCategoryBySlug, categories } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) return {}

  return buildMetadata({
    title: `Compare ${cat.name} – Side-by-Side Ratings & Specs`,
    description: `Compare the best ${cat.name.toLowerCase()} available in Australia. Side-by-side specs, ratings, pros, cons, and prices in AUD.`,
    path: `/compare/${slug}`,
  })
}

export default async function CompareByCategory({ params }: Props) {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) notFound()

  const categoryProducts = products.filter((p) => p.categorySlug === slug)

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: cat.name, href: `/compare/${slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/compare" className="hover:text-gray-700">Compare</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{cat.name}</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Compare {cat.name} in Australia {new Date().getFullYear()}
        </h1>
        <p className="text-gray-500 mb-8">
          Side-by-side specs, ratings, and prices for the best {cat.name.toLowerCase()} available in Australia.
        </p>

        {categoryProducts.length >= 2 ? (
          <>
            <div className="mb-10">
              <ComparisonTable products={categoryProducts.slice(0, 3)} />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">All {cat.name} Rated</h2>
            <div className="flex flex-col gap-4">
              {categoryProducts.map((product, i) => (
                <RatingCard key={product.slug} product={product} rank={i + 1} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p>Not enough products to compare in this category yet.</p>
            <Link href="/compare" className="text-blue-600 hover:underline text-sm mt-2 block">
              Browse other categories
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
