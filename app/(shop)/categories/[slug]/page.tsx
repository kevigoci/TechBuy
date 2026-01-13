"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { ChevronRight, Heart, Star, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { products, categories } from "@/lib/products-data"
import { toast } from "sonner"

const categoryNames: Record<string, { en: string; sq: string }> = {
  computers: { en: "Computers & Laptops", sq: "Kompjuterë & Laptopë" },
  phones: { en: "Phones & Tablets", sq: "Telefona & Tableta" },
  tv: { en: "TV & Audio", sq: "TV & Audio" },
  gaming: { en: "Gaming", sq: "Gaming" },
  "smart-home": { en: "Smart Home", sq: "Shtëpi Inteligjente" },
  accessories: { en: "Accessories", sq: "Aksesorë" },
  components: { en: "PC Components", sq: "Komponentë PC" },
  "tv-audio": { en: "TV & Audio", sq: "TV & Audio" },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { locale, t } = useLanguage()
  const { formatPrice } = useCurrency()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  // Map URL slug to category ID
  const categoryMapping: Record<string, string> = {
    'computers': 'computers',
    'phones': 'phones',
    'tv-audio': 'tv',
    'tv': 'tv',
    'gaming': 'gaming',
    'smart-home': 'accessories',
    'accessories': 'accessories',
    'components': 'computers',
  }

  const categoryId = categoryMapping[slug] || slug
  const categoryProducts = products.filter(p => p.category === categoryId)
  const categoryName = categoryNames[slug] || { en: slug, sq: slug }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(locale === 'sq' ? 'Produkti u shtua në shportë' : 'Product added to cart')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">{t("common.home")}</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-gray-900">{t("common.categories")}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{locale === 'sq' ? categoryName.sq : categoryName.en}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {locale === 'sq' ? categoryName.sq : categoryName.en}
        </h1>
        <p className="text-gray-500 mt-1">
          {categoryProducts.length} {locale === 'sq' ? 'produkte' : 'products'}
        </p>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">
            {locale === 'sq'
              ? 'Nuk ka produkte në këtë kategori akoma.'
              : 'No products in this category yet.'
            }
          </p>
          <Link href="/products">
            <Button className="bg-red-500 hover:bg-red-600">
              {locale === 'sq' ? 'Shiko të gjitha produktet' : 'View all products'}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product) => {
            const primaryImage = product.product_images?.[0]?.image_url || '/placeholder.png'

            return (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="bg-white border-gray-200 hover:border-red-300 hover:shadow-md overflow-hidden group cursor-pointer transition-all h-full">
                  <div className="relative aspect-square bg-gray-100">
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
                  <CardContent className="p-4">
                    {product.rating_count > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-900">{product.rating_average}</span>
                        <span className="text-xs text-gray-400">({product.rating_count})</span>
                      </div>
                    )}
                    <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                      {locale === 'sq' ? product.name_sq : product.name_en}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-red-500">
                        {formatPrice(product.price_all, product.price_eur)}
                      </span>
                      {product.original_price_all && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.original_price_all, product.original_price_eur!)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-red-500 hover:bg-red-600"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {t("common.addToCart")}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
