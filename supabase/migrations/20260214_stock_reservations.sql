-- ============================================================================
-- STOCK RESERVATION SYSTEM
-- Holds inventory for customers during checkout (10-minute window)
-- ============================================================================

-- 1. Create the stock_reservations table
CREATE TABLE IF NOT EXISTS public.stock_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT, -- for guest users
  quantity INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired', 'released')),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for fast lookups
CREATE INDEX idx_stock_reservations_product ON public.stock_reservations(product_id, status);
CREATE INDEX idx_stock_reservations_variant ON public.stock_reservations(variant_id, status) WHERE variant_id IS NOT NULL;
CREATE INDEX idx_stock_reservations_expires ON public.stock_reservations(expires_at) WHERE status = 'active';
CREATE INDEX idx_stock_reservations_session ON public.stock_reservations(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_stock_reservations_user ON public.stock_reservations(user_id) WHERE user_id IS NOT NULL;

-- 3. Function: Reserve stock atomically (prevents overselling)
-- Uses row-level locking (FOR UPDATE) to prevent race conditions
CREATE OR REPLACE FUNCTION public.reserve_stock(
  p_product_id UUID,
  p_variant_id UUID DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_quantity INTEGER DEFAULT 1,
  p_duration_minutes INTEGER DEFAULT 10
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_available INTEGER;
  v_reserved INTEGER;
  v_actual_available INTEGER;
  v_reservation_id UUID;
  v_expires_at TIMESTAMPTZ;
  v_existing_reservation UUID;
BEGIN
  -- First, expire any old reservations
  UPDATE public.stock_reservations
  SET status = 'expired', updated_at = NOW()
  WHERE status = 'active' AND expires_at < NOW();

  -- Check if this user/session already has an active reservation for this product
  IF p_user_id IS NOT NULL THEN
    SELECT id INTO v_existing_reservation
    FROM public.stock_reservations
    WHERE product_id = p_product_id
      AND COALESCE(variant_id, '00000000-0000-0000-0000-000000000000') = COALESCE(p_variant_id, '00000000-0000-0000-0000-000000000000')
      AND user_id = p_user_id
      AND status = 'active'
    LIMIT 1;
  ELSIF p_session_id IS NOT NULL THEN
    SELECT id INTO v_existing_reservation
    FROM public.stock_reservations
    WHERE product_id = p_product_id
      AND COALESCE(variant_id, '00000000-0000-0000-0000-000000000000') = COALESCE(p_variant_id, '00000000-0000-0000-0000-000000000000')
      AND session_id = p_session_id
      AND status = 'active'
    LIMIT 1;
  END IF;

  -- If already reserved by this user, extend the reservation
  IF v_existing_reservation IS NOT NULL THEN
    v_expires_at := NOW() + (p_duration_minutes || ' minutes')::INTERVAL;
    UPDATE public.stock_reservations
    SET expires_at = v_expires_at, updated_at = NOW()
    WHERE id = v_existing_reservation;

    RETURN json_build_object(
      'success', TRUE,
      'reservation_id', v_existing_reservation,
      'expires_at', v_expires_at,
      'message', 'Reservation extended'
    );
  END IF;

  -- Lock the product row to prevent concurrent modifications
  IF p_variant_id IS NOT NULL THEN
    SELECT stock_quantity INTO v_available
    FROM public.product_variants
    WHERE id = p_variant_id
    FOR UPDATE;
  ELSE
    SELECT stock_quantity INTO v_available
    FROM public.products
    WHERE id = p_product_id
    FOR UPDATE;
  END IF;

  IF v_available IS NULL THEN
    RETURN json_build_object(
      'success', FALSE,
      'message', 'Product not found'
    );
  END IF;

  -- Count currently active reservations for this product/variant
  SELECT COALESCE(SUM(quantity), 0) INTO v_reserved
  FROM public.stock_reservations
  WHERE product_id = p_product_id
    AND COALESCE(variant_id, '00000000-0000-0000-0000-000000000000') = COALESCE(p_variant_id, '00000000-0000-0000-0000-000000000000')
    AND status = 'active';

  -- Calculate actual available stock (total - reserved)
  v_actual_available := v_available - v_reserved;

  IF v_actual_available < p_quantity THEN
    RETURN json_build_object(
      'success', FALSE,
      'message', 'Not enough stock available',
      'available', v_actual_available,
      'requested', p_quantity
    );
  END IF;

  -- Create the reservation
  v_expires_at := NOW() + (p_duration_minutes || ' minutes')::INTERVAL;

  INSERT INTO public.stock_reservations (product_id, variant_id, user_id, session_id, quantity, status, expires_at)
  VALUES (p_product_id, p_variant_id, p_user_id, p_session_id, p_quantity, 'active', v_expires_at)
  RETURNING id INTO v_reservation_id;

  RETURN json_build_object(
    'success', TRUE,
    'reservation_id', v_reservation_id,
    'expires_at', v_expires_at,
    'message', 'Stock reserved successfully'
  );
END;
$$;

-- 4. Function: Complete reservation (after successful payment)
-- Decrements actual stock_quantity and marks reservation as completed
CREATE OR REPLACE FUNCTION public.complete_reservation(
  p_reservation_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_reservation RECORD;
BEGIN
  -- Get and lock the reservation
  SELECT * INTO v_reservation
  FROM public.stock_reservations
  WHERE id = p_reservation_id AND status = 'active'
  FOR UPDATE;

  IF v_reservation IS NULL THEN
    RETURN json_build_object(
      'success', FALSE,
      'message', 'Reservation not found or already processed'
    );
  END IF;

  -- Check if expired
  IF v_reservation.expires_at < NOW() THEN
    UPDATE public.stock_reservations
    SET status = 'expired', updated_at = NOW()
    WHERE id = p_reservation_id;

    RETURN json_build_object(
      'success', FALSE,
      'message', 'Reservation has expired'
    );
  END IF;

  -- Decrement stock from the product/variant
  IF v_reservation.variant_id IS NOT NULL THEN
    UPDATE public.product_variants
    SET stock_quantity = stock_quantity - v_reservation.quantity
    WHERE id = v_reservation.variant_id AND stock_quantity >= v_reservation.quantity;
  ELSE
    UPDATE public.products
    SET stock_quantity = stock_quantity - v_reservation.quantity,
        is_in_stock = CASE WHEN stock_quantity - v_reservation.quantity <= 0 THEN FALSE ELSE TRUE END
    WHERE id = v_reservation.product_id AND stock_quantity >= v_reservation.quantity;
  END IF;

  -- Mark reservation as completed
  UPDATE public.stock_reservations
  SET status = 'completed', updated_at = NOW()
  WHERE id = p_reservation_id;

  RETURN json_build_object(
    'success', TRUE,
    'message', 'Reservation completed, stock decremented'
  );
END;
$$;

-- 5. Function: Release reservation (user cancels or leaves checkout)
CREATE OR REPLACE FUNCTION public.release_reservation(
  p_reservation_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_reservation RECORD;
BEGIN
  SELECT * INTO v_reservation
  FROM public.stock_reservations
  WHERE id = p_reservation_id AND status = 'active'
  FOR UPDATE;

  IF v_reservation IS NULL THEN
    RETURN json_build_object(
      'success', FALSE,
      'message', 'Reservation not found or already processed'
    );
  END IF;

  -- Mark as released - stock is automatically available again
  UPDATE public.stock_reservations
  SET status = 'released', updated_at = NOW()
  WHERE id = p_reservation_id;

  RETURN json_build_object(
    'success', TRUE,
    'message', 'Reservation released, stock is available again'
  );
END;
$$;

-- 6. Function: Cleanup expired reservations (called by cron or API)
CREATE OR REPLACE FUNCTION public.cleanup_expired_reservations()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE public.stock_reservations
  SET status = 'expired', updated_at = NOW()
  WHERE status = 'active' AND expires_at < NOW();

  GET DIAGNOSTICS v_count = ROW_COUNT;

  RETURN json_build_object(
    'success', TRUE,
    'expired_count', v_count,
    'message', v_count || ' reservations expired'
  );
END;
$$;

-- 7. Function: Check available stock (considers active reservations)
CREATE OR REPLACE FUNCTION public.get_available_stock(
  p_product_id UUID,
  p_variant_id UUID DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_stock INTEGER;
  v_reserved INTEGER;
  v_available INTEGER;
BEGIN
  -- Clean up expired first
  UPDATE public.stock_reservations
  SET status = 'expired', updated_at = NOW()
  WHERE status = 'active' AND expires_at < NOW()
    AND product_id = p_product_id;

  -- Get total stock
  IF p_variant_id IS NOT NULL THEN
    SELECT stock_quantity INTO v_total_stock
    FROM public.product_variants
    WHERE id = p_variant_id;
  ELSE
    SELECT stock_quantity INTO v_total_stock
    FROM public.products
    WHERE id = p_product_id;
  END IF;

  -- Get reserved quantity
  SELECT COALESCE(SUM(quantity), 0) INTO v_reserved
  FROM public.stock_reservations
  WHERE product_id = p_product_id
    AND COALESCE(variant_id, '00000000-0000-0000-0000-000000000000') = COALESCE(p_variant_id, '00000000-0000-0000-0000-000000000000')
    AND status = 'active';

  v_available := GREATEST(v_total_stock - v_reserved, 0);

  RETURN json_build_object(
    'total_stock', v_total_stock,
    'reserved', v_reserved,
    'available', v_available
  );
END;
$$;

-- 8. RLS policies
ALTER TABLE public.stock_reservations ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to see their own reservations
CREATE POLICY "Users can view own reservations"
  ON public.stock_reservations FOR SELECT
  USING (auth.uid() = user_id);

-- Allow service role full access (used by API routes)
CREATE POLICY "Service role full access"
  ON public.stock_reservations FOR ALL
  USING (TRUE)
  WITH CHECK (TRUE);

-- 9. Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.reserve_stock TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.complete_reservation TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.release_reservation TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_expired_reservations TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_available_stock TO anon, authenticated;

-- 10. Optional: Enable pg_cron for automatic cleanup (run in Supabase SQL editor)
-- NOTE: pg_cron must be enabled in your Supabase project dashboard first.
-- Then run: SELECT cron.schedule('cleanup-expired-reservations', '*/2 * * * *', 'SELECT public.cleanup_expired_reservations()');
-- This runs every 2 minutes to expire stale reservations.
