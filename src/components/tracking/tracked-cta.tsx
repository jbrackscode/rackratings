"use client"

import { ExternalLink } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { pushSelectItem, type SelectItemParams } from "@/lib/analytics"

interface TrackedCtaProps {
  href: string
  label?: string
  product: SelectItemParams["product"]
  cta?: string
  placement: string
  monetised?: boolean
  index?: number
  listId?: string
  listName?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  className?: string
}

/**
 * Affiliate CTA button that fires a GA4 select_item dataLayer event on click.
 * Safe to use inside server components — creates its own client boundary.
 */
export function TrackedCta({
  href,
  label = "Go to site",
  product,
  cta,
  placement,
  monetised = true,
  index,
  listId,
  listName,
  variant = "cta",
  size = "default",
  className,
}: TrackedCtaProps) {
  return (
    <Button variant={variant} size={size} asChild className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          pushSelectItem({
            product,
            cta: cta ?? label,
            placement,
            monetised,
            index,
            listId,
            listName,
          })
        }
      >
        {label} <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </Button>
  )
}
