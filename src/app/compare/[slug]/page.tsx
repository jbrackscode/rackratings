import { notFound } from "next/navigation"
import Link from "next/link"
import { ComparisonTable } from "@/components/ratings/comparison-table"
import { RatingCard } from "@/components/ratings/rating-card"
import { PageMasthead } from "@/components/layout/page-masthead"
import { products, getCategoryBySlug, categories } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo"
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

  const itemListLd = itemListJsonLd({
    name: `Compare ${cat.name} – Side-by-Side Ratings & Specs`,
    description: `Side-by-side specs, ratings, and prices for the best ${cat.name.toLowerCase()} in Australia.`,
    path: `/compare/${slug}`,
    items: categoryProducts,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <PageMasthead
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: cat.name },
        ]}
        icon={cat.icon}
        heading={`Compare ${cat.name} in Australia ${new Date().getFullYear()}`}
        description={`Side-by-side specs, ratings, and prices for the best ${cat.name.toLowerCase()} available in Australia.`}
        updatedAt={categoryProducts[0]?.updatedAt}
        productCount={categoryProducts.length}
        topProduct={
          categoryProducts[0]
            ? {
                name: categoryProducts[0].name,
                rating: categoryProducts[0].rating,
                href: `/products/${categoryProducts[0].categorySlug}/${categoryProducts[0].slug}`,
              }
            : undefined
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

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
