import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i + 1 <= Math.floor(rating)
          const partial = !filled && i < rating

          return (
            <span key={i} className="relative inline-flex">
              <Star
                className={cn(sizeClasses[size], "text-gray-200")}
                fill="currentColor"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
                >
                  <Star
                    className={cn(sizeClasses[size], "text-amber-400")}
                    fill="currentColor"
                  />
                </span>
              )}
            </span>
          )
        })}
      </div>
      {showValue && (
        <span className={cn("font-semibold text-gray-900", textClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
