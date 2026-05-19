import { Suspense } from "react"
import type { Metadata } from "next"
import { RedirectClient } from "./redirect-client"

export const metadata: Metadata = {
  title: "Finding Best Price…",
  robots: { index: false, follow: false },
}

function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-sm mx-auto px-4">
        <div className="mb-6">
          <span className="text-2xl font-black text-blue-600 tracking-tight">RackRatings</span>
        </div>
        <div className="flex justify-center mb-6">
          <svg
            className="animate-spin h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-800 mb-1">Finding best price…</p>
        <p className="text-sm text-gray-500">Taking you to the retailer</p>
      </div>
    </div>
  )
}

export default function GoPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RedirectClient />
    </Suspense>
  )
}
