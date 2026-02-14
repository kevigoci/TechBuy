"use client"

import { Timer, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReservationTimerProps {
  isReserving: boolean
  isReserved: boolean
  isExpired: boolean
  error: string | null
  timeRemaining: string
  secondsRemaining: number
  locale: string
}

export function ReservationTimer({
  isReserving,
  isReserved,
  isExpired,
  error,
  timeRemaining,
  secondsRemaining,
  locale,
}: ReservationTimerProps) {
  // Loading state while reserving
  if (isReserving) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 animate-pulse">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-800">
            {locale === "sq" ? "Duke rezervuar produktet..." : "Reserving your items..."}
          </p>
          <p className="text-xs text-blue-600">
            {locale === "sq"
              ? "Ju lutem prisni ndërsa kontrollojmë disponueshmërinë"
              : "Please wait while we check availability"}
          </p>
        </div>
      </div>
    )
  }

  // Error state — stock not available
  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-800">
            {locale === "sq" ? "Nuk u arrit të rezervohet" : "Could not reserve"}
          </p>
          <p className="text-xs text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  // Expired state
  if (isExpired) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-800">
            {locale === "sq" ? "Rezervimi ka skaduar" : "Reservation expired"}
          </p>
          <p className="text-xs text-amber-600">
            {locale === "sq"
              ? "Produktet u kthyen në stok. Rifreskoni faqen për të provuar përsëri."
              : "Items have been returned to stock. Refresh the page to try again."}
          </p>
        </div>
      </div>
    )
  }

  // Active reservation with countdown
  if (isReserved) {
    const isUrgent = secondsRemaining <= 120 // less than 2 minutes
    const isWarning = secondsRemaining <= 300 && !isUrgent // less than 5 minutes

    return (
      <div
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl border transition-colors",
          isUrgent
            ? "bg-red-50 border-red-300 animate-pulse"
            : isWarning
              ? "bg-amber-50 border-amber-200"
              : "bg-green-50 border-green-200"
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
            isUrgent ? "bg-red-100" : isWarning ? "bg-amber-100" : "bg-green-100"
          )}
        >
          {isUrgent ? (
            <Timer className="w-5 h-5 text-red-600" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-green-600" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "text-sm font-semibold",
                isUrgent ? "text-red-800" : isWarning ? "text-amber-800" : "text-green-800"
              )}
            >
              {isUrgent
                ? locale === "sq"
                  ? "Nxitoni! Koha po mbaron"
                  : "Hurry! Time is running out"
                : locale === "sq"
                  ? "Produktet janë rezervuar për ju"
                  : "Items reserved for you"}
            </p>
            <span
              className={cn(
                "text-lg font-mono font-bold tabular-nums",
                isUrgent ? "text-red-600" : isWarning ? "text-amber-600" : "text-green-700"
              )}
            >
              {timeRemaining}
            </span>
          </div>
          <p
            className={cn(
              "text-xs mt-0.5",
              isUrgent ? "text-red-600" : isWarning ? "text-amber-600" : "text-green-600"
            )}
          >
            {isUrgent
              ? locale === "sq"
                ? "Përfundoni porosinë para se produktet të kthehen në stok"
                : "Complete your order before items return to stock"
              : locale === "sq"
                ? "Askush tjetër nuk mund t'i blejë ndërsa jeni duke paguar"
                : "No one else can purchase these while you complete payment"}
          </p>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                isUrgent
                  ? "bg-red-500"
                  : isWarning
                    ? "bg-amber-500"
                    : "bg-green-500"
              )}
              style={{ width: `${Math.min((secondsRemaining / 600) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Default — nothing to show
  return null
}
