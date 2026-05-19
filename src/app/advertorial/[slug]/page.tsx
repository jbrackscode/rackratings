import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdvertorialBadge } from "@/components/advertorial/advertorial-badge"
import { advertorials } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { goUrl } from "@/lib/affiliate"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return advertorials.map((ad) => ({ slug: ad.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ad = advertorials.find((a) => a.slug === slug)
  if (!ad) return {}

  return buildMetadata({
    title: ad.title,
    description: ad.excerpt,
    path: `/advertorial/${ad.slug}`,
  })
}

export default async function AdvertorialPage({ params }: Props) {
  const { slug } = await params
  const ad = advertorials.find((a) => a.slug === slug)
  if (!ad) notFound()

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Sponsored", href: "/advertorial" },
    { name: ad.title, href: `/advertorial/${ad.slug}` },
  ])

  const lines = ad.body.trim().split("\n")

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Top disclosure banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AdvertorialBadge disclosure={ad.disclosure} />
            <p className="text-xs text-amber-800">{ad.disclosure}</p>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${ad.category.toLowerCase()}`} className="hover:text-gray-700">{ad.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">Sponsored</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <AdvertorialBadge disclosure={ad.disclosure} />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 leading-tight">{ad.title}</h1>
          <p className="mt-3 text-lg text-gray-600 leading-relaxed">{ad.excerpt}</p>
          <p className="mt-2 text-sm text-gray-400">
            Published {new Date(ad.publishedAt).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })} ·
            Produced in partnership with <strong className="text-gray-600">{ad.brand}</strong>
          </p>
        </div>

        {/* Hero image placeholder */}
        <div className="w-full h-64 bg-gradient-to-br from-amber-50 to-gray-100 rounded-2xl flex items-center justify-center text-6xl mb-8 border border-amber-200">
          📢
        </div>

        {/* CTA (top) */}
        <div className="mb-8 rounded-xl bg-orange-50 border border-orange-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900">{ad.brand}</p>
            <p className="text-sm text-gray-600 mt-0.5">Click below to see the exclusive offer</p>
          </div>
          <Button variant="cta" size="lg" asChild className="flex-shrink-0">
            <a href={goUrl(ad.ctaUrl, { source: "advertorial-top" })} target="_blank" rel="noopener noreferrer">
              {ad.ctaText} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Body content */}
        <div className="prose max-w-none">
          {lines.map((line, i) => {
            const trimmed = line.trim()
            if (!trimmed) return null
            if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
              return <h2 key={i}>{trimmed.replace(/\*\*/g, "")}</h2>
            }
            if (trimmed.startsWith("- ")) {
              return <ul key={i}><li>{trimmed.slice(2)}</li></ul>
            }
            return <p key={i}>{trimmed}</p>
          })}
        </div>

        {/* CTA (bottom) */}
        <div className="mt-12 rounded-xl bg-orange-500 p-6 text-center text-white">
          <p className="font-bold text-xl mb-2">{ad.ctaText}</p>
          <p className="text-orange-100 text-sm mb-4">Click the button below to see the offer from {ad.brand}</p>
          <Button
            asChild
            size="xl"
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold"
          >
            <a href={goUrl(ad.ctaUrl, { source: "advertorial-bottom" })} target="_blank" rel="noopener noreferrer">
              Visit {ad.brand} <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        {/* Bottom disclosure */}
        <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Disclosure:</strong> {ad.disclosure}
          </p>
        </div>
      </article>
    </>
  )
}
