"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    // If we're not on the homepage, navigate to homepage first
    if (pathname !== '/') {
      // Use window.location for proper hash navigation
      window.location.href = `/#${sectionId}`
      setIsMenuOpen(false)
      return
    }
    
    // If we're on homepage, scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 glass-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <Image src="/deluxo-logo.png" alt="Deluxo Logo" fill className="object-contain" />
            </div>
            <span className="font-heading font-bold text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Deluxo Marketplace
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("products")}
              className="text-foreground/80 hover:text-purple-400 transition-all duration-200 font-medium"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("categories")}
              className="text-foreground/80 hover:text-purple-400 transition-all duration-200 font-medium"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection("support")}
              className="text-foreground/80 hover:text-purple-400 transition-all duration-200 font-medium"
            >
              Support
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search GTA V accounts..."
                className="pl-10 glass-card border-purple-500/20 focus:border-purple-400/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex hover:bg-purple-500/10">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={onCartClick}
              className="gradient-primary hover:opacity-90 shadow-lg transition-opacity"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                {cartCount}
              </Badge>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 glass-card">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search GTA V accounts..." className="pl-10 glass-card border-purple-500/20" />
              </div>
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-foreground/80 hover:text-purple-400 transition-colors py-2 font-medium text-left"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection("categories")}
                  className="text-foreground/80 hover:text-purple-400 transition-colors py-2 font-medium text-left"
                >
                  Categories
                </button>
                <button
                  onClick={() => scrollToSection("support")}
                  className="text-foreground/80 hover:text-purple-400 transition-colors py-2 font-medium text-left"
                >
                  Support
                </button>
              </nav>
              <Button variant="ghost" className="justify-start hover:bg-purple-500/10">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
