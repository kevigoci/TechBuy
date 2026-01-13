"use client"

import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react"
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

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-white border-gray-200">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-gray-900">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            {t("cart.yourCart")} ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("cart.cartEmpty")}</h3>
            <p className="text-gray-500 mb-6">{t("cart.cartEmptyDesc")}</p>
            <Button onClick={() => setIsCartOpen(false)} className="bg-red-500 hover:bg-red-600">
              {t("cart.startShopping")}
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 h-[calc(100vh-280px)]">
              <div className="space-y-4 pr-4">
                {items.map((item) => {
                  const primaryImage = item.product.product_images?.find(img => img.is_primary)?.image_url || item.product.product_images?.[0]?.image_url || '/placeholder.png'
                  const priceAll = item.variant?.price_all || item.product.price_all
                  const priceEur = item.variant?.price_eur || item.product.price_eur

                  return (
                    <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={primaryImage}
                          alt={locale === 'sq' ? item.product.name_sq : item.product.name_en}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {locale === 'sq' ? item.product.name_sq : item.product.name_en}
                        </h4>
                        {item.variant && (
                          <p className="text-xs text-gray-500">
                            {locale === 'sq' ? item.variant.name_sq : item.variant.name_en}
                          </p>
                        )}
                        <p className="text-red-500 font-semibold mt-1">
                          {formatPrice(priceAll, priceEur)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 border-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-gray-900 w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 border-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50 ml-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="mt-4 space-y-4">
              <Separator className="bg-gray-200" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("common.subtotal")}</span>
                  <span className="text-gray-900 font-medium">
                    {formatPrice(subtotalAll, subtotalEur)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("common.shipping")}</span>
                  <span className="text-green-600 font-medium">
                    {subtotalAll >= 5000 ? t("common.free") : formatPrice(300, 3)}
                  </span>
                </div>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex justify-between">
                <span className="text-gray-900 font-semibold">{t("common.total")}</span>
                <span className="text-red-500 font-bold text-lg">
                  {formatPrice(
                    subtotalAll >= 5000 ? subtotalAll : subtotalAll + 300,
                    subtotalEur >= 50 ? subtotalEur : subtotalEur + 3
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    {t("common.proceedToCheckout")}
                  </Button>
                </Link>
                <Link href="/cart" onClick={() => setIsCartOpen(false)}>
                  <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
                    {t("cart.yourCart")}
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
