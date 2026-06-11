import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { GoogleTagManager } from "@next/third-parties/google"
import Script from "next/script"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { websiteJsonLd } from "@/lib/seo"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "RackRatings – Australia's #1 Rack Ratings & Comparison Site",
    template: "%s | RackRatings",
  },
  description:
    "Australia's trusted ratings and comparison site for car racks, bike racks, and outdoor racks. Expert reviews, specs, and prices in AUD.",
  metadataBase: new URL("https://www.rackratings.com.au"),
  openGraph: {
    siteName: "RackRatings",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  verification: {
    google: "882b1f1eab1ff007",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-5CQBL2L7" />
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1653698348403397');
fbq('init','1869402770422217');
fbq('track','PageView');`}
      </Script>
    </html>
  )
}
