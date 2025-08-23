"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  Shield,
  DollarSign,
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { Header } from "@/components/header"
import { CartModal } from "@/components/cart-modal"
import { products } from "@/components/product-grid"

// Get product data from the main product grid
const getProductById = (id: string) => {
  const product = products.find((p) => p.id === Number.parseInt(id))
  if (!product) return null

  // Add customer reviews based on product type
  const getReviewsForProduct = (productId: number) => {
    switch (productId) {
      case 1: // PC Money Boosting
        return [
          {
            id: 1,
            name: "MoneyBoostFan",
            rating: 5,
            comment: "Amazing PC money boost service! Got my 2 billion GTA$ in 15 minutes. Professional and secure!",
            date: "2025-01-15",
            verified: true,
          },
          {
            id: 2,
            name: "GTAMillionaire",
            rating: 5,
            comment: "Best purchase ever! Fast delivery and great customer support for PC!",
            date: "2025-01-14",
            verified: true,
          },
          {
            id: 3,
            name: "CashKing2025",
            rating: 5,
            comment: "Amazing service! Got my PC money boost quickly and safely. Will definitely use again!",
            date: "2025-01-13",
            verified: true,
          },
        ]
      case 2: // PC Modded Accounts
        return [
          {
            id: 1,
            name: "ModdedGamer88",
            rating: 5,
            comment: "Incredible PC modded account! Everything unlocked and billions in cash. Perfect service!",
            date: "2025-01-12",
            verified: true,
          },
          {
            id: 2,
            name: "PCMasterRace",
            rating: 5,
            comment: "The modded outfits and cars are insane! Best PC account I've ever bought.",
            date: "2025-01-11",
            verified: true,
          },
          {
            id: 3,
            name: "EliteGamer2025",
            rating: 4,
            comment: "Great PC modded account, delivery was instant and everything works perfectly.",
            date: "2025-01-10",
            verified: true,
          },
        ]
      case 3: // Console Money Boosting
        return [
          {
            id: 1,
            name: "ConsoleKing",
            rating: 5,
            comment: "Perfect console money boost! Works great on PS5, got 4 billion with modded cars!",
            date: "2025-01-09",
            verified: true,
          },
          {
            id: 2,
            name: "XboxGamer247",
            rating: 5,
            comment: "Excellent service for Xbox! The modded outfits and cars are amazing quality.",
            date: "2025-01-08",
            verified: true,
          },
          {
            id: 3,
            name: "PS4Legend",
            rating: 5,
            comment: "Best console boost service! Fast delivery and the modded content is incredible.",
            date: "2025-01-07",
            verified: true,
          },
        ]
      case 4: // Console Modded Accounts
        return [
          {
            id: 1,
            name: "ConsolePro",
            rating: 5,
            comment: "Amazing console modded account! Works perfectly on PS5 with all unlocks and modded content.",
            date: "2025-01-06",
            verified: true,
          },
          {
            id: 2,
            name: "XboxModder",
            rating: 5,
            comment: "Best console modded account ever! 10 billion cash and exclusive modded cars. Highly recommend!",
            date: "2025-01-05",
            verified: true,
          },
          {
            id: 3,
            name: "NextGenGamer",
            rating: 4,
            comment: "Great modded account for console. Everything works as described, fast delivery!",
            date: "2025-01-04",
            verified: true,
          },
        ]
      default:
        return []
    }
  }

  return {
    ...product,
    customerReviews: getReviewsForProduct(product.id)
  }
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, cartCount, setIsCartOpen, isCartOpen, cartItems, removeFromCart, updateQuantity } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const product = getProductById(params.id as string)
  
  if (!product) {
    return <div>Product not found</div>
  }
  
  const selectedPrice = product.variants?.[selectedVariant]?.price || product.price

  const formatCash = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  const handleAddToCart = (e?: React.MouseEvent) => {
    const selectedVariantData = product.variants?.[selectedVariant]
    addToCart(product, selectedVariantData)
    
    // Add visual feedback
    if (e) {
      const button = e.currentTarget as HTMLButtonElement
      button.style.transform = 'scale(0.95)'
      setTimeout(() => {
        button.style.transform = 'scale(1)'
      }, 150)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Product Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-accent/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
                {product.badge}
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {product.platform}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src={product.screenshots?.[currentImageIndex] || product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500/90 text-white">
                  <div className="w-2 h-2 rounded-full bg-white mr-2" />
                  Online
                </Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.screenshots?.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? "border-accent" : "border-border/50 hover:border-accent/50"
                  }`}
                >
                  <img
                    src={screenshot || "/placeholder.svg"}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{product.subtitle}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-medium text-accent">Sold by {product.seller}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Level</div>
                    <div className="text-lg font-semibold">{product.level}</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">In-Game Cash</div>
                    <div className="text-lg font-semibold">{formatCash(product.cash)}</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Select Package</h3>
              <div className="space-y-3">
                {product.variants?.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedVariant === index
                        ? "border-accent bg-accent/10"
                        : "border-border/50 hover:border-accent/50 bg-card/30"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg">{variant.name}</div>
                        <div className="text-muted-foreground">{variant.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${variant.price}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing & Purchase */}
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  {product.originalPrice && (
                    <div className="text-lg text-muted-foreground line-through">${product.originalPrice}</div>
                  )}
                  <div className="text-4xl font-bold text-foreground">${selectedPrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Delivery Time</div>
                  <div className="flex items-center gap-1 text-accent font-semibold">
                    <Clock className="w-4 h-4" />
                    5-30 minutes
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-lg py-6 shadow-lg transition-transform duration-150"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Secure payment
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  Buyer protection
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  24/7 support
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">What's Included</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Description</h3>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Customer Reviews ({product.reviews})
            </h3>
            <div className="space-y-4">
              {product.customerReviews?.slice(0, 4).map((review) => (
                <Card key={review.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.name}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Overall Rating Summary */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 mt-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{product.rating}</span>
                    <span className="text-muted-foreground">out of 5</span>
                  </div>
                  <p className="text-muted-foreground">Based on {product.reviews} verified reviews</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      </div>
    </div>
  )
}
