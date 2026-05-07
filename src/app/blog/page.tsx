import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/data"
import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata({
  title: "Buying Guides & Product Reviews",
  description:
    "In-depth buying guides, expert advice, and product comparisons for Australian consumers. Make smarter purchasing decisions with RackRatings.",
  path: "/blog",
})

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Buying Guides</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Buying Guides & Reviews</h1>
      <p className="text-gray-500 mb-10">
        Expert advice and in-depth guides to help Australian shoppers make the best buying decisions.
      </p>

      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-all duration-200 h-full cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl flex items-center justify-center text-5xl mb-4">
                    📖
                  </div>
                  <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                  <h2 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p>Guides coming soon. Check back shortly.</p>
        </div>
      )}
    </div>
  )
}
