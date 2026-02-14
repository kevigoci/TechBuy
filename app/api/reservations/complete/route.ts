import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/reservations/complete
// Completes reservations after successful payment (decrements real stock)
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
    let allSuccess = true

    for (const reservationId of reservation_ids) {
      const { data, error } = await supabase.rpc('complete_reservation', {
        p_reservation_id: reservationId,
      })

      if (error) {
        console.error('Complete reservation error:', error)
        results.push({ reservation_id: reservationId, success: false, message: error.message })
        allSuccess = false
        continue
      }

      const result = typeof data === 'string' ? JSON.parse(data) : data

      if (!result.success) {
        allSuccess = false
      }

      results.push({ reservation_id: reservationId, ...result })
    }

    if (!allSuccess) {
      return NextResponse.json({
        success: false,
        message: 'Some reservations could not be completed',
        results,
      }, { status: 409 })
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'All reservations completed, stock decremented',
    })
  } catch (error) {
    console.error('Complete API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
