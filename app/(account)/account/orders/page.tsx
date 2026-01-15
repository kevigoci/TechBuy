"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useCurrency } from "@/contexts/currency-context"
import { createClient } from "@/lib/supabase/client"
import { Package, ShoppingBag, ChevronRight, Clock, Truck, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import type { Order } from "@/types/database"

const statusConfig = {
  pending: { label: "Pending", labelSq: "Ne pritje", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  confirmed: { label: "Confirmed", labelSq: "Konfirmuar", color: "bg-blue-100 text-blue-700", icon: Package },
  processing: { label: "Processing", labelSq: "Duke u procesuar", color: "bg-blue-100 text-blue-700", icon: RefreshCw },
  shipped: { label: "Shipped", labelSq: "Derguar", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", labelSq: "Dorezuar", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", labelSq: "Anulluar", color: "bg-red-100 text-red-700", icon: XCircle },
  refunded: { label: "Refunded", labelSq: "Rimbursuar", color: "bg-gray-100 text-gray-700", icon: RefreshCw },
}

export default function OrdersPage() {
  const { t, locale } = useLanguage()
  const { user } = useAuth()
  const { formatPrice } = useCurrency()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (!user?.id) {
        console.log('No user ID, skipping order fetch')
        setIsLoading(false)
        return
      }

      console.log('Fetching orders for user:', user.id)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error.message, error.code, error.details)
      } else {
        console.log('Orders fetched:', data?.length || 0)
        setOrders(data || [])
      }
      setIsLoading(false)
    }

    fetchOrders()
  }, [user?.id])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("account.orders")}</h1>
          <p className="text-gray-500 mt-1">
            {locale === 'sq' ? 'Shiko te gjitha porosite e tua' : 'View all your orders'}
          </p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("account.orders")}</h1>
        <p className="text-gray-500 mt-1">
          {locale === 'sq' ? 'Shiko te gjitha porosite e tua' : 'View all your orders'}
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t("account.noOrders")}</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              {locale === 'sq'
                ? 'Nuk keni bere asnje porosi akoma. Filloni te eksploroni produktet tona!'
                : "You haven't placed any orders yet. Start exploring our products!"
              }
            </p>
            <Link href="/products">
              <Button className="bg-red-500 hover:bg-red-600">
                {t("common.shopNow")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
            const StatusIcon = status.icon
            return (
              <Card key={order.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{t("checkout.orderNumber")}</p>
                      <p className="font-mono font-medium text-gray-900">{order.order_number}</p>
                    </div>
                    <Badge className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {locale === 'sq' ? status.labelSq : status.label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString(locale === 'sq' ? 'sq-AL' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {order.currency === 'ALL'
                        ? `${order.total.toLocaleString()} L`
                        : `€${order.total.toLocaleString()}`
                      }
                    </div>
                  </div>

                  <Link href={`/account/orders/${order.id}`} className="mt-4 block">
                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
                      {t("account.orderDetails")}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
