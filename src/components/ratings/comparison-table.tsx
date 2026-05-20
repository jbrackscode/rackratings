"use client"

import Link from "next/link"
import { ExternalLink, Check, X } from "lucide-react"
import { StarRating } from "@/components/ui/star-rating"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { goUrl } from "@/lib/affiliate"
import { pushSelectItem } from "@/lib/analytics"
import type { Product } from "@/types"

interface ComparisonTableProps {
  products: Product[]
}

export function ComparisonTable({ products }: ComparisonTableProps) {
  if (products.length < 2) return null

  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  )

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="p-4 text-left text-sm font-semibold text-gray-600 w-36">Feature</th>
            {products.map((product) => (
              <th key={product.slug} className="p-4 text-center min-w-[180px]">
                <div className="flex flex-col items-center gap-2">
                  {product.badge && (
                    <Badge variant="editors" className="text-xs">{product.badge}</Badge>
                  )}
                  <Link
                    href={`/products/${product.categorySlug}/${product.slug}`}
                    className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-sm leading-tight"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-gray-400">{product.brand}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Rating row */}
          <tr className="border-b border-gray-100">
            <td className="p-4 text-sm font-medium text-gray-600 bg-gray-50">Rating</td>
            {products.map((product) => (
              <td key={product.slug} className="p-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <StarRating rating={product.rating} size="sm" showValue />
                  {/* <span className="text-xs text-gray-400">{product.reviewCount} reviews</span> */}
                </div>
              </td>
            ))}
          </tr>

          {/* Price row */}
          <tr className="border-b border-gray-100">
            <td className="p-4 text-sm font-medium text-gray-600 bg-gray-50">Price</td>
            {products.map((product, i) => {
              const cheapest = products.reduce((a, b) => (a.price < b.price ? a : b))
              return (
                <td key={product.slug} className="p-4 text-center">
                  <span className={`font-bold text-base ${product.slug === cheapest.slug ? "text-green-700" : "text-gray-900"}`}>
                    {product.priceFormatted}
                  </span>
                  {product.slug === cheapest.slug && products.length > 1 && (
                    <div className="text-xs text-green-600 font-medium mt-0.5">Best value</div>
                  )}
                </td>
              )
            })}
          </tr>

          {/* Spec rows */}
          {allSpecKeys.map((key, index) => (
            <tr key={key} className={`border-b border-gray-100 ${index % 2 === 0 ? "" : "bg-gray-50/50"}`}>
              <td className="p-4 text-sm font-medium text-gray-600 bg-gray-50">{key}</td>
              {products.map((product) => (
                <td key={product.slug} className="p-4 text-center text-sm text-gray-700">
                  {product.specs[key] || (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}

          {/* CTA row */}
          <tr className="bg-gray-50">
            <td className="p-4 text-sm font-medium text-gray-600">Buy</td>
            {products.map((product) => (
              <td key={product.slug} className="p-4 text-center">
                {product.affiliateUrl ? (
                  <Button variant="cta" size="sm" asChild>
                    <a
                      href={goUrl(product.affiliateUrl, { product: product.slug, category: product.categorySlug, source: "comparison-table" })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => pushSelectItem({ product, cta: "Go to site", placement: "comparison-table", monetised: true })}
                    >
                      Go to site <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                ) : (
                  <span className="text-sm text-gray-400">N/A</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
