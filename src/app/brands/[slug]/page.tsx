import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink, CheckCircle, Globe, Star } from "lucide-react"
import { StarRating } from "@/components/ui/star-rating"
import { Badge } from "@/components/ui/badge"
import { PageMasthead } from "@/components/layout/page-masthead"
import { TrackedCta } from "@/components/tracking/tracked-cta"
import { brands, getBrandBySlug, getProductsByBrand, getReviewsByBrand } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { goUrl } from "@/lib/affiliate"
import type { Metadata } from "next"
import type { Review, Product, Brand } from "@/types"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) return {}

  const brandReviews = getReviewsByBrand(brand.name)
  const avgRating =
    brandReviews.length > 0
      ? Math.round((brandReviews.reduce((s, r) => s + r.rating, 0) / brandReviews.length) * 10) / 10
      : null

  return buildMetadata({
    title: `${brand.name} Reviews ${new Date().getFullYear()} – ${avgRating ? `${avgRating}/5` : "Ratings"} from ${brandReviews.length} Australian Owners`,
    description: `${brandReviews.length} verified Australian reviews of ${brand.name} racks. Average ${avgRating ?? "n/a"}/5. Read real owner feedback on ${brand.categories.join(", ").toLowerCase()} – rated and compared on RackRatings.`,
    path: `/brands/${slug}`,
  })
}

function brandReviewsJsonLd(brand: Brand, reviews: Review[], products: Product[], avgRating: number | null) {
  const productsBySlug = Object.fromEntries(products.map((p) => [p.slug, p]))

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.website,
    description: brand.description,
    ...(avgRating !== null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: reviews.length,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.body,
      name: r.title,
      datePublished: r.date,
      ...(productsBySlug[r.productSlug] && {
        itemReviewed: {
          "@type": "Product",
          name: productsBySlug[r.productSlug].name,
        },
      }),
    })),
  }
}

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-amber-400"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  )
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) notFound()

  const brandProducts = getProductsByBrand(brand.name)
  const brandReviews = getReviewsByBrand(brand.name)
  const sortedProducts = [...brandProducts].sort((a, b) => b.rating - a.rating)

  const avgRating =
    brandReviews.length > 0
      ? Math.round((brandReviews.reduce((sum, r) => sum + r.rating, 0) / brandReviews.length) * 10) / 10
      : null

  const topProduct = sortedProducts[0]

  // Rating distribution (how many reviews per star level)
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: brandReviews.filter((r) => r.rating === star).length,
  }))

  const reviewJsonLd = brandReviewsJsonLd(brand, brandReviews, brandProducts, avgRating)
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Brand Reviews", href: "/brands" },
    { name: brand.name, href: `/brands/${slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageMasthead
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brand Reviews", href: "/brands" },
          { label: brand.name },
        ]}
        heading={`${brand.name} Reviews`}
        description={brand.description}
        updatedAt={brandProducts[0]?.updatedAt}
        productCount={brandProducts.length}
        topProduct={
          topProduct
            ? {
                name: topProduct.name,
                rating: topProduct.rating,
                href: `/products/${topProduct.categorySlug}/${topProduct.slug}`,
              }
            : undefined
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Main column: reviews first ── */}
          <div className="flex-1 min-w-0">

            {/* Aggregate rating hero */}
            {avgRating !== null && (
              <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-200 mb-8">
                {/* Score */}
                <div className="flex flex-col items-center sm:items-start sm:border-r sm:border-gray-200 sm:pr-6">
                  <div className="text-6xl font-black text-gray-900 leading-none">{avgRating}</div>
                  <StarRating rating={avgRating} size="md" className="mt-2" />
                  <div className="text-sm text-gray-500 mt-1">{brandReviews.length} verified reviews</div>
                </div>

                {/* Distribution bars */}
                <div className="flex-1 flex flex-col gap-1.5 justify-center">
                  {distribution.map(({ star, count }) => (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-3 text-right text-gray-500 text-xs font-medium">{star}</span>
                      <Star className="h-3 w-3 text-amber-400 flex-shrink-0" fill="currentColor" />
                      <div className="flex-1">
                        <RatingBar value={count} max={Math.max(...distribution.map((d) => d.count), 1)} />
                      </div>
                      <span className="w-5 text-xs text-gray-400">{count}</span>
                    </div>
                  ))}
                </div>

                {/* Brand CTA */}
                <div className="flex flex-col justify-center gap-2 sm:pl-2">
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Visit {brand.name} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {topProduct?.affiliateUrl && (
                    <TrackedCta
                      href={goUrl(topProduct.affiliateUrl, { product: topProduct.slug, category: topProduct.categorySlug, source: "brand-page" })}
                      label="Go to site"
                      product={topProduct}
                      placement="brand-page"
                      size="sm"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Editorial intro — rack-specific copy for SEO */}
            <div className="prose prose-sm prose-gray max-w-none mb-8 p-5 rounded-xl border border-gray-100 bg-white">
              <h2 className="text-base font-bold text-gray-900 mt-0">
                Are {brand.name} racks worth it for Australian buyers?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                RackRatings has independently rated every {brand.name} rack sold in Australia, covering
                {" "}{brand.categories.map((c) => c.toLowerCase()).join(", ")}. Below you'll find{" "}
                {brandReviews.length} verified reviews from Australian rack owners, plus our editorial
                assessment of each model. All prices are in AUD and reflect current Australian retail.
              </p>
            </div>

            {/* Reviews */}
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Customer Reviews
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Verified reviews from Australian {brand.name} rack owners
            </p>

            {brandReviews.length > 0 ? (
              <div className="flex flex-col gap-4">
                {brandReviews.map((review) => {
                  const product = brandProducts.find((p) => p.slug === review.productSlug)
                  return (
                    <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm leading-tight">{review.author}</div>
                            {product && (
                              <Link
                                href={`/products/${product.categorySlug}/${product.slug}`}
                                className="text-xs text-blue-600 hover:underline leading-tight"
                              >
                                {product.name}
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <StarRating rating={review.rating} size="sm" />
                          {review.verified && (
                            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{review.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(review.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm py-8 text-center rounded-xl border border-gray-200">
                No reviews yet for this brand.
              </p>
            )}

            {/* Products — secondary, below reviews */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {brand.name} Racks – Rated & Compared
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Every {brand.name} rack independently rated by RackRatings for Australian conditions
              </p>
              <div className="flex flex-col gap-3">
                {sortedProducts.map((product, i) => (
                  <div key={product.slug} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${product.categorySlug}/${product.slug}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm leading-tight"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={product.rating} size="sm" showValue />
                        <span className="text-xs text-gray-400">{product.category}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-gray-900 text-sm">{product.priceFormatted}</div>
                      {product.badge && (
                        <Badge variant="editors" className="text-xs mt-0.5">{product.badge}</Badge>
                      )}
                    </div>
                    {product.affiliateUrl && (
                      <TrackedCta
                        href={goUrl(product.affiliateUrl, { product: product.slug, category: product.categorySlug, source: "brand-products" })}
                        label="Go to site"
                        product={product}
                        placement="brand-products"
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0 h-8 text-xs px-3"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <div className="sticky top-20 flex flex-col gap-4">
              {/* Brand info */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900 mb-3">About {brand.name}</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>{brand.country}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {brand.categories.map((cat) => (
                      <span key={cat} className="text-xs bg-gray-100 rounded-full px-2.5 py-0.5 text-gray-600">{cat}</span>
                    ))}
                  </div>
                  {avgRating !== null && (
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <span className="text-2xl font-black text-blue-600">{avgRating}</span>
                      <div>
                        <StarRating rating={avgRating} size="sm" />
                        <div className="text-xs text-gray-400 mt-0.5">{brandReviews.length} reviews</div>
                      </div>
                    </div>
                  )}
                </div>
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Visit {brand.name} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Top product CTA */}
              {topProduct && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="text-xs font-semibold text-blue-700 mb-1">Top Rated</div>
                  <Link
                    href={`/products/${topProduct.categorySlug}/${topProduct.slug}`}
                    className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight block mb-2"
                  >
                    {topProduct.name}
                  </Link>
                  <div className="text-lg font-bold text-gray-900 mb-3">{topProduct.priceFormatted}</div>
                  {topProduct.affiliateUrl && (
                    <TrackedCta
                      href={goUrl(topProduct.affiliateUrl, { product: topProduct.slug, category: topProduct.categorySlug, source: "brand-sidebar" })}
                      label="Go to site"
                      product={topProduct}
                      placement="brand-sidebar"
                      size="sm"
                      className="w-full"
                    />
                  )}
                </div>
              )}

              {/* Other brands */}
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Compare Brands</h3>
                <div className="flex flex-col gap-1">
                  {brands
                    .filter((b) => b.slug !== slug)
                    .map((b) => (
                      <Link
                        key={b.slug}
                        href={`/brands/${b.slug}`}
                        className="rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        {b.name}
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
