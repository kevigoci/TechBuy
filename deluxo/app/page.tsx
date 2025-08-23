"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Filters } from "@/components/filters"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { CartModal } from "@/components/cart-modal"
import LiveChat from "@/components/live-chat"

interface CartItem {
  id: number
  title: string
  price: string
  image: string
  quantity: number
}

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [filters, setFilters] = useState({
    platforms: [] as string[],
    accountTypes: [] as string[],
    priceRange: [0, 200] as [number, number],
  })

  const addToCart = (product: any) => {
    console.log("[v0] Adding to cart:", { product })

    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      console.log("[v0] Item exists, updating quantity")
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      console.log("[v0] New item, adding to cart")
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price.toString(), // Remove dollar sign formatting
        image: product.image,
        quantity: 1,
      }
      console.log("[v0] New cart item:", newItem)
      setCartItems([...cartItems, newItem])
    }

    console.log("[v0] Cart items after update:", cartItems)
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <section id="categories" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            GTA V Account Categories
          </h2>
        </section>

        <section id="products">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <Filters onFiltersChange={setFilters} />
            </aside>
            <div className="flex-1">
              <ProductGrid onAddToCart={addToCart} filters={filters} />
            </div>
          </div>
        </section>
      </main>

      <Testimonials />

      <section id="support">
        <Footer />
      </section>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <LiveChat />
    </div>
  )
}
