"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, DollarSign, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

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
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
  onProductClick?: (product: Product) => void
}

export function ProductCard({ product, viewMode, onProductClick }: ProductCardProps) {
  const router = useRouter()
  const formatCash = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}M`
    }
    return `${amount.toLocaleString()}`
  }

  const displayProduct = { ...product, seller: "Deluxo" }

  const handleCardClick = () => {
    router.push(`/product/${displayProduct.id}`)
  }

  if (viewMode === "list") {
    return (
      <Card
        className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={handleCardClick}
      >
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="relative w-40 h-24 flex-shrink-0">
              <img
                src={displayProduct.image || "/placeholder.svg"}
                alt={displayProduct.title}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              {displayProduct.badge && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-xs shadow-lg">
                  {displayProduct.badge}
                </Badge>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-accent transition-colors">
                    {displayProduct.title}
                  </h3>
                  <p className="text-muted-foreground truncate mb-3">{displayProduct.subtitle}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      {displayProduct.platform}
                    </Badge>
                    <span>Level {displayProduct.level}</span>
                    <span>{formatCash(displayProduct.cash)}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-3">
                    {displayProduct.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {displayProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="font-bold text-xl text-foreground">{displayProduct.price.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-accent/50 hover:bg-accent/10 bg-transparent">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{displayProduct.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({displayProduct.reviews} reviews)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-accent">{displayProduct.seller}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={displayProduct.image || "/placeholder.svg"}
            alt={displayProduct.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {displayProduct.badge && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-lg">
              {displayProduct.badge}
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              {displayProduct.platform}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{displayProduct.rating}</span>
            </div>
          </div>

          <h3 className="font-semibold text-lg text-foreground mb-2 truncate group-hover:text-accent transition-colors">
            {displayProduct.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{displayProduct.subtitle}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Level {displayProduct.level}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{formatCash(displayProduct.cash)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-accent">{displayProduct.seller}</span>
            </div>
            <span className="text-sm text-muted-foreground">({displayProduct.reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {displayProduct.originalPrice && (
                <span className="text-sm text-muted-foreground line-through block">
                  {displayProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="font-bold text-xl text-foreground">{displayProduct.price.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-accent/50 hover:bg-accent/10 bg-transparent">
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
