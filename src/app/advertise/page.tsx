import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata({
  title: "Advertise with RackRatings – Reach Australian Rack Buyers",
  description:
    "Partner with RackRatings to reach 250,000+ Australian shoppers actively comparing car racks, bike racks, and outdoor racks. Advertorial content, category sponsorships, and affiliate partnerships available.",
  path: "/advertise",
})

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Advertise</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Partner with RackRatings
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Reach 250,000+ Australian shoppers who are actively comparing and buying car racks, bike racks, and outdoor racks. Our audience is ready to purchase.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: "250k+", label: "Monthly visitors" },
          { value: "85%", label: "Based in Australia" },
          { value: "6 min", label: "Avg. session duration" },
          { value: "500+", label: "Products reviewed" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5 text-center">
              <div className="text-2xl font-black text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Packages */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Advertising Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            name: "Advertorial Content",
            price: "From AU$2,500",
            desc: "Long-form branded content written in our editorial style. Clearly labelled, SEO-optimised, and promoted across our site and newsletter.",
            features: [
              "Dedicated article page",
              "SEO-optimised copy",
              "Affiliate link integration",
              "30-day homepage promotion",
              "Performance report",
            ],
          },
          {
            name: "Category Sponsorship",
            price: "From AU$1,200/mo",
            desc: "Own a category page with your brand featured prominently alongside every product review and comparison in that niche.",
            features: [
              "Category page logo placement",
              "Sidebar ad unit",
              "Product page mentions",
              "Newsletter feature",
              "Monthly analytics",
            ],
            featured: true,
          },
          {
            name: "Affiliate Partnership",
            price: "CPA model",
            desc: "We list your products with affiliate tracking links across relevant reviews and comparison pages.",
            features: [
              "Product listing placement",
              "Comparison table inclusion",
              "Performance-based pricing",
              "Real-time tracking",
              "Dedicated account manager",
            ],
          },
        ].map((pkg) => (
          <Card key={pkg.name} className={pkg.featured ? "border-blue-500 shadow-lg" : ""}>
            <CardContent className="p-6">
              {pkg.featured && (
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Most Popular</div>
              )}
              <h3 className="font-bold text-gray-900 text-lg">{pkg.name}</h3>
              <div className="text-2xl font-black text-gray-900 mt-1 mb-3">{pkg.price}</div>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{pkg.desc}</p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={pkg.featured ? "default" : "outline"}
                className="w-full"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disclosure */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-6">
        <h3 className="font-semibold text-amber-900 mb-2">Our Editorial Promise</h3>
        <p className="text-sm text-amber-800 leading-relaxed">
          All paid content is clearly labelled as &quot;Paid Advertorial&quot; or &quot;Sponsored&quot;. Advertising relationships never influence our editorial product ratings or reviews. Our scores are determined independently by our editorial team. We comply with Australian Consumer Law and ACCC guidelines on sponsored content disclosure.
        </p>
      </div>
    </div>
  )
}
