"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Shield, RefreshCw } from "lucide-react"

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

  // Free shipping threshold
  const freeShippingThresholdAll = 5000
  const freeShippingThresholdEur = 50
  const currentThreshold = currency === 'ALL' ? freeShippingThresholdAll : freeShippingThresholdEur
  const currentSubtotal = currency === 'ALL' ? subtotalAll : subtotalEur
  const isFreeShipping = currentSubtotal >= currentThreshold
  const remainingForFreeShipping = currentThreshold - currentSubtotal
  const progressPercentage = Math.min((currentSubtotal / currentThreshold) * 100, 100)

  const shippingCost = isFreeShipping ? 0 : 300
  const shippingCostEur = isFreeShipping ? 0 : 3

  const totalAll = subtotalAll + (isFreeShipping ? 0 : 300)
  const totalEur = subtotalEur + (isFreeShipping ? 0 : 3)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-300" />
          </div>
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

      {/* Free Shipping Progress */}
      <Card className="bg-white border-gray-200 mb-6">
        <CardContent className="p-4">
          {isFreeShipping ? (
            <div className="flex items-center gap-3 text-green-600">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">
                  {locale === 'sq' ? 'Keni transport falas!' : 'You qualify for free shipping!'}
                </p>
                <p className="text-sm text-green-500">
                  {locale === 'sq' ? 'Porosia juaj do të dërgohet pa kosto shtesë' : 'Your order will be shipped at no extra cost'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {locale === 'sq'
                        ? `Shto ${formatPrice(remainingForFreeShipping, remainingForFreeShipping)} për transport falas`
                        : `Add ${formatPrice(remainingForFreeShipping, remainingForFreeShipping)} for free shipping`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {locale === 'sq' ? 'Transport falas mbi' : 'Free shipping on orders over'} {formatPrice(freeShippingThresholdAll, freeShippingThresholdEur)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const priceAll = getItemPrice(item, 'ALL')
            const priceEur = getItemPrice(item, 'EUR')
            const primaryImage = item.product.product_images?.find(img => img.is_primary)?.image_url || '/placeholder.png'

            return (
              <Card key={item.id} className="bg-white border-gray-200 overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex">
                    <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                      <div className="relative w-28 h-28 md:w-36 md:h-36 bg-gray-100 overflow-hidden">
                        <Image
                          src={primaryImage}
                          alt={item.product.name_en}
                          fill
                          sizes="(max-width: 768px) 112px, 144px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 p-4 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/products/${item.product.slug}`} className="flex-1">
                            <h3 className="font-medium text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                              {locale === 'sq' ? item.product.name_sq : item.product.name_en}
                            </h3>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 -mt-1 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {item.variant && (
                          <p className="text-sm text-gray-500 mt-1">
                            {locale === 'sq' ? item.variant.name_sq : item.variant.name_en}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-gray-900 w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-red-500">
                          {formatPrice(priceAll * item.quantity, priceEur * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card className="bg-white border-gray-200 sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">{t("cart.orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("common.subtotal")}</span>
                  <span className="text-gray-900 font-medium">{formatPrice(subtotalAll, subtotalEur)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("common.shipping")}</span>
                  <span className={isFreeShipping ? "text-green-600 font-medium" : "text-gray-900"}>
                    {isFreeShipping ? t("common.free") : formatPrice(shippingCost, shippingCostEur)}
                  </span>
                </div>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">{t("common.total")}</span>
                <span className="text-2xl font-bold text-red-500">{formatPrice(totalAll, totalEur)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full bg-red-500 hover:bg-red-600 h-12 text-base font-medium" size="lg">
                  {t("common.proceedToCheckout")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/products" className="block">
                <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
                  {t("common.continueShopping")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Trust badges */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-gray-600">
                  {locale === 'sq' ? 'Pagesë e sigurt' : 'Secure payment'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">
                  {locale === 'sq' ? 'Dërgesa e shpejtë në të gjithë Shqipërinë' : 'Fast delivery across Albania'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RefreshCw className="w-5 h-5 text-orange-600" />
                <span className="text-gray-600">
                  {locale === 'sq' ? '30 ditë kthim' : '30-day returns'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
