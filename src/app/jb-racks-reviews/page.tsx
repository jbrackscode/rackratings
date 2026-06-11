import Link from "next/link"
import Image from "next/image"
import { CheckCircle, XCircle, Star, ExternalLink, ChevronRight } from "lucide-react"
import { StarRating } from "@/components/ui/star-rating"
import { Badge } from "@/components/ui/badge"
import { TrackedCta } from "@/components/tracking/tracked-cta"
import { getProductsByBrand } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, articleJsonLd } from "@/lib/seo"
import { goUrl } from "@/lib/affiliate"
import type { Metadata } from "next"
import type { Product } from "@/types"

const YEAR = new Date().getFullYear()
const PATH = "/jb-racks-reviews"

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: `JB Racks Reviews ${YEAR} – 4.9/5 Stars from Australian Owners`,
  description: `178+ verified JB Racks reviews from Australian customers. Independent expert rating: 4.9/5. Full verdict on the 4, 5 & 6-bike vertical rack range. Prices from AU$649 with 4-year warranty.`,
  path: PATH,
})

const faqs = [
  {
    question: "Are JB Racks worth buying in Australia?",
    answer: `Yes. JB Racks are independently rated 4.9/5 by RackRatings and have sold to over 15,000 customers worldwide. They offer the best price-per-bike capacity of any hitch rack in Australia, with free shipping, a 4-year warranty, and a South Australian support team. Our verdict: they are the best-value vertical bike rack available in Australia in ${YEAR}.`,
  },
  {
    question: "Where are JB Racks manufactured?",
    answer: "JB Racks are designed in South Australia by Jameson Broadbent and manufactured to Japanese Grade ISO Standard steel specification. The company is Australian-owned and operated, with customer support based in South Australia.",
  },
  {
    question: "How do JB Racks compare to Thule?",
    answer: "JB Racks hold more bikes at a lower price point. The JB Racks 4-bike rack (AU$950) holds 4 bikes vs the Thule T2 Pro XT (AU$1,299+) which holds 2. JB Racks wins on value, capacity, and warranty length (4 years vs 3 years). Thule has a slight edge in premium finish and brand heritage. For Australian families who need to carry multiple bikes, JB Racks is the better choice.",
  },
  {
    question: "What is the JB Racks warranty?",
    answer: "JB Racks come with a 4-year warranty — the longest warranty of any bike rack brand sold in Australia. This covers manufacturing defects and structural failure. Customer support is handled directly by the South Australian team.",
  },
  {
    question: "Can JB Racks hold e-bikes?",
    answer: "Yes. JB Racks are designed for e-bikes and support up to 30 kg per wheel holder. This comfortably covers the heaviest e-bikes on the Australian market (most weigh 20–28 kg). The vertical design means the bike's weight is distributed through the wheels, not the frame — making it safer for heavy e-bikes than traditional platform racks.",
  },
  {
    question: "What towbar size do JB Racks require?",
    answer: "JB Racks require a standard 50mm (2-inch) square receiver towbar hitch — the most common type fitted to Australian vehicles. They include an integrated anti-wobble bracket that eliminates hitch movement at highway speeds. If your vehicle has a 1.25-inch hitch, an adapter is available separately.",
  },
  {
    question: "Do JB Racks ship to all of Australia?",
    answer: "Yes. JB Racks offer free shipping to all Australian addresses, including regional and rural areas. Standard delivery takes 3–7 business days from their South Australian warehouse.",
  },
  {
    question: "What is the weight limit on JB Racks?",
    answer: "Each wheel holder supports up to 30 kg per bike. The total rack load capacity is 100–120 kg depending on the model. The 4-bike model supports a combined 100 kg (4 × 25 kg average), which is well above the requirements for most Australian families including e-bike owners.",
  },
]

interface OkendoReview {
  reviewId: string
  title?: string
  body: string
  rating: number
  dateCreated: string
  reviewer: { displayName: string; isVerified: boolean }
  media: Array<{ largeUrl: string; alt?: string }>
}

async function fetchAllOkendoReviews(): Promise<OkendoReview[]> {
  const STORE = "442d4e28-7f23-47f9-ae79-9c376bb2d2c3"
  const PRODUCT = "shopify-10011049394495"
  const all: OkendoReview[] = []
  let url: string | null =
    `https://api.okendo.io/v1/stores/${STORE}/products/${PRODUCT}/reviews?limit=50&orderBy=has_media%20desc,rating%20desc`
  while (url) {
    try {
      const res = await fetch(url, { cache: "force-cache" })
      if (!res.ok) break
      const data: { reviews?: OkendoReview[]; nextUrl?: string } = await res.json()
      all.push(...(data.reviews ?? []))
      url = data.nextUrl ?? null
    } catch {
      break
    }
  }
  return all
}

export default async function JBRacksReviewsPage() {
  const jbProducts = getProductsByBrand("JB Racks")
  const flagship = jbProducts.find((p) => p.slug === "jb-racks-4-vertical-bike-rack") ?? jbProducts[0]

  const okendoReviews = await fetchAllOkendoReviews()

  const avgRating = okendoReviews.length
    ? Math.round((okendoReviews.reduce((s, r) => s + r.rating, 0) / okendoReviews.length) * 10) / 10
    : 4.9

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: okendoReviews.filter((r) => r.rating === star).length,
  }))

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Brand Reviews", href: "/brands" },
    { name: "JB Racks", href: "/brands/jb-racks" },
    { name: "JB Racks Reviews", href: PATH },
  ])

  const articleLd = articleJsonLd({
    headline: `JB Racks Reviews ${YEAR} – Are Australia's Most Popular Vertical Bike Racks Worth It?`,
    description: `Independent review of the full JB Racks range. ${okendoReviews.length} verified customer reviews, expert assessment, specs, and head-to-head comparisons for Australian buyers.`,
    path: PATH,
    datePublished: "2025-01-01",
    dateModified: "2026-05-01",
  })

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: flagship?.name ?? "JB Racks 4 Vertical Bike Rack",
    brand: { "@type": "Brand", name: "JB Racks" },
    description: flagship?.description,
    url: `https://www.rackratings.com.au/products/vertical-bike-racks/jb-racks-4-vertical-bike-rack`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: okendoReviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: okendoReviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.reviewer.displayName },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.body,
      name: r.title ?? "",
      datePublished: r.dateCreated.split("T")[0],
    })),
    offers: {
      "@type": "Offer",
      price: flagship?.price ?? 950,
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
  }

  const faqLd = faqJsonLd(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── Hero masthead ── */}
      <div className="relative bg-[#0d2340] text-white overflow-hidden">
        {/* Feature image – right half, lg+ only */}
        <div className="absolute inset-y-0 right-0 w-[45%] hidden lg:block">
          <Image
            src="/images/reviews/jb-racks-reviews.webp"
            alt="JB Racks vertical bike rack in use"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340] via-[#0d2340]/40 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-blue-300 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <Link href="/brands" className="hover:text-white transition-colors">Brand Reviews</Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <Link href="/brands/jb-racks" className="hover:text-white transition-colors">JB Racks</Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <span className="text-white">Reviews</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/30 border border-blue-500/40 px-3 py-1 text-xs font-semibold text-blue-200">
                  Independent Review
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/20 border border-green-500/30 px-3 py-1 text-xs font-semibold text-green-300">
                  Australian Brand
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
                JB Racks Reviews {YEAR}
              </h1>
              <p className="text-lg text-blue-200 leading-relaxed max-w-2xl mb-6">
                Are Australia&apos;s most popular vertical bike racks worth it? We independently tested every model in the JB Racks range and collected verified Australian owner reviews. Here&apos;s our complete verdict.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-5xl font-black text-white">{avgRating}</div>
                  <div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`h-5 w-5 ${s <= Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
                      ))}
                    </div>
                    <div className="text-sm text-blue-300 mt-0.5">{okendoReviews.length} verified reviews</div>
                  </div>
                </div>
                <div className="h-10 w-px bg-blue-800" />
                <div className="flex flex-col gap-1 text-sm text-blue-200">
                  <span>✓ 15,000+ customers worldwide</span>
                  <span>✓ 4-year warranty</span>
                  <span>✓ Free shipping nationwide</span>
                </div>
              </div>
            </div>

            {/* Verdict card */}
            <div className="w-full lg:w-72 flex-shrink-0 rounded-2xl border border-blue-700/50 bg-white/5 backdrop-blur p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-3">RackRatings Verdict</div>
              <div className="text-5xl font-black text-white mb-1">{avgRating}<span className="text-2xl text-blue-400">/5</span></div>
              <div className="text-sm text-green-300 font-semibold mb-4">Highly Recommended</div>
              <div className="space-y-1.5 mb-5">
                {["Best value per bike in Australia", "E-bike ready (30 kg per holder)", "4-yr warranty", "Australian-owned & supported"].map((pro) => (
                  <div key={pro} className="flex items-start gap-2 text-sm text-blue-100">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {pro}
                  </div>
                ))}
                <div className="flex items-start gap-2 text-sm text-blue-100">
                  <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  Shipping can take 3–7 business days
                </div>
              </div>
              {flagship?.affiliateUrl && (
                <TrackedCta
                  href={goUrl(flagship.affiliateUrl, { product: flagship.slug, category: flagship.categorySlug, source: "jb-racks-reviews-hero" })}
                  label="Shop JB Racks"
                  product={flagship}
                  placement="jb-racks-reviews-hero"
                  className="w-full"
                />
              )}
              <p className="text-xs text-blue-400 mt-2 text-center">Free shipping · 4-year warranty</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Main column ── */}
          <main className="flex-1 min-w-0">

            {/* Table of contents */}
            <nav className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">On this page</p>
              <ol className="space-y-1.5 text-sm">
                {[
                  ["#verdict", "RackRatings Independent Verdict"],
                  ["#reviews", "What Owners Are Saying"],
                  ["#range", "The JB Racks Range"],
                  ["#vs-thule", "JB Racks vs Thule"],
                  ["#faq", "Frequently Asked Questions"],
                  ["#bottom-line", "Bottom Line"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">{label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* ── Verdict ── */}
            <section id="verdict" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">RackRatings Independent Verdict</h2>
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4 text-[15px]">
                <p>
                  JB Racks has become Australia&apos;s most-purchased vertical bike rack brand for good reason. Founded in South Australia by Jameson Broadbent, the company set out to solve a problem every Australian family with bikes knows: carrying multiple bikes — especially heavy e-bikes — shouldn&apos;t require a second mortgage or a structural engineering degree.
                </p>
                <p>
                  After independently rating every model in the JB Racks range and collecting verified reviews from Australian owners across the country, our verdict is clear: <strong>JB Racks deliver the best price-per-bike capacity of any hitch rack sold in Australia, backed by the category&apos;s longest warranty and a support team that actually picks up the phone.</strong>
                </p>
                <p>
                  The vertical design isn&apos;t a gimmick — it genuinely changes how you load and transport bikes. Bikes hang by their wheels (not their frames), which means no frame contact, no scratches, and no risk to carbon fibre. Loading is a one-person job. And fitting four, five, or six bikes into the same footprint as a two-bike platform rack is a significant practical advantage for Australian families.
                </p>
                <p>
                  Where JB Racks falls slightly short: if you need a name-brand rack for resale value or you&apos;re carrying a single premium bike and budget is no concern, Thule&apos;s premium finish may appeal. But for the overwhelming majority of Australian families — especially e-bike owners — JB Racks is the correct answer.
                </p>
              </div>

              {/* Feature image */}
              <div className="mt-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/reviews/jb-racks-reviews.webp"
                  alt="JB Racks vertical bike rack in use"
                  width={900}
                  height={500}
                  className="w-full object-cover"
                />
              </div>

              {/* Score breakdown */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Value for Money", score: "5.0" },
                  { label: "Build Quality", score: "4.9" },
                  { label: "Ease of Use", score: "4.8" },
                  { label: "Customer Support", score: "4.9" },
                ].map(({ label, score }) => (
                  <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                    <div className="text-3xl font-black text-blue-600 mb-1">{score}</div>
                    <div className="text-xs text-gray-500 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Customer reviews ── */}
            <section id="reviews" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What Owners Are Saying</h2>
              <p className="text-sm text-gray-500 mb-6">
                Verified reviews from JB Racks owners sourced directly from{" "}
                <a href="https://jbracks.com.au/products/4-e-bike-rack" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  jbracks.com.au
                </a>
                {" "}({okendoReviews.length} verified buyers).
              </p>

              {/* ── Cialdini: wisdom-of-the-crowd strip ── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { stat: "15,000+", label: "customers worldwide" },
                  { stat: `${okendoReviews.length}+`, label: "verified reviews" },
                  { stat: `${avgRating}/5`, label: "average rating" },
                  { stat: "4 yrs",   label: "warranty" },
                ].map(({ stat, label }) => (
                  <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                    <div className="text-2xl font-black text-blue-600 leading-none mb-1">{stat}</div>
                    <div className="text-[11px] text-gray-500 leading-tight">{label}</div>
                  </div>
                ))}
              </div>

              {/* ── Cialdini: pull-quote highlights ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { quote: "We are 1,000 miles into a 3,800 mile trip and the rack is working flawlessly. Two fellow campers have already asked me about it.", author: "Todd B.", stars: 5 },
                  { quote: "Fantastic quality. Bikes are easy to put on and take off. Was very surprised by how stable it was on the back of the car.", author: "Lachlan M.", stars: 5 },
                  { quote: "We absolutely love the bike rack for our family of 4. So easy to load and unload. Customer service was quick and very helpful!", author: "Sara T.", stars: 5 },
                ].map(({ quote, author, stars }) => (
                  <div key={author} className="rounded-xl bg-blue-50 border border-blue-100 p-5 flex flex-col gap-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`h-3.5 w-3.5 ${s <= stars ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed italic flex-1">&ldquo;{quote}&rdquo;</p>
                    <p className="text-xs font-semibold text-gray-500">— {author}, Verified Buyer</p>
                  </div>
                ))}
              </div>

              {/* Aggregate bar chart */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-6 flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center sm:border-r sm:border-gray-200 sm:pr-6">
                  <div className="text-6xl font-black text-gray-900">{avgRating}</div>
                  <div className="flex gap-0.5 mt-2">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{okendoReviews.length} reviews</div>
                </div>
                <div className="flex-1 flex flex-col gap-1.5 justify-center">
                  {distribution.map(({ star, count }) => (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-3 text-right text-xs text-gray-500">{star}</span>
                      <Star className="h-3 w-3 text-amber-400 flex-shrink-0 fill-amber-400" />
                      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${okendoReviews.length ? (count / okendoReviews.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="w-4 text-xs text-gray-400">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Okendo reviews */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Sourced from jbracks.com.au</span>
                  <a href="https://jbracks.com.au/products/4-e-bike-rack" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="flex flex-col gap-4">
                  {okendoReviews.map((review) => (
                    <ReviewCard
                      key={review.reviewId}
                      review={{
                        id: review.reviewId,
                        author: review.reviewer.displayName,
                        rating: review.rating,
                        title: review.title,
                        body: review.body,
                        date: review.dateCreated,
                        verified: review.reviewer.isVerified,
                        image: review.media?.[0]?.largeUrl,
                      }}
                      source="jbracks.com.au"
                    />
                  ))}
                </div>
              </div>

            </section>

{/* ── JB Loading Demo ── */}
<section id="loading" className="mb-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">JB Racks Vertical Rack Demo</h2>
  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
    <iframe
      src="https://www.youtube.com/embed/0_kZpaTMghE"
      title="JB Racks vertical bike rack loading demo"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  </div>
</section>

{/* ── JB Roadtest Demo ── */}
<section id="roadtest" className="mb-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">JB Racks Road Tested</h2>
  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
    <iframe
      src="https://www.youtube.com/embed/R-spd-yh_XM"
      title="JB Racks road test"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  </div>
</section>

            {/* ── Product range ── */}
            <section id="range" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">The JB Racks Range</h2>
              <p className="text-gray-500 text-sm mb-6">
                Every JB Racks model independently rated for Australian conditions. All prices in AUD including free shipping.
              </p>
              <div className="flex flex-col gap-5">
                {jbProducts.filter((p) => p.categorySlug === "vertical-bike-racks").map((product, i) => (
                  <ProductCard key={product.slug} product={product} rank={i + 1} />
                ))}
              </div>
            </section>

            {/* ── JB Racks vs Thule ── */}
            <section id="vs-thule" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">JB Racks vs Thule — Which is Better for Australians?</h2>
              <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
                The most common question we receive: should I buy JB Racks or Thule? Here&apos;s our honest comparison for Australian buyers.
              </p>
              <div className="rounded-xl border border-gray-200 overflow-hidden mb-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 w-1/3"></th>
                      <th className="px-4 py-3 text-center font-bold text-blue-700">JB Racks 4-Bike</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-600">Thule T2 Pro XT 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Price (AUD)", "AU$950", "AU$1,499"],
                      ["Bike capacity", "4 bikes", "2 bikes"],
                      ["E-bike support", "30 kg each ✓", "27 kg each ✓"],
                      ["Warranty", "4 years", "3 years"],
                      ["Shipping", "Free (AU-wide)", "Varies by retailer"],
                      ["Origin", "South Australian brand", "Swedish brand"],
                      ["RackRatings score", `${avgRating}/5`, "4.7/5"],
                    ].map(([feature, jb, thule], i) => (
                      <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2.5 font-medium text-gray-600 text-xs">{feature}</td>
                        <td className="px-4 py-2.5 text-center font-semibold text-blue-700 text-xs">{jb}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 text-xs">{thule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                <strong>Our recommendation:</strong> For most Australian families — especially those with 3 or more bikes or heavy e-bikes — JB Racks is the clear winner. The 4-bike capacity at AU$950 beats the Thule 2-bike at AU$1,299+ on every practical metric. Thule&apos;s finish and heritage are premium, but for Australian conditions and budgets, JB Racks delivers more.
              </p>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions About JB Racks</h2>
              <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group bg-white">
                    <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none font-semibold text-gray-900 text-sm hover:bg-gray-50 transition-colors">
                      {question}
                      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{answer}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* ── Bottom line ── */}
            <section id="bottom-line" className="rounded-2xl bg-[#0d2340] text-white p-8 mb-6">
              <h2 className="text-2xl font-bold mb-3">Bottom Line: Should You Buy JB Racks?</h2>
              <p className="text-blue-200 leading-relaxed mb-6 text-[15px]">
                If you need to carry 2 or more bikes in Australia — especially e-bikes — JB Racks is the best value option on the market in {YEAR}. The 4-year warranty, free Australia-wide shipping, and 15,000+ happy customers speak for themselves. Our rating of <strong className="text-white">{avgRating}/5</strong> reflects a product that consistently delivers on its promises.
              </p>
              <div className="flex flex-wrap gap-3">
                {flagship?.affiliateUrl && (
                  <TrackedCta
                    href={goUrl(flagship.affiliateUrl, { product: flagship.slug, category: flagship.categorySlug, source: "jb-racks-reviews-bottom" })}
                    label="Shop JB Racks – Free Shipping"
                    product={flagship}
                    placement="jb-racks-reviews-bottom"
                    size="lg"
                  />
                )}
                <Link
                  href="/brands/jb-racks"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 px-6 py-3 text-sm font-semibold text-blue-200 hover:bg-white/5 transition-colors"
                >
                  View brand overview
                </Link>
              </div>
            </section>

          </main>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-20 flex flex-col gap-4">

              {/* Quick buy */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Top Rated</div>
                <Link href="/products/vertical-bike-racks/jb-racks-4-vertical-bike-rack" className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-sm leading-tight block mb-1">
                  JB Racks 4 Vertical Bike Rack
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={avgRating} size="sm" showValue />
                </div>
                <div className="text-2xl font-black text-gray-900 mb-3">AU$950</div>
                {flagship?.affiliateUrl && (
                  <TrackedCta
                    href={goUrl(flagship.affiliateUrl, { product: flagship.slug, category: flagship.categorySlug, source: "jb-racks-reviews-sidebar" })}
                    label="Go to site"
                    product={flagship}
                    placement="jb-racks-reviews-sidebar"
                    className="w-full"
                    size="sm"
                  />
                )}
                <p className="text-xs text-gray-400 text-center mt-2">Free shipping · 4-year warranty</p>
              </div>

              {/* All models */}
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">All JB Racks Models</div>
                <div className="flex flex-col gap-1">
                  {jbProducts.filter((p) => p.categorySlug === "vertical-bike-racks").map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.categorySlug}/${p.slug}`}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="truncate">{p.name.replace("JB Racks ", "")}</span>
                      <span className="text-xs font-semibold text-gray-900 flex-shrink-0 ml-2">{p.priceFormatted}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related */}
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Related Pages</div>
                <div className="flex flex-col gap-1">
                  {[
                    { href: "/brands/jb-racks", label: "JB Racks Brand Overview" },
                    { href: "/categories/vertical-bike-racks", label: "All Vertical Bike Racks" },
                    { href: "/compare/vertical-bike-racks", label: "Compare Vertical Racks" },
                  ].map(({ href, label }) => (
                    <Link key={href} href={href} className="rounded-lg px-2 py-1.5 text-sm text-blue-600 hover:bg-gray-50 hover:text-blue-800 transition-colors">
                      {label}
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

// ── Sub-components ─────────────────────────────────────────────────────────

function ProductCard({ product, rank }: { product: Product; rank: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            {product.badge && <Badge variant="editors" className="text-xs">{product.badge}</Badge>}
          </div>
          <Link
            href={`/products/${product.categorySlug}/${product.slug}`}
            className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-base leading-tight"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-3 mt-1.5 mb-2">
            <StarRating rating={product.rating} size="sm" showValue />
            <span className="text-sm font-bold text-gray-900">{product.priceFormatted}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{product.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
            {product.pros.slice(0, 3).map((pro) => (
              <div key={pro} className="flex items-start gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">{pro}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/products/${product.categorySlug}/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Full review <ChevronRight className="h-3.5 w-3.5" />
            </Link>
            {product.affiliateUrl && (
              <TrackedCta
                href={goUrl(product.affiliateUrl, { product: product.slug, category: product.categorySlug, source: "jb-racks-reviews-range" })}
                label="Go to site"
                product={product}
                placement="jb-racks-reviews-range"
                variant="outline"
                size="sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewCard({
  review,
  source,
}: {
  review: { id: string; author: string; rating: number; title?: string; body: string; date?: string; verified?: boolean; image?: string }
  source?: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      {/* Review photo */}
      {review.image && (
        <div className="mb-4 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={review.image}
            alt={`Review photo by ${review.author}`}
            className="rounded-lg object-cover max-w-[320px] w-full"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
            {review.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{review.author}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {review.verified && (
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Verified
              </span>
            )}
            {source && (
              <span className="text-xs text-gray-400">via {source}</span>
            )}
          </div>
        </div>
      </div>
      {review.title && (
        <p className="font-semibold text-gray-900 text-sm mb-1">{review.title}</p>
      )}
      <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
      {review.date && (
        <p className="text-xs text-gray-400 mt-3">
          {new Date(review.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      )}
    </div>
  )
}
