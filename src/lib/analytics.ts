declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export interface SelectItemParams {
  product: {
    slug: string
    name: string
    brand: string
    category: string
    categorySlug: string
    price: number
    badge?: string
    affiliateUrl?: string
  }
  /** Human-readable CTA label, e.g. "Go to site", "More Details" */
  cta: string
  /** Component/location of the click, e.g. "rating-card", "flyout", "comparison-table" */
  placement: string
  /** Whether this click generates affiliate revenue */
  monetised: boolean
  /** 0-based rank/position within the list */
  index?: number
  /** Machine-readable list identifier, defaults to categorySlug */
  listId?: string
  /** Human-readable list name shown in GA4 reports, defaults to category */
  listName?: string
}

/**
 * Push a GA4 select_item ecommerce event to the GTM dataLayer.
 * Always clears the previous ecommerce object first (GA4 spec requirement).
 */
export function pushSelectItem({
  product,
  cta,
  placement,
  monetised,
  index = 0,
  listId,
  listName,
}: SelectItemParams): void {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []

  // GA4 / GTM spec: clear previous ecommerce payload before pushing a new one
  window.dataLayer.push({ ecommerce: null })

  window.dataLayer.push({
    event: "select_item",
    ecommerce: {
      item_list_id: listId ?? product.categorySlug,
      item_list_name: listName ?? product.category,
      items: [
        {
          item_name: product.name,
          item_id: product.slug,
          item_brand: product.brand,
          item_category: product.category,
          item_category_2: product.categorySlug,
          item_category_3: `CTA-${cta}`,
          item_category_4: monetised ? "monetised" : "unmonetised",
          item_category_5: product.badge ?? "",
          item_variant: placement,
          index,
          price: product.price,
          quantity: 1,
        },
      ],
    },
  })
}
