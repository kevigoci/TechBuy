import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/reservations/release
// Releases a stock reservation (user leaves checkout or cancels)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reservation_ids } = body

    if (!reservation_ids || !Array.isArray(reservation_ids) || reservation_ids.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No reservation IDs provided' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const results: { reservation_id: string; success: boolean; message: string }[] = []

    for (const reservationId of reservation_ids) {
      const { data, error } = await supabase.rpc('release_reservation', {
        p_reservation_id: reservationId,
      })

      if (error) {
        console.error('Release reservation error:', error)
        results.push({ reservation_id: reservationId, success: false, message: error.message })
        continue
      }

      const result = typeof data === 'string' ? JSON.parse(data) : data
      results.push({ reservation_id: reservationId, ...result })
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'Reservations processed',
    })
  } catch (error) {
    console.error('Release API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
