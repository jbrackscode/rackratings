import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AdvertorialBadgeProps {
  disclosure?: string
  size?: "sm" | "md"
}

export function AdvertorialBadge({
  disclosure = "This is paid advertorial content produced in partnership with the brand. Our editorial team maintains independence in all product ratings.",
  size = "md",
}: AdvertorialBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 cursor-help">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Paid Advertorial
            </span>
            <Info className="h-3.5 w-3.5 text-amber-700" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">
          {disclosure}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
