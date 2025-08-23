"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/types"

export const products: Product[] = [
  {
    id: 1,
    title: "PC Money Boosting Service",
    subtitle: "Fast and secure money boosting for PC players",
    price: 14.99,
    originalPrice: 19.99,
    platform: "PC Enhanced",
    accountType: "Money Boost",
    level: "1-8000",
    cash: 1000000000,
    image: "/gta-pc-money-boost.png",
    seller: "Deluxo",
    rating: 4.9,
    reviews: 1247,
    isOnline: true,
    badge: "MONEY BOOST",
    description:
      "Professional money boosting service for PC players. Choose your tier and get billions in GTA$ delivered safely to your account.",
    features: [
      "100% Safe & Secure",
      "Any Rank Available",
      "All Unlocks Included",
      "Fast Delivery",
      "24/7 Support",
      "Money Back Guarantee",
    ],
    screenshots: ["/gta-pc-money-boost.png", "/gta-pc-modded-cars.png"],
    variants: [
      {
        id: "pc-tier1",
        name: "Tier 1 - 1 Billion",
        price: 14.99,
        cash: 1000000000,
        description: "1 Billion GTA$ - Any Rank - All Unlocks",
        features: [
          "1 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Fast Delivery (1-2 hours)",
          "24/7 Support",
        ],
      },
      {
        id: "pc-tier2",
        name: "Tier 2 - 2 Billion",
        price: 16.99,
        cash: 2000000000,
        description: "2 Billion GTA$ - Any Rank - All Unlocks",
        features: [
          "2 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Fast Delivery (1-2 hours)",
          "24/7 Support",
        ],
      },
      {
        id: "pc-tier3",
        name: "Tier 3 - 3 Billion",
        price: 18.99,
        cash: 3000000000,
        description: "3 Billion GTA$ - Any Rank - All Unlocks",
        features: [
          "3 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Fast Delivery (1-2 hours)",
          "24/7 Support",
        ],
      },
      {
        id: "pc-tier4",
        name: "Tier 4 - 4 Billion",
        price: 19.99,
        cash: 4000000000,
        description: "4 Billion GTA$ - Any Rank - All Unlocks",
        features: [
          "4 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Fast Delivery (1-2 hours)",
          "24/7 Support",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "PC Modded Accounts",
    subtitle: "Premium modded accounts with exclusive content",
    price: 49.99,
    originalPrice: 69.99,
    platform: "PC Enhanced",
    accountType: "Modded Account",
    level: "1-8000",
    cash: 2000000000, 
    image: "/gta-pc-modded-cars.png",
    seller: "Deluxo",
    rating: 4.8,
    reviews: 892,
    isOnline: true,
    badge: "MODDED",
    description: "Premium modded accounts with exclusive vehicles, outfits, and massive cash reserves.",
    features: [
      "Modded Outfits & Cars",
      "Any Rank Available",
      "All Unlocks Included",
      "Instant Delivery",
      "VIP Support",
    ],
    screenshots: ["/gta-pc-modded-cars.png", "/gta-pc-money-boost.png"],
    variants: [
      {
        id: "pc-mod-a",
        name: "Tier A - 2 Billion",
        price: 49.99,
        cash: 2000000000,
        description: "2 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "2 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Instant Delivery",
        ],
      },
      {
        id: "pc-mod-b",
        name: "Tier B - 4 Billion",
        price: 59.99,
        cash: 4000000000,
        description: "4 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "4 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Instant Delivery",
        ],
      },
      {
        id: "pc-mod-c",
        name: "Tier C - 6 Billion",
        price: 65.99,
        cash: 6000000000,
        description: "6 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "6 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Instant Delivery",
        ],
      },
      {
        id: "pc-mod-d",
        name: "Tier D - 20 Billion",
        price: 75.99,
        cash: 20000000000,
        description: "20 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "20 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "VIP Support Included",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Console Money Boosting (PS4/PS5/Xbox)",
    subtitle: "Console money boosting with modded content",
    price: 72.99,
    originalPrice: 89.99,
    platform: "Console",
    accountType: "Money Boost",
    level: "1-8000",
    cash: 2000000000,
    image: "/gta-console-money-boost.png",
    seller: "Deluxo",
    rating: 4.7,
    reviews: 654,
    isOnline: true,
    badge: "CONSOLE",
    description: "Professional money boosting service for PS4, PS5, and Xbox players with modded content included.",
    features: [
      "Console Compatible",
      "Modded Outfits & Cars",
      "Any Rank Available",
      "All Unlocks Included",
      "Premium Support",
    ],
    screenshots: ["/gta-console-money-boost.png", "/gta-console-modded-cars.png"],
    variants: [
      {
        id: "console-tier1",
        name: "Tier 1 - 2 Billion",
        price: 72.99,
        cash: 2000000000,
        description: "2 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "2 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Console Optimized",
        ],
      },
      {
        id: "console-tier2",
        name: "Tier 2 - 4 Billion",
        price: 82.99,
        cash: 4000000000,
        description: "4 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "4 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Console Optimized",
        ],
      },
      {
        id: "console-tier3",
        name: "Tier 3 - 6 Billion",
        price: 99.99,
        cash: 6000000000,
        description: "6 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "6 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Console Optimized",
        ],
      },
      {
        id: "console-tier4",
        name: "Tier 4 - 10 Billion",
        price: 109.99,
        cash: 10000000000,
        description: "10 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "10 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Premium Support",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Console Modded Accounts (PS4/PS5/Xbox)",
    subtitle: "Premium console accounts with exclusive modded content",
    price: 72.99,
    originalPrice: 99.99,
    platform: "Console",
    accountType: "Modded Account",
    level: "1-8000",
    cash: 4000000000,
    image: "/gta-console-modded-cars.png",
    seller: "Deluxo",
    rating: 4.8,
    reviews: 423,
    isOnline: true,
    badge: "CONSOLE MODDED",
    description: "Premium modded accounts specifically designed for console players with exclusive content.",
    features: [
      "Console Optimized",
      "Modded Outfits & Cars",
      "Any Rank Available",
      "All Unlocks Included",
      "VIP Support",
    ],
    screenshots: ["/gta-console-modded-cars.png", "/gta-console-money-boost.png"],
    variants: [
      {
        id: "console-mod-a",
        name: "Tier A - 4 Billion",
        price: 72.99,
        cash: 4000000000,
        description: "4 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "4 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Console Optimized",
        ],
      },
      {
        id: "console-mod-b",
        name: "Tier B - 6 Billion",
        price: 84.99,
        cash: 6000000000,
        description: "6 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "6 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Console Optimized",
        ],
      },
      {
        id: "console-mod-c",
        name: "Tier C - 10 Billion",
        price: 102.99,
        cash: 10000000000,
        description: "10 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "10 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "Premium Support",
        ],
      },
      {
        id: "console-mod-d",
        name: "Tier D - 20 Billion",
        price: 119.99,
        cash: 20000000000,
        description: "20 Billion - Any Rank - All Unlocks - Modded Outfits & Cars",
        features: [
          "20 Billion GTA$",
          "Any Rank Available",
          "All Unlocks Included",
          "Modded Outfits & Cars",
          "VIP Support Included",
        ],
      },
    ],
  },
]

interface CartItem {
  id: number
  title: string
  price: number
  image: string
}

interface ProductGridProps {
  onAddToCart: (product: any, variant?: any) => void
  filters?: {
    platforms: string[]
    accountTypes: string[]
    priceRange: [number, number]
  }
}

export function ProductGrid({ onAddToCart, filters }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("recommended")
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!filters) return products

    return products.filter((product) => {
      // Platform filter
      if (filters.platforms.length > 0 && !filters.platforms.includes(product.platform)) {
        return false
      }

      // Account type filter
      if (filters.accountTypes.length > 0 && product.accountType && !filters.accountTypes.includes(product.accountType)) {
        return false
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      return true
    })
  }, [filters])

  const itemsPerPage = 12
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handleProductClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setSelectedVariant(null)
    setIsModalOpen(true)
  }

  const handleVariantClick = (variant: any) => {
    setSelectedVariant(variant)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    setSelectedVariant(null)
  }

  const handleAddToCart = (product: (typeof products)[0], variant?: any) => {
    onAddToCart(product, variant)
    handleCloseModal()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading font-bold text-3xl gradient-text">GTA V Premium Accounts</h2>
          <p className="text-muted-foreground text-lg">Discover exclusive GTA V accounts from Deluxo</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 glass-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border border-border/50 rounded-lg glass-card">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} premium
          GTA V accounts
        </p>
      </div>

      {/* Product Grid */}
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
        }
      >
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onProductClick={handleProductClick}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="glass-card"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = i + 1
          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(pageNum)}
              className="w-10 glass-card"
            >
              {pageNum}
            </Button>
          )
        })}

        {totalPages > 5 && (
          <>
            <span className="text-muted-foreground">...</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)} className="w-10 glass-card">
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="glass-card"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  )
}
