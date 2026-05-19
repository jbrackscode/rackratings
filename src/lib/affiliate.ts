export function goUrl(
  affiliateUrl: string,
  opts: { product?: string; category?: string; source: string }
): string {
  const params = new URLSearchParams({ url: affiliateUrl, source: opts.source })
  if (opts.product) params.set("product", opts.product)
  if (opts.category) params.set("category", opts.category)
  return `/go?${params}`
}
