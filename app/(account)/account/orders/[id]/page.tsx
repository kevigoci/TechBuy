"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle, RefreshCw, MapPin, CreditCard } from "lucide-react"
import type { Order, OrderItem } from "@/types/database"

const statusConfig = {
  pending: { label: "Pending", labelSq: "Ne pritje", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  confirmed: { label: "Confirmed", labelSq: "Konfirmuar", color: "bg-blue-100 text-blue-700", icon: Package },
  processing: { label: "Processing", labelSq: "Duke u procesuar", color: "bg-blue-100 text-blue-700", icon: RefreshCw },
  shipped: { label: "Shipped", labelSq: "Derguar", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", labelSq: "Dorezuar", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", labelSq: "Anulluar", color: "bg-red-100 text-red-700", icon: XCircle },
  refunded: { label: "Refunded", labelSq: "Rimbursuar", color: "bg-gray-100 text-gray-700", icon: RefreshCw },
}

const paymentMethodLabels = {
  card: { en: "Credit Card", sq: "Karte Krediti" },
  bank_transfer: { en: "Bank Transfer", sq: "Transfer Bankar" },
  cash_on_delivery: { en: "Cash on Delivery", sq: "Para ne Dorezim" },
}

export default function OrderDetailsPage() {
  const params = useParams()
  const { t, locale } = useLanguage()
  const { user } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      if (!user?.id || !params.id) {
        setIsLoading(false)
        return
      }

      const supabase = createClient()

      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single()

      if (orderError) {
        console.error('Error fetching order:', orderError)
        setIsLoading(false)
        return
      }

      setOrder(orderData)

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', params.id)

      if (!itemsError && itemsData) {
        setOrderItems(itemsData)
      }

      setIsLoading(false)
    }

    fetchOrder()
  }, [user?.id, params.id])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {locale === 'sq' ? 'Porosia nuk u gjet' : 'Order not found'}
        </h2>
        <Link href="/account/orders">
          <Button className="mt-4 bg-red-500 hover:bg-red-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {locale === 'sq' ? 'Kthehu te porositë' : 'Back to orders'}
          </Button>
        </Link>
      </div>
    )
  }

  const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
  const StatusIcon = status.icon
  const shippingAddress = order.shipping_address as any

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/account/orders" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            {locale === 'sq' ? 'Kthehu te porositë' : 'Back to orders'}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {locale === 'sq' ? 'Detajet e Porosisë' : 'Order Details'}
          </h1>
        </div>
        <Badge className={status.color}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {locale === 'sq' ? status.labelSq : status.label}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Info */}
        <Card className="bg-white border-gray-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {locale === 'sq' ? 'Informacioni i Porosisë' : 'Order Information'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t("checkout.orderNumber")}</p>
                <p className="font-mono font-medium text-gray-900">{order.order_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{locale === 'sq' ? 'Data' : 'Date'}</p>
                <p className="text-gray-900">
                  {new Date(order.created_at).toLocaleDateString(locale === 'sq' ? 'sq-AL' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{locale === 'sq' ? 'Metoda e Pagesës' : 'Payment Method'}</p>
                <p className="text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  {locale === 'sq'
                    ? paymentMethodLabels[order.payment_method as keyof typeof paymentMethodLabels]?.sq
                    : paymentMethodLabels[order.payment_method as keyof typeof paymentMethodLabels]?.en}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{locale === 'sq' ? 'Statusi i Pagesës' : 'Payment Status'}</p>
                <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'} className={order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : ''}>
                  {order.payment_status === 'paid'
                    ? (locale === 'sq' ? 'Paguar' : 'Paid')
                    : (locale === 'sq' ? 'Ne pritje' : 'Pending')}
                </Badge>
              </div>
            </div>

            {order.tracking_number && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">{locale === 'sq' ? 'Numri i Gjurmimit' : 'Tracking Number'}</p>
                <p className="font-mono text-gray-900">{order.tracking_number}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              {locale === 'sq' ? 'Adresa e Dërgesës' : 'Shipping Address'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-700 space-y-1">
              <p className="font-medium">{shippingAddress?.full_name}</p>
              <p>{shippingAddress?.street_address}</p>
              <p>{shippingAddress?.city}{shippingAddress?.postal_code && `, ${shippingAddress.postal_code}`}</p>
              <p>{shippingAddress?.country}</p>
              <p className="text-gray-500">{shippingAddress?.phone}</p>
              <p className="text-gray-500">{shippingAddress?.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            {locale === 'sq' ? 'Artikujt e Porosisë' : 'Order Items'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{item.product_name}</p>
                  {item.variant_name && (
                    <p className="text-sm text-gray-500">{item.variant_name}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    {locale === 'sq' ? 'Sasia' : 'Qty'}: {item.quantity} x {order.currency === 'ALL' ? `${item.unit_price.toLocaleString()} L` : `${item.unit_price.toLocaleString()}`}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  {order.currency === 'ALL' ? `${item.total_price.toLocaleString()} L` : `${item.total_price.toLocaleString()}`}
                </p>
              </div>
            ))}

            {orderItems.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                {locale === 'sq' ? 'Nuk ka artikuj' : 'No items found'}
              </p>
            )}
          </div>

          <Separator className="my-4" />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("common.subtotal")}</span>
              <span className="text-gray-900">
                {order.currency === 'ALL' ? `${order.subtotal.toLocaleString()} L` : `${order.subtotal.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("common.shipping")}</span>
              <span className="text-gray-900">
                {order.shipping_cost === 0
                  ? t("common.free")
                  : order.currency === 'ALL' ? `${order.shipping_cost.toLocaleString()} L` : `${order.shipping_cost.toLocaleString()}`}
              </span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{locale === 'sq' ? 'Zbritje' : 'Discount'}</span>
                <span className="text-green-600">
                  -{order.currency === 'ALL' ? `${order.discount_amount.toLocaleString()} L` : `${order.discount_amount.toLocaleString()}`}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">{t("common.total")}</span>
              <span className="font-bold text-red-500 text-lg">
                {order.currency === 'ALL' ? `${order.total.toLocaleString()} L` : `${order.total.toLocaleString()}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
