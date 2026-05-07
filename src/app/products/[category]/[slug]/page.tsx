import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink, CheckCircle, XCircle, Calendar, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComparisonTable } from "@/components/ratings/comparison-table"
import { AdvertorialCard } from "@/components/advertorial/advertorial-card"
import { products, getProductBySlug, getProductsByCategory, getReviewsByProduct, advertorials } from "@/lib/data"
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo"
import { formatReviewCount } from "@/lib/utils"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ category: p.categorySlug, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  return buildMetadata({
    title: `${product.name} Review & Rating ${new Date().getFullYear()} – Is It Worth It?`,
    description: `${product.name} review for Australian buyers. Rated ${product.rating}/5 from ${formatReviewCount(product.reviewCount)} reviews. Pros, cons, full specs, and best price in AUD.`,
    path: `/products/${product.categorySlug}/${product.slug}`,
  })
}

export default async function ProductPage({ params }: Props) {
  const { slug, category } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const reviews = getReviewsByProduct(slug)
  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  const categoryAds = advertorials.filter(
    (ad) => ad.category.toLowerCase() === product.category.toLowerCase()
  )

  const productLd = productJsonLd(product)
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: product.category, href: `/categories/${product.categorySlug}` },
    { name: product.name, href: `/products/${product.categorySlug}/${product.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-gray-700">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.badge && <Badge variant="editors">{product.badge}</Badge>}
              {product.isSponsored && <Badge variant="sponsored">Sponsored</Badge>}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.brand} · {product.category}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size="lg" showValue />
                <span className="text-gray-500 text-sm">({formatReviewCount(product.reviewCount)} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                Published {new Date(product.publishedAt).toLocaleDateString("en-AU", { year: "numeric", month: "long" })}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <RefreshCw className="h-3.5 w-3.5" />
                Updated {new Date(product.updatedAt).toLocaleDateString("en-AU", { year: "numeric", month: "long" })}
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="mt-6 w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-7xl">
              📦
            </div>

            {/* Price + CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-4 p-5 rounded-xl bg-gray-50 border border-gray-200">
              <div>
                <div className="text-3xl font-bold text-gray-900">{product.priceFormatted}</div>
                <div className="text-xs text-gray-400 mt-0.5">Approximate price in AUD</div>
              </div>
              {product.affiliateUrl && (
                <Button variant="cta" size="lg" asChild>
                  <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer">
                    Check Best Price <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>

            {/* Pros & Cons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" /> Pros
                </h2>
                <ul className="space-y-2">
                  {product.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-400" /> Cons
                </h2>
                <ul className="space-y-2">
                  {product.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-gray-600">
                      <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tabs: Specs / Reviews / Compare */}
            <Tabs defaultValue="specs" className="mt-10">
              <TabsList>
                <TabsTrigger value="specs">Full Specs</TabsTrigger>
                <TabsTrigger value="reviews">User Reviews ({reviews.length})</TabsTrigger>
                {relatedProducts.length > 0 && (
                  <TabsTrigger value="compare">Compare</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="specs" className="mt-4">
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 font-medium text-gray-600 w-40">{key}</td>
                          <td className="px-4 py-3 text-gray-900">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                {reviews.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-gray-900 text-sm">{review.author}</div>
                          <div className="flex items-center gap-2">
                            {review.verified && (
                              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <CheckCircle className="h-3.5 w-3.5" /> Verified
                              </span>
                            )}
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                        </div>
                        <p className="font-medium text-gray-800 text-sm">{review.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{review.body}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(review.date).toLocaleDateString("en-AU")}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm py-8 text-center">No reviews yet.</p>
                )}
              </TabsContent>

              {relatedProducts.length > 0 && (
                <TabsContent value="compare" className="mt-4">
                  <ComparisonTable products={[product, ...relatedProducts.slice(0, 2)]} />
                </TabsContent>
              )}
            </Tabs>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="flex flex-col gap-4 sticky top-20">
              {/* Quick score card */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900 mb-3">RackRatings Score</h3>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl font-black text-blue-600">{product.rating}</div>
                  <div>
                    <StarRating rating={product.rating} size="md" />
                    <div className="text-xs text-gray-400 mt-0.5">out of 5.0</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{formatReviewCount(product.reviewCount)} user reviews</div>
                {product.affiliateUrl && (
                  <Button variant="cta" size="default" asChild className="w-full mt-4">
                    <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer">
                      Best Price <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>

              {/* Advertorial cards */}
              {categoryAds.slice(0, 1).map((ad) => (
                <AdvertorialCard key={ad.slug} advertorial={ad} />
              ))}

              {/* Related products */}
              {relatedProducts.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Also Consider</h3>
                  <div className="flex flex-col gap-3">
                    {relatedProducts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/products/${rp.categorySlug}/${rp.slug}`}
                        className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                          📦
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{rp.name}</p>
                          <StarRating rating={rp.rating} size="sm" showValue />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
