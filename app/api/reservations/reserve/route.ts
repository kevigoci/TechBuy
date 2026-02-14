import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/reservations/reserve
// Reserves stock for a customer during checkout
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, session_id } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No items provided' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get current user (optional - guests use session_id)
    const { data: { user } } = await supabase.auth.getUser()

    const reservations: { reservation_id: string; product_id: string; variant_id: string | null; expires_at: string }[] = []
    const failures: { product_id: string; variant_id: string | null; message: string }[] = []

    // Reserve each item atomically
    for (const item of items) {
      const { data, error } = await supabase.rpc('reserve_stock', {
        p_product_id: item.product_id,
        p_variant_id: item.variant_id || null,
        p_user_id: user?.id || null,
        p_session_id: !user ? (session_id || null) : null,
        p_quantity: item.quantity || 1,
        p_duration_minutes: 10,
      })

      if (error) {
        console.error('Reserve stock error:', error)
        failures.push({
          product_id: item.product_id,
          variant_id: item.variant_id || null,
          message: error.message,
        })
        continue
      }

      const result = typeof data === 'string' ? JSON.parse(data) : data

      if (result.success) {
        reservations.push({
          reservation_id: result.reservation_id,
          product_id: item.product_id,
          variant_id: item.variant_id || null,
          expires_at: result.expires_at,
        })
      } else {
        failures.push({
          product_id: item.product_id,
          variant_id: item.variant_id || null,
          message: result.message,
        })
      }
    }

    // If any reservations failed, release the ones that succeeded
    if (failures.length > 0 && reservations.length > 0) {
      // Partial failure - release all successful reservations
      for (const res of reservations) {
        await supabase.rpc('release_reservation', {
          p_reservation_id: res.reservation_id,
        })
      }

      return NextResponse.json({
        success: false,
        message: 'Some items are no longer available',
        failures,
      }, { status: 409 })
    }

    if (failures.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Items are no longer available',
        failures,
      }, { status: 409 })
    }

    return NextResponse.json({
      success: true,
      reservations,
      expires_at: reservations[0]?.expires_at,
      message: 'Stock reserved successfully',
    })
  } catch (error) {
    console.error('Reserve API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
