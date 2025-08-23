"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Shield, DollarSign, Check, X, ShoppingCart, User, Calendar } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface Product {
  id: number
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  platform: string
  level: number
  cash: number
  image: string
  seller: string
  rating: number
  reviews: number
  isOnline: boolean
  badge?: string
  description?: string
  features?: string[]
  screenshots?: string[]
  customerReviews?: {
    id: number
    name: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }[]
  variants?: {
    id: string
    name: string
    price: number
    description: string
    features: string[]
  }[]
}

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, variant?: any) => void
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const formatCash = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  const defaultReviews = [
    {
      id: 1,
      name: "MoneyMaster2024",
      rating: 5,
      comment: "Deluxo delivered my 3 billion GTA$ in just 10 minutes! Incredible service, will definitely buy again!",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      name: "GTALegend",
      rating: 5,
      comment:
        "Best modded account purchase ever! Deluxo provided everything - rare cars, properties, and billions in cash!",
      date: "2024-01-12",
      verified: true,
    },
    {
      id: 3,
      name: "CashBoostPro",
      rating: 5,
      comment:
        "Amazing money boosting service from Deluxo! Safe, fast, and professional. Got my money without any issues!",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: 4,
      name: "ModdedKing99",
      rating: 5,
      comment:
        "Deluxo's modded accounts are insane! All the rare vehicles, max stats, and unlimited money. Worth every penny!",
      date: "2024-01-08",
      verified: true,
    },
    {
      id: 5,
      name: "RichPlayer88",
      rating: 5,
      comment:
        "Purchased money boost from Deluxo and got 4 billion GTA$ instantly! No account sharing needed. Highly recommend!",
      date: "2024-01-05",
      verified: true,
    },
    {
      id: 6,
      name: "ConsoleGamer2024",
      rating: 5,
      comment:
        "Deluxo's console services are perfect! Got my modded account on Xbox with everything unlocked. Great experience!",
      date: "2024-01-03",
      verified: true,
    },
    {
      id: 7,
      name: "VIPCustomer",
      rating: 5,
      comment:
        "Best marketplace for GTA services! Deluxo delivered exactly what they promised. Fast, secure, and reliable!",
      date: "2024-01-01",
      verified: true,
    },
    {
      id: 8,
      name: "PCGamer2024",
      rating: 5,
      comment:
        "Deluxo's PC money boost is incredible! Got billions in minutes and can finally enjoy the game without grinding!",
      date: "2023-12-28",
      verified: true,
    },
  ]

  const defaultScreenshots = [
    "/luxury-cars-display.png",
    "/rare-fortnite-account.png",
    "/minecraft-premium-cape.png",
    "/valorant-immortal-skins.png",
  ]

  const reviews = product.customerReviews || defaultReviews
  const screenshots = product.screenshots || defaultScreenshots

  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
      }, 4000) // Change review every 4 seconds
      return () => clearInterval(interval)
    }
  }, [reviews.length])

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0])
    }
  }, [product.variants])

  const getCurrentPrice = () => {
    return selectedVariant ? selectedVariant.price : product.price
  }

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto bg-card/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-heading font-bold text-foreground">{product.title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Product Images & Screenshots */}
          <div className="space-y-2">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={300}
                height={150}
                className="w-full h-36 object-cover rounded-lg"
              />
              {product.badge && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-xs px-2 py-1">
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1">
              {screenshots.slice(0, 3).map((screenshot, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-cover rounded border border-border/50"
                  />
                </div>
              ))}
            </div>

            {/* Product Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card/50 rounded-lg p-2 border border-border/50">
                <div className="flex items-center gap-1 mb-1">
                  <Shield className="w-3 h-3 text-accent" />
                  <span className="text-xs font-medium">Level</span>
                </div>
                <span className="text-sm font-bold text-foreground">{product.level}</span>
              </div>
              <div className="bg-card/50 rounded-lg p-2 border border-border/50">
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3 text-accent" />
                  <span className="text-xs font-medium">In-Game Cash</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {formatCash(selectedVariant?.cash || product.cash)}
                </span>
              </div>
            </div>
          </div>

          {/* Product Details & Purchase */}
          <div className="space-y-3">
            {/* Platform & Rating */}
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-2 py-1 text-xs">
                {product.platform}
              </Badge>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-sm">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-xs">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-accent">Sold by {product.seller}</span>
              </div>
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Select Package</h3>
                <div className="grid grid-cols-1 gap-1">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-2 rounded border cursor-pointer transition-all ${
                        selectedVariant?.id === variant.id
                          ? "border-accent bg-accent/10"
                          : "border-border/50 hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-xs">{variant.name}</span>
                        <span className="font-bold text-accent text-xs">${variant.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{variant.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-card/50 rounded-lg p-3 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through block">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xl font-bold text-foreground">${getCurrentPrice().toFixed(2)}</span>
                </div>
                {product.originalPrice && (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                    Save ${(product.originalPrice - getCurrentPrice()).toFixed(2)}
                  </Badge>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-sm py-2 mb-2"
              >
                <ShoppingCart className="w-3 h-3 mr-2" />
                Add to Cart
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                <span>Secure payment • Buyer protection • 24/7 support</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-sm mb-2">What's Included</h3>
              <div className="grid grid-cols-1 gap-1">
                {(selectedVariant?.features || product.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Description */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Description</h3>
          <p className="text-muted-foreground leading-relaxed text-xs">
            {selectedVariant?.description || product.description || product.subtitle}
          </p>
        </div>

        <Separator className="my-3" />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Customer Reviews</h3>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{product.rating}</span>
              <span className="text-muted-foreground text-xs">({reviews.length} reviews)</span>
            </div>
          </div>

          {/* Featured Moving Review */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={review.id} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-3 border border-accent/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{review.name}</span>
                            {review.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-500/10 text-green-500 border-green-500/20"
                              >
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-2 h-2 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {review.date}
                      </div>
                    </div>
                    <p className="text-foreground text-xs italic">"{review.comment}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Review indicators */}
            <div className="flex justify-center gap-1 mt-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentReviewIndex ? "bg-accent w-3" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All Reviews Grid */}
          <div className="grid grid-cols-1 gap-2">
            {reviews.slice(0, 2).map((review) => (
              <div key={review.id} className="bg-card/30 rounded p-2 border border-border/30">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="font-medium text-xs">{review.name}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {review.date}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-2 h-2 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-xs">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
