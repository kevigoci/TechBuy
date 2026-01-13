"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import type { Product, ProductImage } from "@/types/database"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product & { product_images: ProductImage[] }
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { formatPrice } = useCurrency()
  const { locale } = useLanguage()

  const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url || product.product_images?.[0]?.image_url || '/placeholder.png'
  const name = locale === 'sq' ? product.name_sq : product.name_en
  const shortDesc = locale === 'sq' ? product.short_description_sq : product.short_description_en

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ ...product, product_images: product.product_images })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  const isWishlisted = isInWishlist(product.id)

  return (
    <Link href={`/products/${product.slug}`}>
      <div className={cn("product-card group", className)}>
        {/* Image */}
        <div className="relative aspect-square bg-slate-800 overflow-hidden">
          <Image
            src={primaryImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_on_sale && (
              <Badge className="badge-sale">Sale</Badge>
            )}
            {product.is_featured && (
              <Badge className="badge-hot">Hot</Badge>
            )}
            {!product.is_in_stock && (
              <Badge variant="secondary" className="bg-slate-700">Out of Stock</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 h-8 w-8 rounded-full bg-slate-900/80 hover:bg-slate-900",
              isWishlisted ? "text-red-500" : "text-slate-400 hover:text-red-500"
            )}
            onClick={handleToggleWishlist}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </Button>

          {/* Quick add button - shown on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.is_in_stock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-white">{product.rating_average.toFixed(1)}</span>
              <span className="text-xs text-slate-500">({product.rating_count})</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-medium text-white text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {name}
          </h3>

          {/* Short description */}
          {shortDesc && (
            <p className="text-xs text-slate-400 line-clamp-1 mb-2">{shortDesc}</p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-400">
              {formatPrice(product.price_all, product.price_eur)}
            </span>
            {product.is_on_sale && product.original_price_all && (
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(product.original_price_all, product.original_price_eur!)}
              </span>
            )}
          </div>

          {/* Stock status */}
          <p className={cn(
            "text-xs mt-2",
            product.is_in_stock ? "text-green-400" : "text-red-400"
          )}>
            {product.is_in_stock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  )
}
