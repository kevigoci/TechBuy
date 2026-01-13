"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order") || "UNKNOWN"
  const { t, locale } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t("checkout.orderPlaced")}
        </h1>

        <p className="text-gray-500 mb-8">
          {t("checkout.thankYou")}
          <br />
          {t("checkout.orderConfirmation")}
        </p>

        <Card className="bg-white border-gray-200 mb-8 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Package className="w-5 h-5 text-red-500" />
              <span className="text-gray-500">{t("checkout.orderNumber")}</span>
            </div>
            <p className="text-2xl font-mono font-bold text-gray-900">{orderNumber}</p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Link href="/account/orders">
            <Button className="w-full bg-red-500 hover:bg-red-600">
              {t("checkout.viewOrder")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
              <Home className="w-4 h-4 mr-2" />
              {t("checkout.continueShopping")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
