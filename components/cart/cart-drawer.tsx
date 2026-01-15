"use client"

import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Minus, Plus, Trash2, Truck, X, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
  const { items, itemCount, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getItemPrice } = useCart()
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

  const shippingCostAll = subtotalAll >= freeShippingThresholdAll ? 0 : 300
  const shippingCostEur = subtotalEur >= freeShippingThresholdEur ? 0 : 3

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-white border-gray-200 flex flex-col p-0">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <SheetHeader className="flex-row items-center justify-between space-y-0">
            <SheetTitle className="flex items-center gap-2 text-gray-900">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              {t("cart.yourCart")}
              <span className="ml-1 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full font-medium">
                {itemCount}
              </span>
            </SheetTitle>
          </SheetHeader>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("cart.cartEmpty")}</h3>
            <p className="text-gray-500 mb-6 text-sm">{t("cart.cartEmptyDesc")}</p>
            <Button onClick={() => setIsCartOpen(false)} className="bg-red-500 hover:bg-red-600">
              {t("cart.startShopping")}
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {locale === 'sq' ? 'Keni transport falas!' : 'You qualify for free shipping!'}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {locale === 'sq'
                        ? `Shto ${formatPrice(remainingForFreeShipping, remainingForFreeShipping)} për transport falas`
                        : `Add ${formatPrice(remainingForFreeShipping, remainingForFreeShipping)} for free shipping`}
                    </span>
                    <Truck className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => {
                  const primaryImage = item.product.product_images?.find(img => img.is_primary)?.image_url || item.product.product_images?.[0]?.image_url || '/placeholder.png'
                  const priceAll = item.variant?.price_all || item.product.price_all
                  const priceEur = item.variant?.price_eur || item.product.price_eur

                  return (
                    <div key={item.id} className="flex gap-4 group">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                      >
                        <Image
                          src={primaryImage}
                          alt={locale === 'sq' ? item.product.name_sq : item.product.name_en}
                          fill
                          sizes="80px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                              {locale === 'sq' ? item.product.name_sq : item.product.name_en}
                            </h4>
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 -m-1 opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {locale === 'sq' ? item.variant.name_sq : item.variant.name_en}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-gray-100 transition-colors rounded-l-lg"
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-gray-900 w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-100 transition-colors rounded-r-lg"
                            >
                              <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                          <p className="text-red-500 font-semibold text-sm">
                            {formatPrice(priceAll * item.quantity, priceEur * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4 bg-white space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("common.subtotal")}</span>
                  <span className="text-gray-900 font-medium">
                    {formatPrice(subtotalAll, subtotalEur)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("common.shipping")}</span>
                  <span className={isFreeShipping ? "text-green-600 font-medium" : "text-gray-900"}>
                    {isFreeShipping ? t("common.free") : formatPrice(shippingCostAll, shippingCostEur)}
                  </span>
                </div>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-semibold">{t("common.total")}</span>
                <span className="text-red-500 font-bold text-xl">
                  {formatPrice(
                    isFreeShipping ? subtotalAll : subtotalAll + 300,
                    isFreeShipping ? subtotalEur : subtotalEur + 3
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block">
                  <Button className="w-full bg-red-500 hover:bg-red-600 h-12 text-base font-medium">
                    {t("common.proceedToCheckout")}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/cart" onClick={() => setIsCartOpen(false)} className="block">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 h-10">
                    {locale === 'sq' ? 'Shiko Shportën' : 'View Cart'}
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
