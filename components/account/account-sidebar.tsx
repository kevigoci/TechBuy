"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/account", icon: User, labelKey: "account.dashboard" },
  { href: "/account/orders", icon: Package, labelKey: "account.orders" },
  { href: "/account/wishlist", icon: Heart, labelKey: "account.wishlist" },
  { href: "/account/addresses", icon: MapPin, labelKey: "account.addresses" },
  { href: "/account/profile", icon: Settings, labelKey: "account.profile" },
]

export function AccountSidebar() {
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth()
  const { t } = useLanguage()

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }

  return (
    <Card className="md:w-64 flex-shrink-0 bg-white border-gray-200 p-4 shadow-sm">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile?.avatar_url || undefined} />
          <AvatarFallback className="bg-red-500 text-white">
            {getInitials(profile?.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <p className="font-medium text-gray-900 truncate">
            {profile?.full_name || "User"}
          </p>
          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isActive
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {t(item.labelKey)}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-3" />
          {t("auth.signOut")}
        </Button>
      </div>
    </Card>
  )
}
