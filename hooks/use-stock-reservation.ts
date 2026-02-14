"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface ReservationItem {
  product_id: string
  variant_id: string | null
  quantity: number
}

interface Reservation {
  reservation_id: string
  product_id: string
  variant_id: string | null
  expires_at: string
}

interface UseStockReservationReturn {
  /** Whether we're currently reserving stock */
  isReserving: boolean
  /** Whether stock is successfully reserved */
  isReserved: boolean
  /** Whether the reservation expired */
  isExpired: boolean
  /** Error message if reservation failed */
  error: string | null
  /** Active reservation records */
  reservations: Reservation[]
  /** Seconds remaining until reservation expires */
  secondsRemaining: number
  /** Formatted time remaining (MM:SS) */
  timeRemaining: string
  /** Reserve stock for the given items */
  reserveStock: (items: ReservationItem[]) => Promise<boolean>
  /** Release all active reservations */
  releaseStock: () => Promise<void>
  /** Complete reservations after successful payment */
  completeReservation: () => Promise<boolean>
}

function getSessionId(): string {
  if (typeof window === "undefined") return ""
  let sessionId = localStorage.getItem("cart_session_id")
  if (!sessionId) {
    sessionId = "guest_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    localStorage.setItem("cart_session_id", sessionId)
  }
  return sessionId
}

export function useStockReservation(): UseStockReservationReturn {
  const [isReserving, setIsReserving] = useState(false)
  const [isReserved, setIsReserved] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const expiresAtRef = useRef<Date | null>(null)

  // Countdown timer
  useEffect(() => {
    if (!isReserved || !expiresAtRef.current) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    const tick = () => {
      const now = new Date()
      const diff = Math.max(0, Math.floor((expiresAtRef.current!.getTime() - now.getTime()) / 1000))
      setSecondsRemaining(diff)

      if (diff <= 0) {
        setIsExpired(true)
        setIsReserved(false)
        setReservations([])
        expiresAtRef.current = null
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }

    tick() // initial tick
    timerRef.current = setInterval(tick, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isReserved])

  // Cleanup on unmount — release reservations via beacon API
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const reserveStock = useCallback(async (items: ReservationItem[]): Promise<boolean> => {
    setIsReserving(true)
    setError(null)
    setIsExpired(false)

    try {
      const response = await fetch("/api/reservations/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          session_id: getSessionId(),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to reserve stock")
        setIsReserving(false)
        return false
      }

      setReservations(data.reservations)
      setIsReserved(true)
      expiresAtRef.current = new Date(data.expires_at)
      setIsReserving(false)
      return true
    } catch (err) {
      console.error("Reserve stock error:", err)
      setError("Failed to reserve stock. Please try again.")
      setIsReserving(false)
      return false
    }
  }, [])

  const releaseStock = useCallback(async () => {
    if (reservations.length === 0) return

    const reservationIds = reservations.map((r) => r.reservation_id)

    try {
      // Use sendBeacon for reliability when user navigates away
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ reservation_ids: reservationIds })],
          { type: "application/json" }
        )
        navigator.sendBeacon("/api/reservations/release", blob)
      } else {
        await fetch("/api/reservations/release", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reservation_ids: reservationIds }),
        })
      }
    } catch (err) {
      console.error("Release stock error:", err)
    }

    // Clean up local state regardless
    setReservations([])
    setIsReserved(false)
    setSecondsRemaining(0)
    expiresAtRef.current = null
    if (timerRef.current) clearInterval(timerRef.current)
  }, [reservations])

  const completeReservation = useCallback(async (): Promise<boolean> => {
    if (reservations.length === 0) return false

    const reservationIds = reservations.map((r) => r.reservation_id)

    try {
      const response = await fetch("/api/reservations/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservation_ids: reservationIds }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to complete reservation")
        return false
      }

      // Clean up
      setReservations([])
      setIsReserved(false)
      setSecondsRemaining(0)
      expiresAtRef.current = null
      if (timerRef.current) clearInterval(timerRef.current)

      return true
    } catch (err) {
      console.error("Complete reservation error:", err)
      setError("Failed to complete reservation")
      return false
    }
  }, [reservations])

  const timeRemaining = `${Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0")}:${(secondsRemaining % 60).toString().padStart(2, "0")}`

  return {
    isReserving,
    isReserved,
    isExpired,
    error,
    reservations,
    secondsRemaining,
    timeRemaining,
    reserveStock,
    releaseStock,
    completeReservation,
  }
}
