"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { products, getProductsOnSale, brands } from "@/lib/products-data"
import {
  ChevronRight,
  Heart,
  Laptop,
  Smartphone,
  Tv,
  Gamepad2,
  Headphones,
  Truck,
  Shield,
  Clock,
  Tag,
  Flame,
  Sparkles,
  Timer,
  Search,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Featured brands with logos
const featuredBrands = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
  { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg" },
  { name: "ASUS", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Nintendo", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg" },
]

// Categories for quick access
const quickCategories = [
  { name_en: "Laptops", name_sq: "Laptopë", icon: Laptop, href: "/categories/computers", color: "from-blue-500 to-cyan-500" },
  { name_en: "Phones", name_sq: "Celular", icon: Smartphone, href: "/categories/phones", color: "from-purple-500 to-pink-500" },
  { name_en: "TV & Audio", name_sq: "TV & Audio", icon: Tv, href: "/categories/tv", color: "from-orange-500 to-violet-500" },
  { name_en: "Gaming", name_sq: "Gaming", icon: Gamepad2, href: "/categories/gaming", color: "from-green-500 to-emerald-500" },
  { name_en: "Accessories", name_sq: "Aksesorë", icon: Headphones, href: "/categories/accessories", color: "from-indigo-500 to-purple-500" },
]

// Product tabs
const productTabs = [
  { id: "deals", name_en: "Hot Deals", name_sq: "Ofertat", icon: Flame },
  { id: "trending", name_en: "Trending", name_sq: "Në Trend", icon: TrendingUp },
  { id: "new", name_en: "New Arrivals", name_sq: "Risi", icon: Sparkles },
]

export default function HomePage() {
  const { locale, t } = useLanguage()
  const { formatPrice } = useCurrency()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("deals")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showSearchResults, setShowSearchResults] = useState(false)

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

  const dealsProducts = getProductsOnSale()
  const trendingProducts = products.filter(p => p.rating_average >= 4.7).slice(0, 10)
  const newProducts = products.slice(0, 10)

  const getTabProducts = () => {
    switch (activeTab) {
      case "deals":
        return dealsProducts
      case "trending":
        return trendingProducts
      case "new":
        return newProducts
      default:
        return dealsProducts
    }
  }

  const currentProducts = getTabProducts()

  const getBadgeStyle = (product: typeof products[0]) => {
    if (product.is_on_sale) return "bg-violet-500 text-white"
    if (product.rating_average >= 4.8) return "bg-purple-500 text-white"
    return "bg-green-500 text-white"
  }

  const getBadgeText = (product: typeof products[0]) => {
    if (product.is_on_sale && product.original_price_all) {
      const discount = Math.round(((product.original_price_all - product.price_all) / product.original_price_all) * 100)
      return `-${discount}%`
    }
    if (product.rating_average >= 4.8) return locale === "sq" ? "Top" : "Top"
    return locale === "sq" ? "Risi" : "New"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Search Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              {locale === "sq" ? "Gjej Teknologjinë Tënde" : "Find Your Tech"}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {locale === "sq"
                ? "Kërko nga mijëra produkte elektronike me çmimet më të mira"
                : "Search thousands of electronics with the best prices"}
            </p>

            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <Input
                    type="search"
                    placeholder={locale === "sq" ? "Kërko produkte, marka, kategori..." : "Search products, brands, categories..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                    className="pl-14 pr-32 py-6 text-lg bg-white dark:bg-card border-0 shadow-2xl rounded-full text-foreground placeholder:text-gray-400 focus:ring-4 focus:ring-white/30"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-500 hover:bg-violet-600 text-white rounded-full px-6 py-2 transition-all duration-200 hover:scale-105"
                  >
                    {locale === "sq" ? "Kërko" : "Search"}
                  </Button>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchSelect(product.slug)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-secondary transition-all duration-200 text-left border-b border-border last:border-0"
                    >
                      <div className="relative w-14 h-14 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.product_images[0]?.image_url || '/placeholder.png'}
                          alt={product.name_en}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {locale === 'sq' ? product.name_sq : product.name_en}
                        </p>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                      <span className="text-violet-500 font-bold">
                        {formatPrice(product.price_all, product.price_eur)}
                      </span>
                    </button>
                  ))}
                  <Link
                    href={`/products?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowSearchResults(false)}
                    className="flex items-center justify-center gap-2 p-4 text-violet-500 font-medium hover:bg-secondary transition-colors"
                  >
                    {locale === 'sq' ? 'Shiko të gjitha rezultatet' : 'View all results'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-white/70 text-sm">
                {locale === "sq" ? "Popullarë:" : "Popular:"}
              </span>
              {["iPhone", "MacBook", "PlayStation", "Samsung TV", "AirPods"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term)
                    router.push(`/products?search=${encodeURIComponent(term)}`)
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background"/>
          </svg>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              {locale === "sq" ? "Markat Kryesore" : "Top Brands"}
            </h2>
            <Link href="/products" className="text-violet-500 text-sm font-medium hover:text-violet-600 transition-colors">
              {locale === "sq" ? "Shiko të gjitha" : "View all"} →
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.name}
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex-shrink-0 group"
              >
                <div className="w-24 h-16 md:w-32 md:h-20 bg-secondary hover:bg-secondary/80 rounded-xl flex items-center justify-center p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span className="text-sm md:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickCategories.map((category) => (
              <Link
                key={category.name_en}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10 text-white">
                  <category.icon className="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-semibold">
                    {locale === "sq" ? category.name_sq : category.name_en}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 bg-secondary border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {locale === "sq" ? "Dërgesa Falas" : "Free Delivery"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === "sq" ? "Porosi mbi 5000 ALL" : "Orders over 5000 ALL"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {locale === "sq" ? "Garanci 2 Vjet" : "2 Year Warranty"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === "sq" ? "Në çdo produkt" : "On every product"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {locale === "sq" ? "Mbështetje 24/7" : "24/7 Support"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === "sq" ? "Gjithmonë për ju" : "Always here for you"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {locale === "sq" ? "Çmimi më i mirë" : "Best Price"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === "sq" ? "I garantuar" : "Guaranteed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section with Tabs */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {locale === "sq" ? "Produkte të Nxehta" : "Hot Products"}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-secondary p-1 rounded-full">
              {productTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-violet-500 text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {locale === "sq" ? tab.name_sq : tab.name_en}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentProducts.slice(0, 10).map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 group h-full overflow-hidden hover:border-violet-500/50">
                  <div className="relative aspect-square bg-secondary p-4">
                    <Image
                      src={product.product_images[0]?.image_url || '/placeholder.png'}
                      alt={locale === "sq" ? product.name_sq : product.name_en}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className={cn("absolute top-2 left-2", getBadgeStyle(product))}>
                      {getBadgeText(product)}
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className={cn(
                        "absolute top-2 right-2 w-9 h-9 rounded-full bg-white dark:bg-card shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110",
                        isInWishlist(product.id) ? "text-violet-500" : "text-gray-400 hover:text-violet-500"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current")} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2 min-h-[40px] group-hover:text-violet-500 transition-colors">
                      {locale === "sq" ? product.name_sq : product.name_en}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-violet-500">
                        {formatPrice(product.price_all, product.price_eur)}
                      </span>
                      {product.original_price_all && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.original_price_all, product.original_price_eur || 0)}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link href={activeTab === "deals" ? "/deals" : "/products"}>
              <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white px-8 transition-all duration-300 hover:scale-105">
                {locale === "sq" ? "Shiko të gjitha produktet" : "View All Products"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {locale === "sq" ? "Abonohu për oferta ekskluzive" : "Subscribe for exclusive deals"}
            </h2>
            <p className="text-white/90 mb-8">
              {locale === "sq"
                ? "Merr njoftimet e para për zbritje dhe produkte të reja"
                : "Be the first to know about discounts and new products"}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={locale === "sq" ? "Email-i juaj" : "Your email"}
                className="flex-1 px-6 py-6 bg-white border-0 rounded-full text-foreground placeholder:text-gray-500 focus:ring-4 focus:ring-white/30"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-full transition-all duration-300 hover:scale-105">
                {locale === "sq" ? "Abonohu" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
