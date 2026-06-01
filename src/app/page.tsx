import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Zap, Users, ChevronRight } from "lucide-react"
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
      {/* ── Homepage masthead ── */}
      <section className="relative bg-[#0d2340] overflow-hidden">
        {/* Hero photo – right half */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1698534379981-363e66747a34?auto=format&fit=crop&w=1200&q=80"
            alt="Truck with bike rack"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          {/* Fade from navy on the left edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340] via-[#0d2340]/60 to-transparent" />
        </div>
        {/* Subtle base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2340] via-[#112d52]/80 to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-white/90">Trusted by 250,000+ Australians</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              Helping Australians<br />
              <span className="text-blue-300">find better rack deals</span>
            </h1>

            <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">
              We compare hundreds of car racks, bike racks, and outdoor racks — expert-rated for Australian conditions and priced in AUD.
            </p>

            {/* Category quick-links */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-4 py-2 text-sm font-medium text-white transition-all"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                </Link>
              ))}
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-all"
              >
                All categories <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Photo credit */}
        <div className="absolute bottom-2 right-3 hidden lg:block">
          <a
            href="https://unsplash.com/@grahammansfield1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white/20 hover:text-white/40 transition-colors"
          >
            Photo: G. Mansfield / Unsplash
          </a>
        </div>

        {/* Trust / stats bar */}
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Independent ratings</span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="text-sm text-white/60"><span className="font-semibold text-white">500+</span> products rated</div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="text-sm text-white/60"><span className="font-semibold text-white">9</span> rack categories</div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="text-sm text-white/60"><span className="font-semibold text-white">AUD</span> prices only</div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <Link href="/compare" className="ml-auto text-sm font-semibold text-blue-300 hover:text-blue-200 flex items-center gap-1 transition-colors">
                Compare products <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
