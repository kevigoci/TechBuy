"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCurrency } from "@/contexts/currency-context"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

export default function WishlistPage() {
  const { items, removeFromWishlist, isLoading } = useWishlist()
  const { formatPrice } = useCurrency()
  const { addToCart } = useCart()
  const { t, locale } = useLanguage()

  const handleAddToCart = (item: any) => {
    addToCart(item.product)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("account.wishlist")}</h1>
        <p className="text-gray-500 mt-1">
          {items.length} {locale === 'sq' ? 'artikuj të ruajtur' : 'saved items'}
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t("account.noWishlistItems")}</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              {locale === 'sq'
                ? 'Ruani produktet që ju pëlqejnë për ti blerë më vonë.'
                : 'Save products you love to buy them later.'
              }
            </p>
            <Link href="/products">
              <Button className="bg-red-500 hover:bg-red-600">
                {locale === 'sq' ? 'Eksploro Produktet' : 'Explore Products'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const product = item.product
            const primaryImage = product.product_images?.find((img: any) => img.is_primary)?.image_url || product.product_images?.[0]?.image_url || '/placeholder.png'

            return (
              <Card key={item.id} className="bg-white border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={primaryImage}
                      alt={product.name_en}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                      {locale === 'sq' ? product.name_sq : product.name_en}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-red-500 mb-4">
                    {formatPrice(product.price_all, product.price_eur)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t("common.addToCart")}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
