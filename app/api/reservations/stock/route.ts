import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/reservations/stock?product_id=xxx&variant_id=yyy
// Returns available stock considering active reservations
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('product_id')
    const variantId = searchParams.get('variant_id')

    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'product_id is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.rpc('get_available_stock', {
      p_product_id: productId,
      p_variant_id: variantId || null,
    })

    if (error) {
      console.error('Get stock error:', error)
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
    console.error('Stock API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
