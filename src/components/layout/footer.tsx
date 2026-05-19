import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/data"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="RackRatings"
                width={140}
                height={20}
              />
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Australia&apos;s trusted source for car rack, bike rack, and outdoor rack ratings, expert reviews, and comparisons.
            </p>
            {/* <p className="mt-4 text-xs text-gray-400">
              ABN: 00 000 000 000
            </p> */}
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/categories"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  All categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Tools</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/compare" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Compare Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Buying Guides
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Today&apos;s Deals
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Advertise with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-3 space-y-2">
              {/* <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-we-rate" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  How We Rate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Terms of Use
                </Link>
              </li> */}
              <li>
                <Link href="/affiliate-disclosure" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-400">
            © {year} RackRatings. All rights reserved. 
            {/* ABN: 00 000 000 000 */}
          </p>
          <p className="text-xs text-gray-400 max-w-lg">
            <strong>Affiliate Disclosure:</strong> RackRatings earns a commission from qualifying purchases made through affiliate links on this site at no extra cost to you. Advertorial content is clearly labelled. Our editorial ratings are independent and unbiased.
          </p>
        </div>
      </div>
    </footer>
  )
}
