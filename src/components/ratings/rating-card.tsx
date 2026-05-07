import Link from "next/link"
import { ExternalLink, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import { formatReviewCount } from "@/lib/utils"
import type { Product } from "@/types"

interface RatingCardProps {
  product: Product
  rank?: number
  variant?: "default" | "compact" | "featured"
}

export function RatingCard({ product, rank, variant = "default" }: RatingCardProps) {
  const href = `/products/${product.categorySlug}/${product.slug}`

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {rank && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-700">
                {rank}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <Link href={href} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm leading-tight">
                  {product.name}
                </Link>
                {product.badge && (
                  <Badge variant="editors" className="flex-shrink-0 text-xs">{product.badge}</Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{product.brand}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <StarRating rating={product.rating} size="sm" showValue />
                <span className="text-xs text-gray-400">({formatReviewCount(product.reviewCount)})</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-gray-900 text-sm">{product.priceFormatted}</span>
                {product.affiliateUrl && (
                  <Button variant="outline" size="sm" asChild className="h-7 text-xs px-2">
                    <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer">
                      Buy <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Rank */}
          {rank && (
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                #{rank}
              </div>
            </div>
          )}

          {/* Image placeholder */}
          <div className="flex-shrink-0 w-full sm:w-32 h-32 sm:h-32 bg-gray-100 rounded-xl flex items-center justify-center text-4xl">
            📦
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              {product.badge && (
                <Badge variant="editors">{product.badge}</Badge>
              )}
              {product.isSponsored && (
                <Badge variant="sponsored">Sponsored</Badge>
              )}
            </div>

            <Link
              href={href}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight"
            >
              {product.name}
            </Link>
            <p className="text-sm text-gray-500 mt-0.5">{product.brand} · {product.category}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <StarRating rating={product.rating} size="md" showValue />
              <span className="text-sm text-gray-400">{formatReviewCount(product.reviewCount)} reviews</span>
            </div>

            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>

            {/* Pros/Cons preview */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.pros.slice(0, 2).map((pro) => (
                <div key={pro} className="flex items-start gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">{pro}</span>
                </div>
              ))}
              {product.cons.slice(0, 1).map((con) => (
                <div key={con} className="flex items-start gap-1.5">
                  <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">{con}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex-shrink-0 flex flex-col items-start sm:items-end justify-between gap-3 sm:min-w-[140px]">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{product.priceFormatted}</div>
              <div className="text-xs text-gray-400">approx. AUD</div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              {product.affiliateUrl && (
                <Button variant="cta" size="default" asChild className="w-full sm:w-auto">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                  >
                    Best Price <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button variant="outline" size="default" asChild className="w-full sm:w-auto">
                <Link href={href}>Full Review</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
