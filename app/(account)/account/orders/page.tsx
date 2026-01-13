"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { Package, ShoppingBag, ChevronRight, Clock, Truck, CheckCircle } from "lucide-react"

// In production, orders would come from Supabase
const mockOrders: any[] = []

const statusConfig = {
  pending: { label: "Pending", labelSq: "Në pritje", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  confirmed: { label: "Confirmed", labelSq: "Konfirmuar", color: "bg-blue-100 text-blue-700", icon: Package },
  shipped: { label: "Shipped", labelSq: "Dërguar", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", labelSq: "Dorëzuar", color: "bg-green-100 text-green-700", icon: CheckCircle },
}

export default function OrdersPage() {
  const { t, locale } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("account.orders")}</h1>
        <p className="text-gray-500 mt-1">
          {locale === 'sq' ? 'Shiko të gjitha porositë e tua' : 'View all your orders'}
        </p>
      </div>

      {mockOrders.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t("account.noOrders")}</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              {locale === 'sq'
                ? 'Nuk keni bërë asnjë porosi akoma. Filloni të eksploroni produktet tona!'
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
          {mockOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig]
            return (
              <Card key={order.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{t("checkout.orderNumber")}</p>
                      <p className="font-mono font-medium text-gray-900">{order.order_number}</p>
                    </div>
                    <Badge className={status.color}>
                      <status.icon className="w-3 h-3 mr-1" />
                      {locale === 'sq' ? status.labelSq : status.label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                    <div className="font-semibold text-gray-900">{order.total} L</div>
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
