"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Package, Heart, MapPin, Settings, ChevronRight, ShoppingBag } from "lucide-react"

export default function AccountDashboard() {
  const { profile } = useAuth()
  const { t, locale } = useLanguage()

  const quickLinks = [
    {
      title: locale === 'sq' ? 'Porositë e Mia' : 'My Orders',
      description: locale === 'sq' ? 'Shiko historikun e porosive' : 'View your order history',
      icon: Package,
      href: '/account/orders',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: locale === 'sq' ? 'Lista e Dëshirave' : 'Wishlist',
      description: locale === 'sq' ? 'Produktet e ruajtura' : 'Your saved products',
      icon: Heart,
      href: '/account/wishlist',
      color: 'text-red-500 bg-red-50',
    },
    {
      title: locale === 'sq' ? 'Adresat' : 'Addresses',
      description: locale === 'sq' ? 'Menaxho adresat e dërgesës' : 'Manage shipping addresses',
      icon: MapPin,
      href: '/account/addresses',
      color: 'text-green-600 bg-green-50',
    },
    {
      title: locale === 'sq' ? 'Cilësimet' : 'Settings',
      description: locale === 'sq' ? 'Ndrysho profilin tënd' : 'Edit your profile',
      icon: Settings,
      href: '/account/profile',
      color: 'text-purple-600 bg-purple-50',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("account.dashboard")}</h1>
        <p className="text-gray-500 mt-1">
          {locale === 'sq'
            ? `Mirësevjen, ${profile?.full_name || 'Përdorues'}!`
            : `Welcome back, ${profile?.full_name || 'User'}!`
          }
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="bg-white border-gray-200 hover:border-red-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`p-3 rounded-xl ${link.color}`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{link.title}</h3>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-gray-900">{t("account.orderHistory")}</CardTitle>
          <Link href="/account/orders">
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              {t("common.viewAll")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t("account.noOrders")}</h3>
            <p className="text-gray-500 mb-4">
              {locale === 'sq'
                ? 'Kur të bëni një porosi, ajo do të shfaqet këtu.'
                : 'When you place an order, it will appear here.'
              }
            </p>
            <Link href="/products">
              <Button className="bg-red-500 hover:bg-red-600">
                {t("common.shopNow")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
