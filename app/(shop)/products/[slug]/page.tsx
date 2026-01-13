"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
  Package
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getProductBySlug, getRelatedProducts, Product } from "@/lib/products-data"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { locale, t } = useLanguage()
  const { formatPrice } = useCurrency()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const slug = params.slug as string
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {locale === 'sq' ? 'Produkti nuk u gjet' : 'Product not found'}
        </h1>
        <p className="text-gray-500 mb-6">
          {locale === 'sq' ? 'Produkti që kërkoni nuk ekziston ose është hequr.' : 'The product you are looking for does not exist or has been removed.'}
        </p>
        <Link href="/products">
          <Button className="bg-red-500 hover:bg-red-600">
            {locale === 'sq' ? 'Shiko produktet' : 'Browse products'}
          </Button>
        </Link>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(product, 4)
  const primaryImage = product.product_images?.[selectedImageIndex]?.image_url || product.product_images?.[0]?.image_url || '/placeholder.png'

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(
      locale === 'sq'
        ? `${quantity} artikuj u shtuan në shportë`
        : `${quantity} item${quantity > 1 ? 's' : ''} added to cart`
    )
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    router.push('/checkout')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">{t("common.home")}</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-gray-900">{t("common.products")}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 truncate max-w-xs">
          {locale === 'sq' ? product.name_sq : product.name_en}
        </span>
      </nav>

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={primaryImage}
              alt={locale === 'sq' ? product.name_sq : product.name_en}
              fill
              className="object-cover"
              priority
            />
            {product.is_on_sale && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1">
                {locale === 'sq' ? 'Ofertë' : 'Sale'}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-4 right-4 h-10 w-10 rounded-full bg-white shadow-md",
                isInWishlist(product.id) ? "text-red-500" : "text-gray-400"
              )}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current")} />
            </Button>
          </div>

          {/* Thumbnail Gallery */}
          {product.product_images && product.product_images.length > 1 && (
            <div className="flex gap-3">
              {product.product_images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImageIndex === index ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Image
                    src={img.image_url}
                    alt={`${locale === 'sq' ? product.name_sq : product.name_en} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'sq' ? product.name_sq : product.name_en}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(product.rating_average)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-gray-900 font-medium">{product.rating_average}</span>
              <span className="text-gray-500">({product.rating_count} {locale === 'sq' ? 'vlerësime' : 'reviews'})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-red-500">
                {formatPrice(product.price_all, product.price_eur)}
              </span>
              {product.is_on_sale && product.original_price_all && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.original_price_all, product.original_price_eur!)}
                </span>
              )}
              {product.is_on_sale && product.original_price_all && (
                <Badge className="bg-red-100 text-red-600">
                  -{Math.round((1 - product.price_all / product.original_price_all) * 100)}%
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {locale === 'sq' ? product.description_sq : product.description_en}
            </p>
          </div>

          <Separator />

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">
                {locale === 'sq' ? 'Sasia:' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t("common.addToCart")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleBuyNow}
              >
                {locale === 'sq' ? 'Bli Tani' : 'Buy Now'}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Truck className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">
                {locale === 'sq' ? 'Dërgim Falas' : 'Free Shipping'}
              </p>
              <p className="text-xs text-gray-500">
                {locale === 'sq' ? 'Mbi 5,000 L' : 'Over 5,000 L'}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">
                {locale === 'sq' ? 'Garanci' : 'Warranty'}
              </p>
              <p className="text-xs text-gray-500">
                {locale === 'sq' ? '24 muaj' : '24 months'}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <RotateCcw className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">
                {locale === 'sq' ? 'Kthim' : 'Returns'}
              </p>
              <p className="text-xs text-gray-500">
                {locale === 'sq' ? '14 ditë' : '14 days'}
              </p>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-green-600 font-medium">
              {locale === 'sq' ? 'Në stok' : 'In stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specs && product.specs.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'sq' ? 'Specifikimet' : 'Specifications'}
          </h2>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-0">
              {product.specs.map((spec, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex py-4 px-6",
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  )}
                >
                  <span className="w-1/3 text-gray-500">{spec.label}</span>
                  <span className="flex-1 text-gray-900 font-medium">{spec.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'sq' ? 'Produkte të Ngjashme' : 'Related Products'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => {
              const relImage = relProduct.product_images?.[0]?.image_url || '/placeholder.png'
              return (
                <Link key={relProduct.id} href={`/products/${relProduct.slug}`}>
                  <Card className="bg-white border-gray-200 hover:border-red-300 hover:shadow-md overflow-hidden group cursor-pointer transition-all">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={relImage}
                        alt={locale === 'sq' ? relProduct.name_sq : relProduct.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relProduct.is_on_sale && (
                        <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-900">{relProduct.rating_average}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                        {locale === 'sq' ? relProduct.name_sq : relProduct.name_en}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-500">
                          {formatPrice(relProduct.price_all, relProduct.price_eur)}
                        </span>
                        {relProduct.original_price_all && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(relProduct.original_price_all, relProduct.original_price_eur!)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
