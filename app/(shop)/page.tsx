"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import { useWishlist } from "@/contexts/wishlist-context"
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Laptop,
  Smartphone,
  Tv,
  Gamepad2,
  Home,
  Headphones,
  Cpu,
  Camera,
  Watch,
  Truck,
  Shield,
  Clock,
  Tag,
  Flame,
  Sparkles,
  Timer,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Categories for sidebar
const sidebarCategories = [
  { name_en: "Computers, Laptops & Monitors", name_sq: "Kompjuter, Laptop & Monitor", icon: Laptop, href: "/categories/computers" },
  { name_en: "Phones, Tablets & Navigation", name_sq: "Celular, Tablet & Navigim", icon: Smartphone, href: "/categories/phones" },
  { name_en: "TV, Audio & Photo", name_sq: "TV, Audio & Foto", icon: Tv, href: "/categories/tv-audio" },
  { name_en: "Gaming", name_sq: "Gaming", icon: Gamepad2, href: "/categories/gaming" },
  { name_en: "Smart Home", name_sq: "SMART", icon: Home, href: "/categories/smart-home" },
  { name_en: "Accessories", name_sq: "Aksesorë", icon: Headphones, href: "/categories/accessories" },
  { name_en: "PC Components", name_sq: "Pjesë për kompjuter", icon: Cpu, href: "/categories/components" },
]

// Hero banners
const heroBanners = [
  {
    id: 1,
    title_en: "Gaming Setup",
    title_sq: "GAMING SETUP",
    subtitle_en: "Everything you need for the perfect gaming experience",
    subtitle_sq: "Gjithçka për një eksperiencë perfekte gaming",
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=1200&h=500&fit=crop",
    cta_en: "Shop Now",
    cta_sq: "BLI TANI",
    href: "/categories/gaming",
    bgColor: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title_en: "New iPhone 15 Pro",
    title_sq: "iPhone 15 Pro i Ri",
    subtitle_en: "The most powerful iPhone ever made",
    subtitle_sq: "iPhone më i fuqishëm i krijuar ndonjëherë",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&h=500&fit=crop",
    cta_en: "Discover",
    cta_sq: "ZBULO",
    href: "/products/iphone-15-pro",
    bgColor: "from-gray-900 to-gray-700",
  },
  {
    id: 3,
    title_en: "Smart Home Solutions",
    title_sq: "Zgjidhje Smart Home",
    subtitle_en: "Make your home smarter",
    subtitle_sq: "Bëje shtëpinë tënde më të zgjuar",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1200&h=500&fit=crop",
    cta_en: "Explore",
    cta_sq: "EKSPLORO",
    href: "/categories/smart-home",
    bgColor: "from-blue-500 to-cyan-500",
  },
]

// Product categories for tabs
const productTabs = [
  { id: "for-you", name_en: "For You", name_sq: "Për ty" },
  { id: "gaming", name_en: "Gaming", name_sq: "Gaming" },
  { id: "computers", name_en: "Computers", name_sq: "Kompjuter" },
  { id: "laptops", name_en: "Laptops", name_sq: "Laptop" },
  { id: "phones", name_en: "Phones", name_sq: "Celular" },
  { id: "tv", name_en: "TV", name_sq: "TV" },
  { id: "audio", name_en: "Headphones", name_sq: "Kufje" },
]

// Mock products with realistic data
const mockProducts = {
  "for-you": [
    {
      id: "1",
      slug: "macbook-air-m3",
      name_en: "MacBook Air 15\" M3 Chip 256GB",
      name_sq: "MacBook Air 15\" M3 Chip 256GB",
      price_all: 169900,
      price_eur: 1499,
      original_price_all: 189900,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-11%",
    },
    {
      id: "2",
      slug: "iphone-15-pro-max",
      name_en: "iPhone 15 Pro Max 256GB Natural Titanium",
      name_sq: "iPhone 15 Pro Max 256GB Natural Titanium",
      price_all: 159900,
      price_eur: 1399,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
      badge: "new",
    },
    {
      id: "3",
      slug: "samsung-qled-65",
      name_en: "Samsung 65\" QLED 4K Smart TV QE65Q80C",
      name_sq: "Samsung 65\" QLED 4K Smart TV QE65Q80C",
      price_all: 129900,
      price_eur: 1149,
      original_price_all: 159900,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-19%",
    },
    {
      id: "4",
      slug: "sony-wh-1000xm5",
      name_en: "Sony WH-1000XM5 Wireless Headphones Black",
      name_sq: "Sony WH-1000XM5 Kufje Wireless të Zeza",
      price_all: 39900,
      price_eur: 349,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
      badge: "48h",
    },
    {
      id: "5",
      slug: "ps5-slim",
      name_en: "PlayStation 5 Slim Digital Edition",
      name_sq: "PlayStation 5 Slim Digital Edition",
      price_all: 49900,
      price_eur: 449,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      badge: "new",
    },
  ],
  gaming: [
    {
      id: "6",
      slug: "ps5-console",
      name_en: "PlayStation 5 Console Disc Edition",
      name_sq: "PlayStation 5 Konsol me Disk",
      price_all: 59900,
      price_eur: 549,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      badge: "hot",
    },
    {
      id: "7",
      slug: "xbox-series-x",
      name_en: "Xbox Series X 1TB Console",
      name_sq: "Xbox Series X 1TB Konsol",
      price_all: 54900,
      price_eur: 499,
      image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    },
    {
      id: "8",
      slug: "nintendo-switch-oled",
      name_en: "Nintendo Switch OLED Model White",
      name_sq: "Nintendo Switch OLED Model i Bardhë",
      price_all: 39900,
      price_eur: 349,
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-10%",
    },
    {
      id: "9",
      slug: "razer-deathadder",
      name_en: "Razer DeathAdder V3 Gaming Mouse",
      name_sq: "Razer DeathAdder V3 Mouse Gaming",
      price_all: 8900,
      price_eur: 79,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    },
    {
      id: "10",
      slug: "logitech-g-pro",
      name_en: "Logitech G PRO X Gaming Headset",
      name_sq: "Logitech G PRO X Kufje Gaming",
      price_all: 14900,
      price_eur: 129,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
      badge: "new",
    },
  ],
  computers: [
    {
      id: "11",
      slug: "imac-24",
      name_en: "Apple iMac 24\" M3 8GB/256GB Silver",
      name_sq: "Apple iMac 24\" M3 8GB/256GB Argjend",
      price_all: 169900,
      price_eur: 1499,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      badge: "new",
    },
    {
      id: "12",
      slug: "dell-inspiron-desktop",
      name_en: "Dell Inspiron Desktop i7/16GB/512GB",
      name_sq: "Dell Inspiron Desktop i7/16GB/512GB",
      price_all: 89900,
      price_eur: 799,
      original_price_all: 99900,
      image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-10%",
    },
    {
      id: "13",
      slug: "lg-ultragear-27",
      name_en: "LG UltraGear 27\" 165Hz Gaming Monitor",
      name_sq: "LG UltraGear 27\" 165Hz Monitor Gaming",
      price_all: 34900,
      price_eur: 299,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      badge: "hot",
    },
    {
      id: "14",
      slug: "samsung-odyssey-g5",
      name_en: "Samsung Odyssey G5 34\" Curved Monitor",
      name_sq: "Samsung Odyssey G5 34\" Monitor Curved",
      price_all: 44900,
      price_eur: 399,
      image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=400&fit=crop",
    },
    {
      id: "15",
      slug: "logitech-mx-keys",
      name_en: "Logitech MX Keys Advanced Keyboard",
      name_sq: "Logitech MX Keys Tastierë Advanced",
      price_all: 12900,
      price_eur: 109,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    },
  ],
  laptops: [
    {
      id: "16",
      slug: "macbook-pro-14",
      name_en: "MacBook Pro 14\" M3 Pro 18GB/512GB",
      name_sq: "MacBook Pro 14\" M3 Pro 18GB/512GB",
      price_all: 229900,
      price_eur: 1999,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      badge: "new",
    },
    {
      id: "17",
      slug: "dell-xps-15",
      name_en: "Dell XPS 15 i7/16GB/512GB OLED",
      name_sq: "Dell XPS 15 i7/16GB/512GB OLED",
      price_all: 179900,
      price_eur: 1599,
      original_price_all: 199900,
      image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-10%",
    },
    {
      id: "18",
      slug: "asus-rog-strix",
      name_en: "ASUS ROG Strix G16 RTX 4070 Gaming",
      name_sq: "ASUS ROG Strix G16 RTX 4070 Gaming",
      price_all: 189900,
      price_eur: 1699,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
      badge: "hot",
    },
    {
      id: "19",
      slug: "hp-spectre-x360",
      name_en: "HP Spectre x360 14\" 2-in-1 Laptop",
      name_sq: "HP Spectre x360 14\" 2-in-1 Laptop",
      price_all: 149900,
      price_eur: 1299,
      image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400&h=400&fit=crop",
    },
    {
      id: "20",
      slug: "lenovo-thinkpad-x1",
      name_en: "Lenovo ThinkPad X1 Carbon Gen 11",
      name_sq: "Lenovo ThinkPad X1 Carbon Gen 11",
      price_all: 169900,
      price_eur: 1499,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
      badge: "48h",
    },
  ],
  phones: [
    {
      id: "21",
      slug: "iphone-15",
      name_en: "iPhone 15 128GB Blue",
      name_sq: "iPhone 15 128GB Blu",
      price_all: 99900,
      price_eur: 899,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
      badge: "new",
    },
    {
      id: "22",
      slug: "samsung-s24-ultra",
      name_en: "Samsung Galaxy S24 Ultra 256GB",
      name_sq: "Samsung Galaxy S24 Ultra 256GB",
      price_all: 139900,
      price_eur: 1249,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
      badge: "hot",
    },
    {
      id: "23",
      slug: "google-pixel-8",
      name_en: "Google Pixel 8 Pro 128GB Obsidian",
      name_sq: "Google Pixel 8 Pro 128GB Obsidian",
      price_all: 109900,
      price_eur: 999,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    },
    {
      id: "24",
      slug: "xiaomi-14",
      name_en: "Xiaomi 14 Ultra 512GB Black",
      name_sq: "Xiaomi 14 Ultra 512GB i Zi",
      price_all: 129900,
      price_eur: 1149,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      badge: "new",
    },
    {
      id: "25",
      slug: "oneplus-12",
      name_en: "OnePlus 12 256GB Silky Black",
      name_sq: "OnePlus 12 256GB Silky Black",
      price_all: 89900,
      price_eur: 799,
      original_price_all: 99900,
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-10%",
    },
  ],
  tv: [
    {
      id: "26",
      slug: "lg-oled-c3-55",
      name_en: "LG OLED C3 55\" 4K Smart TV",
      name_sq: "LG OLED C3 55\" 4K Smart TV",
      price_all: 139900,
      price_eur: 1249,
      original_price_all: 169900,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-18%",
    },
    {
      id: "27",
      slug: "samsung-neo-qled-75",
      name_en: "Samsung 75\" Neo QLED 4K QN85C",
      name_sq: "Samsung 75\" Neo QLED 4K QN85C",
      price_all: 219900,
      price_eur: 1999,
      image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop",
      badge: "new",
    },
    {
      id: "28",
      slug: "sony-bravia-xr-65",
      name_en: "Sony Bravia XR 65\" OLED A80L",
      name_sq: "Sony Bravia XR 65\" OLED A80L",
      price_all: 189900,
      price_eur: 1699,
      image: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=400&h=400&fit=crop",
      badge: "hot",
    },
    {
      id: "29",
      slug: "hisense-50-4k",
      name_en: "Hisense 50\" 4K UHD Smart TV",
      name_sq: "Hisense 50\" 4K UHD Smart TV",
      price_all: 34900,
      price_eur: 299,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop",
    },
    {
      id: "30",
      slug: "tcl-43-4k",
      name_en: "TCL 43\" 4K Google TV",
      name_sq: "TCL 43\" 4K Google TV",
      price_all: 27900,
      price_eur: 249,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      badge: "48h",
    },
  ],
  audio: [
    {
      id: "31",
      slug: "airpods-pro-2",
      name_en: "Apple AirPods Pro 2nd Gen USB-C",
      name_sq: "Apple AirPods Pro Gen 2 USB-C",
      price_all: 29900,
      price_eur: 269,
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
      badge: "hot",
    },
    {
      id: "32",
      slug: "bose-qc45",
      name_en: "Bose QuietComfort 45 Headphones",
      name_sq: "Bose QuietComfort 45 Kufje",
      price_all: 34900,
      price_eur: 299,
      original_price_all: 39900,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      badge: "sale",
      discount: "-13%",
    },
    {
      id: "33",
      slug: "jbl-flip-6",
      name_en: "JBL Flip 6 Portable Speaker",
      name_sq: "JBL Flip 6 Altoparlant Portativ",
      price_all: 12900,
      price_eur: 109,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      badge: "new",
    },
    {
      id: "34",
      slug: "samsung-buds-2-pro",
      name_en: "Samsung Galaxy Buds 2 Pro",
      name_sq: "Samsung Galaxy Buds 2 Pro",
      price_all: 19900,
      price_eur: 179,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    },
    {
      id: "35",
      slug: "sonos-beam-gen2",
      name_en: "Sonos Beam Gen 2 Soundbar",
      name_sq: "Sonos Beam Gen 2 Soundbar",
      price_all: 49900,
      price_eur: 449,
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
      badge: "48h",
    },
  ],
}

// Trending products (separate section)
const trendingProducts = [
  {
    id: "t1",
    slug: "apple-watch-ultra-2",
    name_en: "Apple Watch Ultra 2 GPS + Cellular",
    name_sq: "Apple Watch Ultra 2 GPS + Cellular",
    price_all: 89900,
    price_eur: 799,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
    badge: "trending",
  },
  {
    id: "t2",
    slug: "dyson-v15",
    name_en: "Dyson V15 Detect Absolute",
    name_sq: "Dyson V15 Detect Absolute",
    price_all: 79900,
    price_eur: 699,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    badge: "trending",
  },
  {
    id: "t3",
    slug: "gopro-hero-12",
    name_en: "GoPro HERO12 Black Creator Edition",
    name_sq: "GoPro HERO12 Black Creator Edition",
    price_all: 54900,
    price_eur: 499,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=400&fit=crop",
    badge: "trending",
  },
  {
    id: "t4",
    slug: "dji-mini-4-pro",
    name_en: "DJI Mini 4 Pro Fly More Combo",
    name_sq: "DJI Mini 4 Pro Fly More Combo",
    price_all: 119900,
    price_eur: 1099,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    badge: "trending",
  },
]

export default function HomePage() {
  const { locale, t } = useLanguage()
  const { formatPrice } = useCurrency()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [activeTab, setActiveTab] = useState("for-you")
  const [currentBanner, setCurrentBanner] = useState(0)

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % heroBanners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)
  }

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "sale":
        return "bg-red-500 text-white"
      case "new":
        return "bg-green-500 text-white"
      case "hot":
        return "bg-orange-500 text-white"
      case "48h":
        return "bg-blue-500 text-white"
      case "trending":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getBadgeText = (badge: string, discount?: string) => {
    if (badge === "sale" && discount) return discount
    switch (badge) {
      case "sale":
        return locale === "sq" ? "E shitur" : "Sale"
      case "new":
        return locale === "sq" ? "Risi" : "New"
      case "hot":
        return locale === "sq" ? "E nxehtë" : "Hot"
      case "48h":
        return "48h"
      case "trending":
        return locale === "sq" ? "Trend" : "Trending"
      default:
        return badge
    }
  }

  const currentProducts = mockProducts[activeTab as keyof typeof mockProducts] || mockProducts["for-you"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Categories */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {sidebarCategories.map((category, index) => (
                <Link
                  key={category.name_en}
                  href={category.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group",
                    index !== sidebarCategories.length - 1 && "border-b border-gray-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {locale === "sq" ? category.name_sq : category.name_en}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Hero Banner Carousel */}
            <div className="relative rounded-xl overflow-hidden mb-6 h-[300px] md:h-[380px]">
              {heroBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    index === currentBanner ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor}`} />
                  <Image
                    src={banner.image}
                    alt={locale === "sq" ? banner.title_sq : banner.title_en}
                    fill
                    className="object-cover mix-blend-overlay opacity-50"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 flex items-center px-8 md:px-12">
                    <div className="max-w-lg">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                        {locale === "sq" ? banner.title_sq : banner.title_en}
                      </h1>
                      <p className="text-lg text-white/90 mb-6">
                        {locale === "sq" ? banner.subtitle_sq : banner.subtitle_en}
                      </p>
                      <Link href={banner.href}>
                        <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8">
                          {locale === "sq" ? banner.cta_sq : banner.cta_en}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Banner Navigation */}
              <button
                onClick={prevBanner}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextBanner}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* Banner Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {heroBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentBanner ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Mini Banners */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Link href="/deals" className="relative h-20 rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {locale === "sq" ? "ZBRITJE DERI -50%" : "UP TO 50% OFF"}
                  </span>
                </div>
              </Link>
              <Link href="/categories/gaming" className="relative h-20 rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GAMING ZONE</span>
                </div>
              </Link>
              <Link href="/categories/phones" className="relative h-20 rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {locale === "sq" ? "TELEFONA TË RI" : "NEW PHONES"}
                  </span>
                </div>
              </Link>
              <Link href="/categories/smart-home" className="relative h-20 rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SMART HOME</span>
                </div>
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Trust Badges Section */}
      <section className="bg-white border-y border-gray-200 py-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {locale === "sq" ? "Blerje të sigurta" : "Safe Shopping"}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {locale === "sq" ? "Dërgesa të shpejta" : "Fast Delivery"}
                </p>
                <p className="text-xs text-gray-500">
                  {locale === "sq" ? "Kudo në Shqipëri" : "Across Albania"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {locale === "sq" ? "Mbi 100,000 produkte" : "Over 100,000 products"}
                </p>
                <p className="text-xs text-gray-500">
                  {locale === "sq" ? "Origjinale dhe me garanci" : "Original with warranty"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {locale === "sq" ? "Kujdesi ndaj klientit" : "Customer Care"}
                </p>
                <p className="text-xs text-gray-500">
                  {locale === "sq" ? "Prano përgjigje brenda sekondave" : "Quick response time"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {locale === "sq" ? "Çmimi më i mirë i garantuar" : "Best Price Guaranteed"}
                </p>
                <p className="text-xs text-gray-500">
                  {locale === "sq" ? "Në çdo produkt" : "On every product"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "sq" ? "Të rekomanduara" : "Recommended"}
        </h2>

        {/* Product Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2 border-b border-gray-200">
          {productTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors",
                activeTab === tab.id
                  ? "text-red-500 border-b-2 border-red-500 -mb-[1px]"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {locale === "sq" ? tab.name_sq : tab.name_en}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-all group h-full">
                <div className="relative aspect-square bg-gray-50 p-4">
                  <Image
                    src={product.image}
                    alt={locale === "sq" ? product.name_sq : product.name_en}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className={cn("absolute top-2 left-2", getBadgeStyle(product.badge))}>
                      {product.badge === "48h" && <Timer className="w-3 h-3 mr-1" />}
                      {product.badge === "hot" && <Flame className="w-3 h-3 mr-1" />}
                      {product.badge === "new" && <Sparkles className="w-3 h-3 mr-1" />}
                      {getBadgeText(product.badge, product.discount)}
                    </Badge>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    className={cn(
                      "absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-colors",
                      isInWishlist(product.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", isInWishlist(product.id) && "fill-current")} />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px] group-hover:text-red-500 transition-colors">
                    {locale === "sq" ? product.name_sq : product.name_en}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      {formatPrice(product.price_all, product.price_eur)}
                    </span>
                    {product.original_price_all && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.original_price_all, product.original_price_all / 113)}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              {locale === "sq" ? "Në Trend" : "Trending Now"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="bg-gray-50 border-gray-200 hover:shadow-lg transition-all group h-full">
                  <div className="relative aspect-square p-4">
                    <Image
                      src={product.image}
                      alt={locale === "sq" ? product.name_sq : product.name_en}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-purple-500 text-white">
                      <Flame className="w-3 h-3 mr-1" />
                      Trend
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px] group-hover:text-red-500 transition-colors">
                      {locale === "sq" ? product.name_sq : product.name_en}
                    </h3>
                    <span className="text-lg font-bold text-red-500">
                      {formatPrice(product.price_all, product.price_eur)}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {locale === "sq" ? "Abonohu për oferta ekskluzive" : "Subscribe for exclusive deals"}
            </h2>
            <p className="text-gray-500 mb-6">
              {locale === "sq"
                ? "Merr njoftimet e para për zbritje dhe produkte të reja"
                : "Be the first to know about discounts and new products"}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={locale === "sq" ? "Email-i juaj" : "Your email"}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <Button className="bg-red-500 hover:bg-red-600 px-8">
                {locale === "sq" ? "Abonohu" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
