"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories, brands } from "@/lib/data"
import { cn } from "@/lib/utils"

const quickCompares = [
  { label: "Vertical Bike Racks", href: "/compare/vertical-bike-racks" },
  { label: "Hitch Bike Racks", href: "/compare/hitch-bike-racks" },
  { label: "Roof Racks", href: "/compare/roof-racks" },
  { label: "Roof Bike Carriers", href: "/compare/roof-bike-carriers" },
  { label: "Roof Cargo Boxes", href: "/compare/cargo-boxes" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCategoriesOpen(true)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setCategoriesOpen(false), 120)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">

          {/* Logo + tagline lockup */}
          <Link href="/" className="flex items-center gap-3.5 flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="RackRatings"
              width={210}
              height={30}
              priority
            />
            <span aria-hidden="true" className="w-px h-7 bg-gray-200" />
            <span className="text-[9px] font-bold tracking-[0.16em] uppercase text-gray-400 leading-[1.65]">
              Vehicle Rack<br />Comparison &amp; Analysis
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 flex-1 justify-center">

            {/* Categories mega-menu */}
            <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
              <button
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  categoriesOpen ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                )}
              >
                Categories
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-150", categoriesOpen && "rotate-180")} />
              </button>

              {/* Mega dropdown */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[680px] rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-150 overflow-hidden",
                  categoriesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="flex">
                  {/* Left: category list */}
                  <div className="flex-1 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      Browse by Type
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          onClick={() => setCategoriesOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-2xl leading-none mt-0.5 flex-shrink-0">{cat.icon}</span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 leading-tight">
                              {cat.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5 leading-snug line-clamp-1">
                              {cat.productCount} products rated
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <Link
                        href="/categories"
                        onClick={() => setCategoriesOpen(false)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        All categories <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: quick-compare + guides */}
                  <div className="w-52 bg-gray-50 border-l border-gray-100 p-5 flex flex-col gap-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                        Quick Compare
                      </p>
                      <ul className="space-y-1">
                        {quickCompares.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setCategoriesOpen(false)}
                              className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 hover:bg-white hover:text-blue-600 transition-colors group"
                            >
                              <span>{item.label}</span>
                              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                        Brand Reviews
                      </p>
                      <ul className="space-y-1">
                        {brands.map((brand) => (
                          <li key={brand.slug}>
                            <Link
                              href={`/brands/${brand.slug}`}
                              onClick={() => setCategoriesOpen(false)}
                              className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 hover:bg-white hover:text-blue-600 transition-colors group"
                            >
                              <span>{brand.name}</span>
                              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/compare" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Compare
            </Link>
            <Link href="/brands" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Brand Reviews
            </Link>
            {/* <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Guides
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link> */}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link href="/advertise">Advertise</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4">
          <nav className="mt-3 flex flex-col gap-1">
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            <div className="my-2 border-t border-gray-100" />
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Pages
            </p>
            <Link href="/compare" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Compare Products
            </Link>
            <Link href="/brands" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Brand Reviews
            </Link>
            <Link href="/blog" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Buying Guides
            </Link>
            <Link href="/advertise" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Advertise with Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
