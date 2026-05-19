import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { StarRating } from "@/components/ui/star-rating"

interface Breadcrumb {
  label: string
  href?: string
}

interface TopProduct {
  name: string
  rating: number
  href: string
}

interface PageMastheadProps {
  breadcrumbs: Breadcrumb[]
  icon?: string
  heading: string
  description: string
  updatedAt?: string
  topProduct?: TopProduct
  productCount?: number
}

export function PageMasthead({
  breadcrumbs,
  icon,
  heading,
  description,
  updatedAt,
  topProduct,
  productCount,
}: PageMastheadProps) {
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })
    : null

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-gray-300">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-gray-800 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Icon + heading */}
            <div className="flex items-center gap-3 mb-2">
              {icon && <span className="text-4xl">{icon}</span>}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{heading}</h1>
            </div>

            {/* Description */}
            <p className="text-gray-500 mt-2 leading-relaxed max-w-2xl">{description}</p>

            {/* Author byline */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {/* Avatar + name */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  RR
                </div>
                <span className="text-sm font-medium text-gray-700">RackRatings Editorial</span>
              </div>

              {formattedDate && (
                <>
                  <span className="text-gray-300 hidden sm:inline">·</span>
                  <span className="text-sm text-gray-500">Updated {formattedDate}</span>
                </>
              )}

              {/* Verified badge */}
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 hover:bg-emerald-100 transition-colors"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Verified
              </Link>

              {productCount !== undefined && (
                <>
                  <span className="text-gray-300 hidden sm:inline">·</span>
                  <span className="text-sm text-gray-500">{productCount} products compared</span>
                </>
              )}
            </div>
          </div>

          {/* Best product stat callout */}
          {topProduct && (
            <div className="flex-shrink-0 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 min-w-[220px]">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Top rated</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-black text-blue-600">{topProduct.rating}</span>
                <StarRating rating={topProduct.rating} size="sm" />
              </div>
              <Link
                href={topProduct.href}
                className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors leading-snug line-clamp-2"
              >
                {topProduct.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
