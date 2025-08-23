"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react"
import { toast } from "sonner"
import { CartItem } from "@/types"

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (product: any, variant?: any) => void
  removeFromCart: (id: number | string) => void
  updateQuantity: (id: number | string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const lastAddedRef = useRef<{ item: string; time: number; toastId?: string }>({ item: "", time: 0 })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("deluxo-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("deluxo-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product: any, variant?: any) => {
    const itemPrice = variant ? variant.price : product.price
    const itemCash = variant ? variant.cash || product.cash : product.cash
    const itemId = variant ? `${product.id}-${variant.id}` : product.id
    
    // Prevent duplicate calls within 1000ms (increased from 500ms)
    const now = Date.now()
    const itemKey = `${itemId}-${itemPrice}`
    
    if (lastAddedRef.current.item === itemKey && now - lastAddedRef.current.time < 1000) {
      console.log('Duplicate call prevented for:', itemKey)
      return
    }
    
    // Dismiss any existing toast for this item
    if (lastAddedRef.current.toastId) {
      toast.dismiss(lastAddedRef.current.toastId)
    }
    
    lastAddedRef.current = { item: itemKey, time: now }
    
    const cartItem: CartItem = {
      id: itemId,
      title: product.title,
      subtitle: variant ? variant.name : product.subtitle,
      price: itemPrice,
      originalPrice: product.originalPrice,
      platform: product.platform,
      level: product.level,
      cash: itemCash,
      image: product.image,
      seller: product.seller || "Deluxo",
      rating: product.rating,
      reviews: product.reviews,
      quantity: 1,
      variant: variant
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId)
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        
        const toastId = toast.success(`${product.title} quantity updated in cart!`, {
          description: variant ? `${variant.name} - $${itemPrice}` : `$${itemPrice}`,
          duration: 3000,
          id: `cart-update-${itemId}-${now}`, // Unique ID to prevent duplicates
        })
        
        lastAddedRef.current.toastId = String(toastId)
        
        return updatedItems
      } else {
        // Add new item to cart
        const toastId = toast.success(`${product.title} added to cart!`, {
          description: variant ? `${variant.name} - $${itemPrice}` : `$${itemPrice}`,
          duration: 3000,
          id: `cart-add-${itemId}-${now}`, // Unique ID to prevent duplicates
          action: {
            label: "View Cart",
            onClick: () => setIsCartOpen(true),
          },
        })
        
        lastAddedRef.current.toastId = String(toastId)
        
        return [...prevItems, cartItem]
      }
    })
  }, [setIsCartOpen])

  const removeFromCart = (id: number | string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id)
      const updatedItems = prevItems.filter(item => item.id !== id)
      
      if (itemToRemove) {
        toast.success(`${itemToRemove.title} removed from cart`)
      }
      
      return updatedItems
    })
  }

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    toast.success("Cart cleared")
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const value: CartContextType = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  }

  return (
    <CartContext.Provider value={value}>
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
