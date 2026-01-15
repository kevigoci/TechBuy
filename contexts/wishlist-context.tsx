"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './auth-context'
import type { Product, ProductImage } from '@/types/database'
import { toast } from 'sonner'

interface WishlistItem {
  id: string
  product_id: string
  product: Product & { product_images: ProductImage[] }
}

interface WishlistContextType {
  items: WishlistItem[]
  isLoading: boolean
  isInWishlist: (productId: string) => boolean
  addToWishlist: (productId: string) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
  toggleWishlist: (productId: string) => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  // Create a Set of product IDs for O(1) lookup
  const wishlistIds = useMemo(() =>
    new Set(items.map(item => item.product_id)),
    [items]
  )

  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setItems([])
      setIsLoading(false)
    }
  }, [user])

  const fetchWishlist = async () => {
    if (!user) return

    setIsLoading(true)
    const { data, error } = await supabase
      .from('wishlists')
      .select(`
        id,
        product_id,
        product:products (
          *,
          product_images (*)
        )
      `)
      .eq('user_id', user.id)

    if (!error && data) {
      setItems(data as unknown as WishlistItem[])
    }
    setIsLoading(false)
  }

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlistIds.has(productId)
  }, [wishlistIds])

  const addToWishlist = useCallback(async (productId: string) => {
    if (!user) {
      toast.error('Please sign in to add items to your wishlist')
      return
    }

    const { error } = await supabase
      .from('wishlists')
      .insert({ user_id: user.id, product_id: productId })

    if (error) {
      toast.error('Failed to add to wishlist')
      return
    }

    await fetchWishlist()
    toast.success('Added to wishlist')
  }, [user])

  const removeFromWishlist = useCallback(async (productId: string) => {
    if (!user) return

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)

    if (error) {
      toast.error('Failed to remove from wishlist')
      return
    }

    setItems(prev => prev.filter(item => item.product_id !== productId))
    toast.success('Removed from wishlist')
  }, [user])

  const toggleWishlist = useCallback(async (productId: string) => {
    if (wishlistIds.has(productId)) {
      await removeFromWishlist(productId)
    } else {
      await addToWishlist(productId)
    }
  }, [wishlistIds, removeFromWishlist, addToWishlist])

  const contextValue = useMemo(() => ({
    items,
    isLoading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  }), [items, isLoading, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist])

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
