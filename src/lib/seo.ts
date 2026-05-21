import type { Metadata } from "next"

const SITE_URL = "https://rackratings.com.au"
const SITE_NAME = "RackRatings"
const DEFAULT_DESCRIPTION =
  "Australia's trusted ratings and comparison site for car racks, bike racks, and outdoor racks. Expert reviews, specs, and prices in AUD."

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image,
  noIndex = false,
}: {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: fullTitle }] }),
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image && { images: [image] }),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
  }
}

export function productJsonLd(product: {
  name: string
  description: string
  brand: string
  rating: number
  reviewCount: number
  price: number
  image: string
  slug: string
  categorySlug: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: `${SITE_URL}${product.image}`,
    url: `${SITE_URL}/products/${product.categorySlug}/${product.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
  }
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

export function itemListJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string
  description: string
  path: string
  items: { name: string; slug: string; categorySlug: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: `${SITE_URL}${path}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}/products/${item.categorySlug}/${item.slug}`,
    })),
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  }
}
