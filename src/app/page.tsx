import Link from "next/link"
import { ArrowRight, Star, ShieldCheck, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RatingCard } from "@/components/ratings/rating-card"
import { AdvertorialCard } from "@/components/advertorial/advertorial-card"
import { StarRating } from "@/components/ui/star-rating"
import { categories, getTopRatedProducts, advertorials, getFeaturedProducts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RackRatings – Australia's #1 Rack Ratings & Comparison Site",
  description:
    "Find the best-rated car racks, bike racks, and outdoor racks in Australia. Expert reviews, side-by-side comparisons, and real user ratings in AUD.",
}

export default function HomePage() {
  const topRated = getTopRatedProducts(6)
  const featured = getFeaturedProducts()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 mb-6">
            <Star className="h-4 w-4 text-amber-400" fill="currentColor" />
            <span className="text-sm font-semibold text-blue-800">Trusted by 250,000+ Australians</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Australia&apos;s #1
            <span className="text-blue-600"> Rack Ratings </span>
            &amp; Comparison Site
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expert reviews and side-by-side comparisons of car racks, bike racks, and outdoor racks – all rated for Australian conditions and priced in AUD.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button size="xl" asChild>
              <Link href="/categories">
                Browse All Categories <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/compare">Compare Products</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-xs text-gray-500 mt-0.5">Products Rated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">50k+</div>
              <div className="text-xs text-gray-500 mt-0.5">User Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-xs text-gray-500 mt-0.5">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Browse by Rack Type</h2>
            <p className="text-gray-500 mt-1">Expert ratings across every rack category</p>
          </div>
          <Link
            href="/categories"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            All categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`}>
              <Card className="hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer h-full">
                <CardContent className="p-5">
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{cat.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{cat.productCount} products rated</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Rated Racks in Australia</h2>
              <p className="text-gray-500 mt-1">The highest-rated car, bike, and outdoor racks across all categories</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {topRated.map((product, i) => (
              <RatingCard key={product.slug} product={product} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Editor's Choice */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Editor&apos;s Choice Awards</h2>
        <p className="text-gray-500 mb-8">Standout products that earn our highest recommendation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <Link key={product.slug} href={`/products/${product.categorySlug}/${product.slug}`}>
              <Card className="hover:shadow-lg transition-all duration-200 h-full cursor-pointer group">
                <CardContent className="p-5">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg flex items-center justify-center text-4xl mb-4 group-hover:from-blue-100 transition-colors">
                    📦
                  </div>
                  <div className="text-xs font-semibold text-blue-600 mb-1">{product.badge}</div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{product.brand}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <StarRating rating={product.rating} size="sm" showValue />
                  </div>
                  <div className="mt-2 font-bold text-gray-900">{product.priceFormatted}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Advertorial row */}
      {advertorials.length > 0 && (
        <section className="bg-amber-50/50 border-y border-amber-100 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-300 rounded-full px-3 py-0.5">
                Sponsored
              </span>
              <span className="text-sm text-gray-500">Partner content from trusted brands</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advertorials.map((ad) => (
                <AdvertorialCard key={ad.slug} advertorial={ad} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Trust Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Why Australians Trust RackRatings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
              title: "Independent Ratings",
              desc: "Our editorial team rates every rack independently. Advertiser relationships never influence our scores.",
            },
            {
              icon: <Zap className="h-8 w-8 text-amber-500" />,
              title: "Australian Prices",
              desc: "All prices are in AUD and sourced from Australian retailers. No US conversions or surprise import costs.",
            },
            {
              icon: <Users className="h-8 w-8 text-green-600" />,
              title: "Real Owner Reviews",
              desc: "Verified Australian rack owners share their genuine experiences alongside our expert analysis.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
