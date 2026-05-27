import type { MetadataRoute } from "next"
import { categories, products, advertorials, blogPosts, brands } from "@/lib/data"

const BASE_URL = "https://rackratings.com.au"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/affiliate-disclosure`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  const compareRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/compare/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.categorySlug}/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const advertorialRoutes: MetadataRoute.Sitemap = advertorials.map((ad) => ({
    url: `${BASE_URL}/advertorial/${ad.slug}`,
    lastModified: new Date(ad.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const reviewPageRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/jb-racks-reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ]

  const brandRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/brands`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...brands.map((brand) => ({
      url: `${BASE_URL}/brands/${brand.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]

  return [
    ...staticRoutes,
    ...reviewPageRoutes,
    ...categoryRoutes,
    ...compareRoutes,
    ...productRoutes,
    ...brandRoutes,
    ...advertorialRoutes,
    ...blogRoutes,
  ]
}
