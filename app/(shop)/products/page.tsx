"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Grid, List, Heart, Star, SlidersHorizontal, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { products, categories, brands } from "@/lib/products-data"
import { toast } from "sonner"

export default function ProductsPage() {
  const { locale, t } = useLanguage()
  const { formatPrice } = useCurrency()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recommended")
  const [priceRange, setPriceRange] = useState([0, 400000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  // Filter products
  const filteredProducts = products.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false
    if (product.price_all < priceRange[0] || product.price_all > priceRange[1]) return false
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":
        return a.price_all - b.price_all
      case "price_desc":
        return b.price_all - a.price_all
      case "rating":
        return b.rating_average - a.rating_average
      case "newest":
        return parseInt(b.id) - parseInt(a.id)
      default:
        return 0
    }
  })

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(locale === 'sq' ? 'Produkti u shtua në shportë' : 'Product added to cart')
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">{t("common.categories")}</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category.id])
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category.id))
                  }
                }}
                className="border-gray-300"
              />
              <span className="text-gray-700 text-sm">
                {locale === 'sq' ? category.name_sq : category.name_en}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">{t("product.brand")}</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter(b => b !== brand))
                  }
                }}
                className="border-gray-300"
              />
              <span className="text-gray-700 text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">{t("product.priceRange")}</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={400000}
          step={10000}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatPrice(priceRange[0], priceRange[0] / 100)}</span>
          <span>{formatPrice(priceRange[1], priceRange[1] / 100)}</span>
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <Button
          variant="outline"
          className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setSelectedCategories([])
            setSelectedBrands([])
            setPriceRange([0, 400000])
          }}
        >
          {t("product.clearFilters")}
        </Button>
      )}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("common.products")}</h1>
          <p className="text-gray-500 mt-1">
            {sortedProducts.length} {t("product.resultsFound")}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden border-gray-200">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {t("product.filters")}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white border-gray-200">
              <SheetHeader>
                <SheetTitle className="text-gray-900">{t("product.filters")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-white border-gray-200 text-gray-900">
              <SelectValue placeholder={t("product.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">{t("sort.recommended")}</SelectItem>
              <SelectItem value="price_asc">{t("sort.priceLowHigh")}</SelectItem>
              <SelectItem value="price_desc">{t("sort.priceHighLow")}</SelectItem>
              <SelectItem value="rating">{t("sort.rating")}</SelectItem>
              <SelectItem value="newest">{t("sort.newest")}</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="hidden md:flex border border-gray-200 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className={cn(viewMode === "grid" && "bg-gray-100")}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(viewMode === "list" && "bg-gray-100")}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className={cn(
            "grid gap-4",
            viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          )}>
            {sortedProducts.map((product) => {
              const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url || product.product_images?.[0]?.image_url || '/placeholder.png'

              return (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className={cn(
                    "bg-white border-gray-200 hover:border-red-300 hover:shadow-md overflow-hidden group cursor-pointer transition-all",
                    viewMode === "list" && "flex"
                  )}>
                    <div className={cn(
                      "relative bg-gray-100",
                      viewMode === "grid" ? "aspect-square" : "w-48 h-48 flex-shrink-0"
                    )}>
                      <Image
                        src={primaryImage}
                        alt={locale === 'sq' ? product.name_sq : product.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.is_on_sale && (
                        <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 shadow-sm",
                          isInWishlist(product.id) ? "text-red-500" : "text-gray-400"
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                      >
                        <Heart className={cn("w-4 h-4", isInWishlist(product.id) && "fill-current")} />
                      </Button>
                    </div>
                    <div className="p-4 flex-1">
                      {product.rating_count > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-900">{product.rating_average}</span>
                          <span className="text-xs text-gray-400">({product.rating_count})</span>
                        </div>
                      )}
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-red-500 transition-colors">
                        {locale === 'sq' ? product.name_sq : product.name_en}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                        {locale === 'sq' ? product.short_description_sq : product.short_description_en}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-red-500">
                            {formatPrice(product.price_all, product.price_eur)}
                          </span>
                          {product.is_on_sale && product.original_price_all && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              {formatPrice(product.original_price_all, product.original_price_eur!)}
                            </span>
                          )}
                        </div>
                        {viewMode === "list" && (
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600"
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            {t("common.addToCart")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">
                {locale === 'sq' ? 'Nuk u gjetën produkte me këto filtra.' : 'No products found with these filters.'}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedBrands([])
                  setPriceRange([0, 400000])
                }}
                className="border-gray-200"
              >
                {t("product.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
