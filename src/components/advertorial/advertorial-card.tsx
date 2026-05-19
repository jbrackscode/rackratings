import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { goUrl } from "@/lib/affiliate"
import type { Advertorial } from "@/types"

interface AdvertorialCardProps {
  advertorial: Advertorial
}

export function AdvertorialCard({ advertorial }: AdvertorialCardProps) {
  return (
    <Card className="border-amber-200 bg-amber-50/30">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge variant="sponsored">Sponsored</Badge>
          <span className="text-xs text-gray-400">{advertorial.brand}</span>
        </div>
        <Link
          href={`/advertorial/${advertorial.slug}`}
          className="block font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight mb-2"
        >
          {advertorial.title}
        </Link>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{advertorial.excerpt}</p>
        <Button variant="cta" size="sm" asChild className="w-full">
          <a
            href={goUrl(advertorial.ctaUrl, { source: "advertorial-card" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {advertorial.ctaText} <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </a>
        </Button>
        <p className="text-xs text-gray-400 mt-2 text-center">Paid partnership</p>
      </CardContent>
    </Card>
  )
}
