"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
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

  const isInWishlist = (productId: string): boolean => {
    return items.some(item => item.product_id === productId)
  }

  const addToWishlist = async (productId: string) => {
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
  }

  const removeFromWishlist = async (productId: string) => {
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

    setItems(items.filter(item => item.product_id !== productId))
    toast.success('Removed from wishlist')
  }

  const toggleWishlist = async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId)
    } else {
      await addToWishlist(productId)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        isLoading,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
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
