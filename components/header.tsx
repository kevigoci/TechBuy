"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
  Laptop,
  Smartphone,
  Tv,
  Gamepad2,
  Home,
  Headphones,
  LogOut,
  Package,
  Settings,
  Globe,
  DollarSign,
  Store,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"

const categories = [
  { name: "computers", icon: Laptop, href: "/categories/computers" },
  { name: "phones", icon: Smartphone, href: "/categories/phones" },
  { name: "tv", icon: Tv, href: "/categories/tv-audio" },
  { name: "gaming", icon: Gamepad2, href: "/categories/gaming" },
  { name: "smartHome", icon: Home, href: "/categories/smart-home" },
  { name: "accessories", icon: Headphones, href: "/categories/accessories" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { user, profile, signOut } = useAuth()
  const { itemCount, setIsCartOpen } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { locale, setLocale, t } = useLanguage()
  const { currency, setCurrency } = useCurrency()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-50 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-600">
              <span>Fast delivery across Albania</span>
              <span className="text-gray-300">|</span>
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:text-gray-900">
                    <Globe className="h-4 w-4 mr-1" />
                    {locale === "en" ? "EN" : "SQ"}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLocale("en")}>
                    {t("language.english")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocale("sq")}>
                    {t("language.albanian")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Currency Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:text-gray-900">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {currency}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCurrency("ALL")}>
                    {t("currency.lek")} (ALL)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrency("EUR")}>
                    {t("currency.euro")} (EUR)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-8 w-8 text-red-500" />
            <span className="font-bold text-xl text-gray-900 hidden sm:block">TechBuy</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder={t("common.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist */}
            <Link href="/account/wishlist">
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900">
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 hover:text-gray-900"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hidden md:flex">
                    <User className="w-5 h-5 mr-2" />
                    <span className="max-w-24 truncate">{profile?.full_name || user.email}</span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {t("account.myAccount")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      {t("account.orders")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist" className="flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      {t("account.wishlist")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      {t("account.settings")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("auth.signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    {t("auth.signIn")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    {t("auth.signUp")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Category Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1 py-2 border-t border-gray-100 overflow-x-auto">
          <Link href="/categories">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Menu className="w-4 h-4 mr-2" />
              {t("nav.allCategories")}
            </Button>
          </Link>
          <div className="h-4 w-px bg-gray-200 mx-2" />
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <category.icon className="w-4 h-4 mr-2" />
                {t(`nav.${category.name}`)}
              </Button>
            </Link>
          ))}
          <Link href="/deals">
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              {t("common.deals")}
            </Button>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder={t("common.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-100 border-gray-200 text-gray-900"
                />
              </div>
            </form>

            {/* Mobile Categories */}
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <category.icon className="w-5 h-5" />
                  <span>{t(`nav.${category.name}`)}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            {user ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <Link
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-700"
                >
                  <User className="w-5 h-5" />
                  {t("account.myAccount")}
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500"
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  {t("auth.signOut")}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Link href="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-gray-300">
                    {t("auth.signIn")}
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    {t("auth.signUp")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Language/Currency */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocale(locale === "en" ? "sq" : "en")}
                className="text-gray-600"
              >
                <Globe className="w-4 h-4 mr-2" />
                {locale === "en" ? "EN" : "SQ"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrency(currency === "ALL" ? "EUR" : "ALL")}
                className="text-gray-600"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {currency}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
