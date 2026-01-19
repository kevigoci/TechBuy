"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
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
import { products, getProductsByCategory, getProductsOnSale, categories as productCategories } from "@/lib/products-data"
import { ThemeToggle } from "@/components/theme-toggle"

const navCategories = [
  { id: "computers", name: "computers", icon: Laptop, href: "/categories/computers" },
  { id: "phones", name: "phones", icon: Smartphone, href: "/categories/phones" },
  { id: "tv", name: "tv", icon: Tv, href: "/categories/tv" },
  { id: "gaming", name: "gaming", icon: Gamepad2, href: "/categories/gaming" },
  { id: "accessories", name: "accessories", icon: Headphones, href: "/categories/accessories" },
]

const categoryIcons: Record<string, typeof Laptop> = {
  computers: Laptop,
  phones: Smartphone,
  tv: Tv,
  gaming: Gamepad2,
  accessories: Headphones,
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showDeals, setShowDeals] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const allCategoriesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dealsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()
  const { user, profile, signOut } = useAuth()
  const { itemCount, setIsCartOpen } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { locale, setLocale, t } = useLanguage()
  const { currency, setCurrency, formatPrice } = useCurrency()

  // Search functionality
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase()
      const results = products.filter(p =>
        p.name_en.toLowerCase().includes(query) ||
        p.name_sq.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      ).slice(0, 6)
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchQuery])

  // Close search on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setShowSearchResults(false)
      setSearchQuery("")
    }
  }

  const handleSearchSelect = (slug: string) => {
    router.push(`/products/${slug}`)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleCategoryHover = (categoryId: string | null) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current)
    }
    if (categoryId) {
      setHoveredCategory(categoryId)
      setShowCategoryDropdown(true)
      setShowAllCategories(false)
      setShowDeals(false)
    } else {
      categoryTimeoutRef.current = setTimeout(() => {
        setShowCategoryDropdown(false)
        setHoveredCategory(null)
      }, 150)
    }
  }

  const handleAllCategoriesHover = (show: boolean) => {
    if (allCategoriesTimeoutRef.current) {
      clearTimeout(allCategoriesTimeoutRef.current)
    }
    if (show) {
      setShowAllCategories(true)
      setShowCategoryDropdown(false)
      setShowDeals(false)
      setHoveredCategory(null)
    } else {
      allCategoriesTimeoutRef.current = setTimeout(() => {
        setShowAllCategories(false)
      }, 150)
    }
  }

  const handleDealsHover = (show: boolean) => {
    if (dealsTimeoutRef.current) {
      clearTimeout(dealsTimeoutRef.current)
    }
    if (show) {
      setShowDeals(true)
      setShowCategoryDropdown(false)
      setShowAllCategories(false)
      setHoveredCategory(null)
    } else {
      dealsTimeoutRef.current = setTimeout(() => {
        setShowDeals(false)
      }, 150)
    }
  }

  const categoryProducts = hoveredCategory ? getProductsByCategory(hoveredCategory).slice(0, 4) : []
  const dealsProducts = getProductsOnSale(6)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="bg-secondary py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>Fast delivery across Albania</span>
              <span className="text-border">|</span>
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-muted-foreground hover:text-foreground">
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
                  <Button variant="ghost" size="sm" className="h-7 text-muted-foreground hover:text-foreground">
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

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-8 w-8 text-violet-500" />
            <span className="font-bold text-xl text-foreground hidden sm:block">TechBuy</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder={t("common.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                  className="pl-10 pr-4 py-2 w-full bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-violet-500 focus:ring-violet-500"
                />
              </div>
            </form>

            {/* Search Suggestions Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearchSelect(product.slug)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                  >
                    <div className="relative w-12 h-12 bg-secondary rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={product.product_images[0]?.image_url || '/placeholder.png'}
                        alt={product.name_en}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {locale === 'sq' ? product.name_sq : product.name_en}
                      </p>
                      <p className="text-violet-500 text-sm font-semibold">
                        {formatPrice(product.price_all, product.price_eur)}
                      </p>
                    </div>
                  </button>
                ))}
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setShowSearchResults(false)}
                  className="block p-3 text-center text-violet-500 font-medium hover:bg-secondary border-t border-border"
                >
                  {locale === 'sq' ? 'Shiko të gjitha rezultatet' : 'View all results'}
                </Link>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist */}
            <Link href="/account/wishlist">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-violet-500 text-white text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-violet-500 text-white text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hidden md:flex">
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
                  <DropdownMenuItem onClick={handleSignOut} className="text-violet-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("auth.signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    {t("auth.signIn")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-violet-500 hover:bg-violet-600 text-white">
                    {t("auth.signUp")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Category Navigation - Desktop with Hover Dropdown */}
        <nav className="hidden md:flex items-center gap-1 py-2 border-t border-border overflow-x-auto relative">
          <div
            onMouseEnter={() => handleAllCategoriesHover(true)}
            onMouseLeave={() => handleAllCategoriesHover(false)}
          >
            <Link href="/categories">
              <Button variant="ghost" size="sm" className={`text-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 ${showAllCategories ? 'bg-secondary' : ''}`}>
                <Menu className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" />
                {t("nav.allCategories")}
                <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${showAllCategories ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
          <div className="h-4 w-px bg-border mx-2" />
          {navCategories.map((category) => (
            <div
              key={category.name}
              className="relative group"
              onMouseEnter={() => handleCategoryHover(category.id)}
              onMouseLeave={() => handleCategoryHover(null)}
            >
              <Link href={category.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 ${hoveredCategory === category.id ? 'bg-secondary text-foreground' : ''}`}
                >
                  <category.icon className={`w-4 h-4 mr-2 transition-all duration-200 ${hoveredCategory === category.id ? 'text-violet-500 scale-110' : ''}`} />
                  {t(`nav.${category.name}`)}
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${hoveredCategory === category.id ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>
          ))}
          <div
            onMouseEnter={() => handleDealsHover(true)}
            onMouseLeave={() => handleDealsHover(false)}
          >
            <Link href="/deals">
              <Button variant="ghost" size="sm" className={`text-violet-500 hover:text-violet-600 hover:bg-violet-500/10 transition-all duration-200 ${showDeals ? 'bg-violet-500/10' : ''}`}>
                {t("common.deals")}
                <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${showDeals ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Category Dropdown Preview */}
        <div
          className={`absolute left-0 right-0 bg-card border-t border-border shadow-lg z-40 hidden md:block transition-all duration-300 ease-out ${
            showCategoryDropdown && hoveredCategory
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => hoveredCategory && handleCategoryHover(hoveredCategory)}
          onMouseLeave={() => handleCategoryHover(null)}
        >
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-4 gap-4">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group flex gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="relative w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.product_images[0]?.image_url || '/placeholder.png'}
                        alt={product.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-violet-500 transition-colors">
                        {locale === 'sq' ? product.name_sq : product.name_en}
                      </p>
                      <p className="text-violet-500 text-sm font-semibold mt-1">
                        {formatPrice(product.price_all, product.price_eur)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border text-center">
                <Link
                  href={navCategories.find(c => c.id === hoveredCategory)?.href || '/categories'}
                  className="text-violet-500 font-medium hover:text-violet-600"
                >
                  {locale === 'sq' ? 'Shiko të gjitha' : 'View all'} {t(`nav.${hoveredCategory}`)} →
                </Link>
              </div>
            </div>
          </div>

        {/* All Categories Dropdown */}
        <div
          className={`absolute left-0 right-0 bg-card border-t border-border shadow-lg z-40 hidden md:block transition-all duration-300 ease-out ${
            showAllCategories
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => handleAllCategoriesHover(true)}
          onMouseLeave={() => handleAllCategoriesHover(false)}
        >
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-5 gap-4">
                {productCategories.map((category) => {
                  const IconComponent = categoryIcons[category.id] || Laptop
                  const categoryProductsList = getProductsByCategory(category.id).slice(0, 2)
                  return (
                    <div key={category.id} className="space-y-3">
                      <Link
                        href={`/categories/${category.id}`}
                        className="flex items-center gap-2 font-semibold text-foreground hover:text-violet-500 transition-colors"
                      >
                        <IconComponent className="w-5 h-5" />
                        {locale === 'sq' ? category.name_sq : category.name_en}
                      </Link>
                      <div className="space-y-2">
                        {categoryProductsList.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="block text-sm text-muted-foreground hover:text-violet-500 transition-colors truncate"
                          >
                            {locale === 'sq' ? product.name_sq : product.name_en}
                          </Link>
                        ))}
                        <Link
                          href={`/categories/${category.id}`}
                          className="block text-sm text-violet-500 font-medium hover:text-violet-600"
                        >
                          {locale === 'sq' ? 'Më shumë' : 'More'} →
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        {/* Deals Dropdown */}
        <div
          className={`absolute left-0 right-0 bg-card border-t border-border shadow-lg z-40 hidden md:block transition-all duration-300 ease-out ${
            showDeals
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => handleDealsHover(true)}
          onMouseLeave={() => handleDealsHover(false)}
        >
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">
                  {locale === 'sq' ? 'Ofertat e Ditës' : 'Today\'s Deals'}
                </h3>
                <Link href="/deals" className="text-violet-500 font-medium hover:text-violet-600 transition-colors duration-200">
                  {locale === 'sq' ? 'Shiko të gjitha ofertat' : 'View all deals'} →
                </Link>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {dealsProducts.map((product) => {
                  const discount = product.original_price_all
                    ? Math.round(((product.original_price_all - product.price_all) / product.original_price_all) * 100)
                    : 0
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group text-center"
                    >
                      <div className="relative w-full aspect-square bg-secondary rounded-lg overflow-hidden mb-2">
                        <Image
                          src={product.product_images[0]?.image_url || '/placeholder.png'}
                          alt={product.name_en}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="150px"
                        />
                        {discount > 0 && (
                          <span className="absolute top-2 left-2 bg-violet-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{discount}%
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-violet-500 transition-colors">
                        {locale === 'sq' ? product.name_sq : product.name_en}
                      </p>
                      <div className="mt-1">
                        <span className="text-violet-500 font-bold">
                          {formatPrice(product.price_all, product.price_eur)}
                        </span>
                        {product.original_price_all && (
                          <span className="text-muted-foreground text-sm line-through ml-2">
                            {formatPrice(product.original_price_all, product.original_price_eur || 0)}
                          </span>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder={t("common.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground"
                />
              </div>
            </form>

            {/* Mobile Categories */}
            <nav className="grid grid-cols-2 gap-2">
              {navCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 bg-secondary rounded-lg text-foreground hover:bg-secondary/80"
                >
                  <category.icon className="w-5 h-5" />
                  <span>{t(`nav.${category.name}`)}</span>
                </Link>
              ))}
              <Link
                href="/deals"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-3 bg-violet-500/10 rounded-lg text-violet-500 hover:bg-violet-500/20 col-span-2 transition-all duration-200"
              >
                <span className="font-medium">{t("common.deals")}</span>
              </Link>
            </nav>

            {/* Mobile Auth */}
            {user ? (
              <div className="space-y-2 pt-4 border-t border-border">
                <Link
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 bg-secondary rounded-lg text-foreground"
                >
                  <User className="w-5 h-5" />
                  {t("account.myAccount")}
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-violet-500"
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
              <div className="flex gap-2 pt-4 border-t border-border">
                <Link href="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-border">
                    {t("auth.signIn")}
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white">
                    {t("auth.signUp")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Language/Currency/Theme */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocale(locale === "en" ? "sq" : "en")}
                className="text-muted-foreground"
              >
                <Globe className="w-4 h-4 mr-2" />
                {locale === "en" ? "EN" : "SQ"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrency(currency === "ALL" ? "EUR" : "ALL")}
                className="text-muted-foreground"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {currency}
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
