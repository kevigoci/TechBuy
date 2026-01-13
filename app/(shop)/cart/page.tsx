"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { items, itemCount, removeFromCart, updateQuantity, clearCart, getItemPrice } = useCart()
  const { currency, formatPrice } = useCurrency()
  const { t, locale } = useLanguage()

  const subtotalAll = items.reduce((sum, item) => {
    const price = getItemPrice(item, 'ALL')
    return sum + (price * item.quantity)
  }, 0)

  const subtotalEur = items.reduce((sum, item) => {
    const price = getItemPrice(item, 'EUR')
    return sum + (price * item.quantity)
  }, 0)

  const shippingCost = subtotalAll >= 5000 ? 0 : 300
  const shippingCostEur = subtotalEur >= 50 ? 0 : 3

  const totalAll = subtotalAll + shippingCost
  const totalEur = subtotalEur + shippingCostEur

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("cart.cartEmpty")}</h1>
          <p className="text-gray-500 mb-8">{t("cart.cartEmptyDesc")}</p>
          <Link href="/products">
            <Button className="bg-red-500 hover:bg-red-600">
              {t("cart.startShopping")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("cart.yourCart")} ({itemCount} {itemCount === 1 ? t("cart.item") : t("cart.items")})
        </h1>
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => clearCart()}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {locale === 'sq' ? 'Pastro Shportën' : 'Clear Cart'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price = getItemPrice(item, currency)
            const priceAll = getItemPrice(item, 'ALL')
            const priceEur = getItemPrice(item, 'EUR')
            const primaryImage = item.product.product_images?.find(img => img.is_primary)?.image_url || '/placeholder.png'

            return (
              <Card key={item.id} className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={primaryImage}
                          alt={item.product.name_en}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.slug}`}>
                        <h3 className="font-medium text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          {locale === 'sq' ? item.product.name_sq : item.product.name_en}
                        </h3>
                      </Link>
                      {item.variant && (
                        <p className="text-sm text-gray-500 mt-1">
                          {locale === 'sq' ? item.variant.name_sq : item.variant.name_en}
                        </p>
                      )}
                      <p className="text-red-500 font-semibold mt-2">
                        {formatPrice(priceAll, priceEur)}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gray-300"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-gray-900 w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gray-300"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-lg font-bold text-gray-900 hidden sm:block">
                            {formatPrice(priceAll * item.quantity, priceEur * item.quantity)}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-white border-gray-200 sticky top-24">
            <CardHeader>
              <CardTitle className="text-gray-900">{t("cart.orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("common.subtotal")}</span>
                  <span className="text-gray-900">{formatPrice(subtotalAll, subtotalEur)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("common.shipping")}</span>
                  <span className={shippingCost === 0 ? "text-green-600" : "text-gray-900"}>
                    {shippingCost === 0 ? t("common.free") : formatPrice(shippingCost, shippingCostEur)}
                  </span>
                </div>
              </div>

              {subtotalAll < 5000 && (
                <p className="text-xs text-gray-500">
                  {locale === 'sq'
                    ? `Shto ${formatPrice(5000 - subtotalAll, 50 - subtotalEur)} më shumë për transport falas!`
                    : `Add ${formatPrice(5000 - subtotalAll, 50 - subtotalEur)} more for free shipping!`
                  }
                </p>
              )}

              <Separator className="bg-gray-200" />

              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">{t("common.total")}</span>
                <span className="text-xl font-bold text-red-500">{formatPrice(totalAll, totalEur)}</span>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-red-500 hover:bg-red-600" size="lg">
                  {t("common.proceedToCheckout")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700">
                  {t("common.continueShopping")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
