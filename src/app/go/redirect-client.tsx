"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function RedirectClient() {
  const params = useSearchParams()
  const url = params.get("url")
  const product = params.get("product")
  const category = params.get("category")
  const source = params.get("source")

  const [status, setStatus] = useState<"loading" | "redirecting">("loading")

  useEffect(() => {
    if (!url) {
      window.location.href = "/"
      return
    }

    const timeout = setTimeout(() => {
      setStatus("redirecting")
      window.location.href = url
    }, 2000)

    fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, product, category, source }),
    })
      .catch(() => null)
      .finally(() => {
        clearTimeout(timeout)
        setStatus("redirecting")
        window.location.href = url
      })

    return () => clearTimeout(timeout)
  }, [url, product, category, source])

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

        <p className="text-lg font-semibold text-gray-800 mb-1">
          {status === "loading" ? "Finding best price…" : "Redirecting you now…"}
        </p>
        <p className="text-sm text-gray-500">Taking you to the retailer</p>
      </div>
    </div>
  )
}
