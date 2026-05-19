export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  productCount: number
}

export interface Product {
  slug: string
  name: string
  category: string
  categorySlug: string
  brand: string
  description: string
  rating: number
  reviewCount: number
  price: number
  priceFormatted: string
  image: string
  pros: string[]
  cons: string[]
  specs: Record<string, string>
  affiliateUrl?: string
  isSponsored?: boolean
  badge?: string
  publishedAt: string
  updatedAt: string
}

export interface Review {
  id: string
  productSlug: string
  author: string
  rating: number
  title: string
  body: string
  verified: boolean
  date: string
}

export interface ComparisonProduct {
  slug: string
  name: string
  brand: string
  rating: number
  price: number
  priceFormatted: string
  image: string
  specs: Record<string, string>
  affiliateUrl?: string
}

export interface Advertorial {
  slug: string
  title: string
  excerpt: string
  body: string
  brand: string
  brandLogo: string
  ctaText: string
  ctaUrl: string
  image: string
  category: string
  publishedAt: string
  disclosure: string
}

export interface Brand {
  slug: string
  name: string
  description: string
  country: string
  website: string
  categories: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  body: string
  author: string
  category: string
  image: string
  publishedAt: string
  updatedAt: string
  tags: string[]
}
