"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X, ExternalLink, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { getReviewsByProduct } from "@/lib/data"
import { goUrl } from "@/lib/affiliate"
import { pushSelectItem } from "@/lib/analytics"
import type { Product } from "@/types"

interface ProductFlyoutProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductFlyout({ product, isOpen, onClose }: ProductFlyoutProps) {
  const href = `/products/${product.categorySlug}/${product.slug}`
  const reviews = getReviewsByProduct(product.slug)

  function trackAffiliate(placement: string) {
    pushSelectItem({ product, cta: "Go to site", placement, monetised: true })
  }

  // Close on Escape, lock body scroll
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[520px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-1">
              {product.badge && <Badge variant="editors" className="text-xs">{product.badge}</Badge>}
              {product.isSponsored && <Badge variant="sponsored" className="text-xs">Sponsored</Badge>}
            </div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{product.brand} · {product.category}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors mt-0.5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-6">

            {/* Price + rating + CTA */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div>
                <div className="text-3xl font-black text-gray-900">{product.priceFormatted}</div>
                <div className="text-xs text-gray-400 mt-0.5">approx. AUD</div>
                <div className="mt-2">
                  <StarRating rating={product.rating} size="sm" showValue />
                </div>
              </div>
              {product.affiliateUrl && (
                <Button variant="cta" size="default" asChild>
                  <a
                    href={goUrl(product.affiliateUrl, { product: product.slug, category: product.categorySlug, source: "flyout" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliate("flyout")}
                  >
                    Go to site <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Overview</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Pros
                </h3>
                <ul className="space-y-1.5">
                  {product.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <XCircle className="h-4 w-4 text-red-400" /> Cons
                </h3>
                <ul className="space-y-1.5">
                  {product.cons.map((con) => (
                    <li key={con} className="flex items-start gap-1.5">
                      <XCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Specifications</h3>
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-3 py-2 font-medium text-gray-500 w-2/5 text-xs">{key}</td>
                        <td className="px-3 py-2 text-gray-900 text-xs">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Customer Reviews
                  <span className="ml-1.5 text-xs font-normal text-gray-400">({reviews.length})</span>
                </h3>
                <div className="space-y-3">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-800">{review.author}</span>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-xs font-medium text-gray-700">{review.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{review.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex-shrink-0 flex items-center justify-between gap-3">
          <Link
            href={href}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View full review page <ArrowRight className="h-4 w-4" />
          </Link>
          {product.affiliateUrl && (
            <Button variant="cta" size="sm" asChild>
              <a
                href={goUrl(product.affiliateUrl, { product: product.slug, category: product.categorySlug, source: "flyout-footer" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliate("flyout-footer")}
              >
                Go to site <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
