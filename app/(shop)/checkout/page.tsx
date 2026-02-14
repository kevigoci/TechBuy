"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useStockReservation } from "@/hooks/use-stock-reservation"
import { ReservationTimer } from "@/components/checkout/reservation-timer"
import { ArrowLeft, CreditCard, Truck, Building, Loader2, Lock, ShoppingBag, RefreshCw, AlertTriangle as AlertTriangleIcon } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, itemCount, clearCart, getItemPrice } = useCart()
  const { currency, formatPrice } = useCurrency()
  const { t, locale } = useLanguage()
  const { user } = useAuth()

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  // Stock reservation system
  const {
    isReserving,
    isReserved,
    isExpired,
    error: reservationError,
    timeRemaining,
    secondsRemaining,
    reserveStock,
    releaseStock,
    completeReservation,
  } = useStockReservation()

  const hasReservedRef = useRef(false)

  // Reserve stock when entering checkout
  const initiateReservation = useCallback(async () => {
    if (items.length === 0 || hasReservedRef.current) return

    const reservationItems = items.map((item) => ({
      product_id: item.product_id,
      variant_id: item.variant_id || null,
      quantity: item.quantity,
    }))

    hasReservedRef.current = true
    const success = await reserveStock(reservationItems)

    if (!success) {
      hasReservedRef.current = false
      toast.error(
        locale === "sq"
          ? "Disa produkte nuk janë më të disponueshme"
          : "Some items are no longer available"
      )
    }
  }, [items, reserveStock, locale])

  useEffect(() => {
    initiateReservation()
  }, [initiateReservation])

  // Release stock when navigating away from checkout
  useEffect(() => {
    const handleBeforeUnload = () => {
      releaseStock()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      // Release when component unmounts (user navigates away in-app)
      releaseStock()
    }
  }, [releaseStock])

  // Fetch user profile and default address to pre-fill form
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return

      const supabase = createClient()

      // Fetch profile and default address in parallel
      const [profileRes, addressRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('addresses').select('*').eq('user_id', user.id).eq('is_default', true).single()
      ])

      const profile = profileRes.data
      const address = addressRes.data

      setFormData(prev => ({
        ...prev,
        fullName: address?.full_name || profile?.full_name || prev.fullName,
        email: profile?.email || user.email || prev.email,
        phone: address?.phone || profile?.phone || prev.phone,
        address: address?.street_address || prev.address,
        city: address?.city || prev.city,
        postalCode: address?.postal_code || prev.postalCode,
      }))
    }

    fetchUserData()
  }, [user])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Block submission if reservation expired
    if (isExpired) {
      toast.error(
        locale === "sq"
          ? "Rezervimi ka skaduar. Ju lutem rifreskoni dhe provoni përsëri."
          : "Reservation expired. Please refresh and try again."
      )
      return
    }

    // Block submission if not reserved yet
    if (!isReserved) {
      toast.error(
        locale === "sq"
          ? "Produktet nuk janë rezervuar ende. Ju lutem prisni."
          : "Items are not reserved yet. Please wait."
      )
      return
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast.error(locale === 'sq' ? "Ju lutem plotësoni të gjitha fushat e kërkuara" : "Please fill in all required fields")
      return
    }

    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        toast.error(locale === 'sq' ? "Ju lutem plotësoni detajet e kartës" : "Please fill in card details")
        return
      }
    }

    setIsProcessing(true)

    try {
      // Step 1: Complete the stock reservation (decrement real stock)
      const reservationCompleted = await completeReservation()

      if (!reservationCompleted) {
        toast.error(
          locale === "sq"
            ? "Rezervimi dështoi ose skadoi. Stoku mund të mos jetë më i disponueshëm."
            : "Reservation failed or expired. Stock may no longer be available."
        )
        setIsProcessing(false)
        return
      }

      // Step 2: Create the order in database
      const supabase = createClient()

      // Generate order number
      const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`

      // Map payment method to database enum
      const paymentMethodMap: Record<string, 'card' | 'bank_transfer' | 'cash_on_delivery'> = {
        card: 'card',
        bank: 'bank_transfer',
        cod: 'cash_on_delivery'
      }

      // Prepare shipping address JSON
      const shippingAddress = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        street_address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode || null,
        country: 'Albania'
      }

      // Only save to database if user is logged in (user_id is required in DB)
      if (user?.id) {
        // Create order in database
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            user_id: user.id,
            status: 'pending',
            payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
            payment_method: paymentMethodMap[paymentMethod],
            currency: currency,
            subtotal: currency === 'ALL' ? subtotalAll : subtotalEur,
            shipping_cost: currency === 'ALL' ? shippingCost : shippingCostEur,
            discount_amount: 0,
            total: currency === 'ALL' ? totalAll : totalEur,
            shipping_address: shippingAddress
          })
          .select()
          .single()

        if (orderError) {
          console.error('Order creation error:', orderError.message, orderError.code, orderError.details)
          // If RLS error, still allow checkout to complete but warn
          if (orderError.code === '42501' || orderError.message?.includes('policy')) {
            console.warn('RLS policy blocked order insert - continuing without saving')
            toast.info(locale === 'sq' ? "Porosia u krye por nuk u ruajt ne llogari" : "Order placed but not saved to account")
          } else {
            toast.error(locale === 'sq' ? "Gabim gjate krijimit te porosise" : "Error creating order")
            setIsProcessing(false)
            return
          }
        } else if (order) {
          // Create order items only if order was created successfully
          const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            variant_id: item.variant_id || null,
            product_name: locale === 'sq' ? item.product.name_sq : item.product.name_en,
            variant_name: item.variant ? (locale === 'sq' ? item.variant.name_sq : item.variant.name_en) : null,
            quantity: item.quantity,
            unit_price: currency === 'ALL' ? getItemPrice(item, 'ALL') : getItemPrice(item, 'EUR'),
            total_price: currency === 'ALL' ? getItemPrice(item, 'ALL') * item.quantity : getItemPrice(item, 'EUR') * item.quantity
          }))

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

          if (itemsError) {
            console.error('Order items error:', itemsError.message)
          }
        }
      }

      // Clear cart and redirect to success
      await clearCart()
      router.push(`/checkout/success?order=${orderNumber}`)
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(locale === 'sq' ? "Gabim gjate procesimit te porosise" : "Error processing order")
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("cart.cartEmpty")}</h1>
        <p className="text-gray-500 mb-6">{t("cart.cartEmptyDesc")}</p>
        <Link href="/">
          <Button className="bg-red-500 hover:bg-red-600">
            {t("cart.startShopping")}
          </Button>
        </Link>
      </div>
    )
  }

  const handleRetryReservation = () => {
    hasReservedRef.current = false
    initiateReservation()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {locale === 'sq' ? 'Kthehu te shporta' : 'Back to cart'}
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("checkout.checkout")}</h1>

      {/* Stock Reservation Timer */}
      <div className="mb-6">
        <ReservationTimer
          isReserving={isReserving}
          isReserved={isReserved}
          isExpired={isExpired}
          error={reservationError}
          timeRemaining={timeRemaining}
          secondsRemaining={secondsRemaining}
          locale={locale}
        />
        {/* Retry button when expired or error */}
        {(isExpired || reservationError) && (
          <Button
            variant="outline"
            className="mt-3 w-full border-amber-300 text-amber-700 hover:bg-amber-50"
            onClick={handleRetryReservation}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {locale === "sq" ? "Provo përsëri" : "Try again"}
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Truck className="w-5 h-5 text-red-500" />
                  {t("checkout.shippingAddress")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700">{t("auth.fullName")} *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">{locale === 'sq' ? 'Telefoni' : 'Phone'} *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">{t("auth.email")} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-gray-700">{locale === 'sq' ? 'Adresa' : 'Address'} *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-700">{locale === 'sq' ? 'Qyteti' : 'City'} *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-700">{locale === 'sq' ? 'Kodi Postar' : 'Postal Code'}</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <CreditCard className="w-5 h-5 text-red-500" />
                  {t("checkout.paymentMethod")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">{t("checkout.creditCard")}</span>
                      </div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">{t("checkout.bankTransfer")}</span>
                      </div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">{t("checkout.cashOnDelivery")}</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div>
                      <Label htmlFor="cardNumber" className="text-gray-700">{t("checkout.cardNumber")}</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-gray-700">{t("checkout.expiryDate")}</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-gray-700">{t("checkout.cvv")}</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="bg-white border-gray-200 sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-900">{t("cart.orderSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => {
                    const primaryImage = item.product.product_images?.find(img => img.is_primary)?.image_url || '/placeholder.png'
                    return (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={primaryImage}
                            alt={item.product.name_en}
                            fill
                            sizes="64px"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate font-medium">
                            {locale === 'sq' ? item.product.name_sq : item.product.name_en}
                          </p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(
                            getItemPrice(item, 'ALL') * item.quantity,
                            getItemPrice(item, 'EUR') * item.quantity
                          )}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <Separator className="bg-gray-200" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("common.subtotal")}</span>
                    <span className="text-gray-900">{formatPrice(subtotalAll, subtotalEur)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("common.shipping")}</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-medium" : "text-gray-900"}>
                      {shippingCost === 0 ? t("common.free") : formatPrice(shippingCost, shippingCostEur)}
                    </span>
                  </div>
                </div>

                <Separator className="bg-gray-200" />

                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">{t("common.total")}</span>
                  <span className="text-xl font-bold text-red-500">{formatPrice(totalAll, totalEur)}</span>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600"
                  size="lg"
                  disabled={isProcessing || isExpired || !isReserved || isReserving}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("checkout.processing")}
                    </>
                  ) : isExpired ? (
                    <>
                      <AlertTriangleIcon className="w-4 h-4 mr-2" />
                      {locale === "sq" ? "Rezervimi ka skaduar" : "Reservation expired"}
                    </>
                  ) : !isReserved ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {locale === "sq" ? "Duke rezervuar..." : "Reserving..."}
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      {t("checkout.placeOrder")}
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  {locale === 'sq'
                    ? 'Duke vendosur porosinë, ju pranoni kushtet tona të shërbimit.'
                    : 'By placing your order, you agree to our terms of service.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
