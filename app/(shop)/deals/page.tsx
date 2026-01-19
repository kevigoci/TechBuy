"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { getProductsOnSale } from "@/lib/products-data"
import {
  Heart,
  ShoppingCart,
  Flame,
  Clock,
  Tag,
  Percent,
  ArrowRight,
  Timer,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DealsPage() {
  const { locale } = useLanguage()
  const { formatPrice } = useCurrency()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addItem } = useCart()

  const dealsProducts = getProductsOnSale()

  const handleAddToCart = (e: React.MouseEvent, product: typeof dealsProducts[0]) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: locale === "sq" ? product.name_sq : product.name_en,
      price: product.price_all,
      price_eur: product.price_eur,
      image: product.product_images[0]?.image_url || "/placeholder.png",
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Flame className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">
                {locale === "sq" ? "Oferta të Limituara" : "Limited Time Offers"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {locale === "sq" ? "Ofertat e Nxehta" : "Hot Deals"}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {locale === "sq"
                ? "Zbritje të mëdha në produktet më të mira elektronike"
                : "Huge discounts on the best electronics"}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{dealsProducts.length}</div>
                <div className="text-white/80 text-sm">
                  {locale === "sq" ? "Produkte në Ofertë" : "Products on Sale"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300">50%</div>
                <div className="text-white/80 text-sm">
                  {locale === "sq" ? "Zbritje Maksimale" : "Max Discount"}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-4xl font-bold text-white">
                  <Timer className="w-8 h-8 mr-2" />
                  24h
                </div>
                <div className="text-white/80 text-sm">
                  {locale === "sq" ? "Kohë e Mbetur" : "Time Left"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background"/>
          </svg>
        </div>
      </section>

      {/* Deals Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <Tag className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold mb-1">
                {locale === "sq" ? "Zbritje Flash" : "Flash Sales"}
              </h3>
              <p className="text-white/80 text-sm">
                {locale === "sq" ? "Deri në 30% zbritje" : "Up to 30% off"}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <Zap className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold mb-1">
                {locale === "sq" ? "Oferta Ditore" : "Daily Deals"}
              </h3>
              <p className="text-white/80 text-sm">
                {locale === "sq" ? "Çmime speciale çdo ditë" : "Special prices every day"}
              </p>
            </div>
            <div className="bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl p-6 text-white">
              <Percent className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold mb-1">
                {locale === "sq" ? "Oferta Ekskluzive" : "Exclusive Offers"}
              </h3>
              <p className="text-white/80 text-sm">
                {locale === "sq" ? "Vetëm për ju" : "Just for you"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {locale === "sq" ? "Të gjitha Ofertat" : "All Deals"}
            </h2>
            <Badge variant="secondary" className="text-sm">
              {dealsProducts.length} {locale === "sq" ? "produkte" : "products"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {dealsProducts.map((product) => {
              const discount = product.original_price_all
                ? Math.round(((product.original_price_all - product.price_all) / product.original_price_all) * 100)
                : 0

              return (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 group h-full overflow-hidden hover:border-violet-500/50">
                    <div className="relative aspect-square bg-secondary p-4">
                      <Image
                        src={product.product_images[0]?.image_url || '/placeholder.png'}
                        alt={locale === "sq" ? product.name_sq : product.name_en}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Discount Badge */}
                      <Badge className="absolute top-2 left-2 bg-violet-500 text-white text-sm font-bold">
                        -{discount}%
                      </Badge>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        className={cn(
                          "absolute top-2 right-2 w-10 h-10 rounded-full bg-white dark:bg-card shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110",
                          isInWishlist(product.id) ? "text-violet-500" : "text-gray-400 hover:text-violet-500"
                        )}
                      >
                        <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current")} />
                      </button>

                      {/* Add to Cart Button (appears on hover) */}
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="absolute bottom-2 left-2 right-2 bg-violet-500 hover:bg-violet-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {locale === "sq" ? "Shto në Shportë" : "Add to Cart"}
                      </Button>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                      <h3 className="text-sm font-medium text-foreground mb-3 line-clamp-2 min-h-[40px] group-hover:text-violet-500 transition-colors">
                        {locale === "sq" ? product.name_sq : product.name_en}
                      </h3>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-violet-500">
                            {formatPrice(product.price_all, product.price_eur)}
                          </span>
                        </div>
                        {product.original_price_all && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.original_price_all, product.original_price_eur || 0)}
                            </span>
                            <span className="text-xs text-green-500 font-medium">
                              {locale === "sq" ? "Kurse" : "Save"} {formatPrice(product.original_price_all - product.price_all, (product.original_price_eur || 0) - product.price_eur)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

          {dealsProducts.length === 0 && (
            <div className="text-center py-16">
              <Flame className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {locale === "sq" ? "Nuk ka oferta për momentin" : "No deals available"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === "sq" ? "Kthehuni më vonë për oferta të reja" : "Check back later for new deals"}
              </p>
              <Link href="/products">
                <Button className="bg-violet-500 hover:bg-violet-600 text-white">
                  {locale === "sq" ? "Shiko të gjitha produktet" : "Browse All Products"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {locale === "sq" ? "Mos humb asnjë ofertë!" : "Never miss a deal!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {locale === "sq"
                ? "Regjistrohu për të marrë njoftimet për ofertat e reja"
                : "Sign up to get notified about new deals"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={locale === "sq" ? "Email-i juaj" : "Your email"}
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet-500"
              />
              <Button className="bg-violet-500 hover:bg-violet-600 text-white px-6">
                {locale === "sq" ? "Njoftomë" : "Notify Me"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
