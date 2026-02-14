import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/reservations/cleanup
// Expires all stale reservations. Called by cron job or manual trigger.
export async function POST() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.rpc('cleanup_expired_reservations')

    if (error) {
      console.error('Cleanup error:', error)
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      )
    }

    const result = typeof data === 'string' ? JSON.parse(data) : data

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error('Cleanup API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - also allow GET for easy cron job integration
export async function GET() {
  return POST()
}
