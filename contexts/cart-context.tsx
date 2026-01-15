"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useRef, useMemo } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import type { Product, ProductVariant, ProductImage } from "@/types/database"

export interface CartItem {
  id: string
  product_id: string
  variant_id: string | null
  quantity: number
  product: Product & { product_images: ProductImage[] }
  variant: ProductVariant | null
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isLoading: boolean
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (product: Product & { product_images: ProductImage[] }, variant?: ProductVariant | null, quantity?: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getItemPrice: (item: CartItem, currency: 'ALL' | 'EUR') => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Generate a session ID for guest users
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem('cart_session_id')
  if (!sessionId) {
    sessionId = 'guest_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    localStorage.setItem('cart_session_id', sessionId)
  }
  return sessionId
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const lastAddedRef = useRef<{ item: string; time: number }>({ item: "", time: 0 })
  const supabase = createClient()

  // Check auth state
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUserId(session?.user?.id ?? null)
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      const newUserId = session?.user?.id ?? null
      if (newUserId !== userId) {
        setUserId(newUserId)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load cart from localStorage (guest cart)
  useEffect(() => {
    loadCart()
  }, [userId])

  const loadCart = async () => {
    setIsLoading(true)

    // For now, use localStorage for both guests and logged-in users
    // This can be enhanced to sync with Supabase when connected
    const savedCart = localStorage.getItem('techbuy-cart-v2')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error('Error loading cart:', error)
        setItems([])
      }
    }

    setIsLoading(false)
  }

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('techbuy-cart-v2', JSON.stringify(items))
    }
  }, [items, isLoading])

  const addToCart = useCallback(async (
    product: Product & { product_images: ProductImage[] },
    variant?: ProductVariant | null,
    quantity: number = 1
  ) => {
    const itemKey = variant ? `${product.id}-${variant.id}` : product.id
    const now = Date.now()

    // Prevent duplicate calls within 300ms (reduced from 1000ms for better responsiveness)
    if (lastAddedRef.current.item === itemKey && now - lastAddedRef.current.time < 300) {
      return
    }
    lastAddedRef.current = { item: itemKey, time: now }

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.product_id === product.id && item.variant_id === (variant?.id ?? null)
      )

      if (existingIndex >= 0) {
        // Update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        }

        toast.success('Cart updated', {
          description: `${product.name_en} quantity increased`
        })

        return updatedItems
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${variant?.id ?? 'default'}-${Date.now()}`,
          product_id: product.id,
          variant_id: variant?.id ?? null,
          quantity,
          product,
          variant: variant ?? null
        }

        toast.success('Added to cart', {
          description: product.name_en,
          action: {
            label: 'View Cart',
            onClick: () => setIsCartOpen(true)
          }
        })

        return [...prevItems, newItem]
      }
    })
  }, [])

  const removeFromCart = useCallback(async (itemId: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === itemId)
      if (item) {
        toast.success('Removed from cart', {
          description: item.product.name_en
        })
      }
      return prevItems.filter(i => i.id !== itemId)
    })
  }, [])

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(async () => {
    setItems([])
    toast.success('Cart cleared')
  }, [])

  const getItemPrice = (item: CartItem, currency: 'ALL' | 'EUR'): number => {
    if (item.variant) {
      return currency === 'ALL' ? item.variant.price_all : item.variant.price_eur
    }
    return currency === 'ALL' ? item.product.price_all : item.product.price_eur
  }

  const itemCount = useMemo(() =>
    items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  // Calculate subtotal in ALL (default)
  const subtotal = useMemo(() =>
    items.reduce((sum, item) => {
      const price = item.variant ? item.variant.price_all : item.product.price_all
      return sum + (price * item.quantity)
    }, 0),
    [items]
  )

  const contextValue = useMemo(() => ({
    items,
    itemCount,
    subtotal,
    isLoading,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemPrice
  }), [items, itemCount, subtotal, isLoading, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart])

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
