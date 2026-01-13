"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Laptop, Smartphone, Tv, Gamepad2, Home, Headphones, Monitor, Camera, Watch, Cpu, ChevronRight } from "lucide-react"

const categories = [
  {
    slug: "computers",
    name_en: "Computers & Laptops",
    name_sq: "Kompjuterë & Laptopë",
    description_en: "Laptops, desktops, monitors, and more",
    description_sq: "Laptopë, desktopë, monitorë, dhe më shumë",
    icon: Laptop,
    color: "bg-blue-50 text-blue-600",
    subcategories: ["Laptops", "Desktop PCs", "Monitors", "All-in-One"],
  },
  {
    slug: "phones",
    name_en: "Phones & Tablets",
    name_sq: "Telefona & Tableta",
    description_en: "Smartphones, tablets, and accessories",
    description_sq: "Smartphone, tableta, dhe aksesorë",
    icon: Smartphone,
    color: "bg-green-50 text-green-600",
    subcategories: ["Smartphones", "Tablets", "Cases", "Screen Protectors"],
  },
  {
    slug: "tv-audio",
    name_en: "TV & Audio",
    name_sq: "TV & Audio",
    description_en: "TVs, soundbars, home theater systems",
    description_sq: "TV, soundbar, sisteme home theater",
    icon: Tv,
    color: "bg-purple-50 text-purple-600",
    subcategories: ["Smart TVs", "Soundbars", "Speakers", "Home Theater"],
  },
  {
    slug: "gaming",
    name_en: "Gaming",
    name_sq: "Gaming",
    description_en: "Consoles, games, and gaming accessories",
    description_sq: "Konsola, lojëra, dhe aksesorë gaming",
    icon: Gamepad2,
    color: "bg-red-50 text-red-600",
    subcategories: ["Consoles", "Games", "Controllers", "Gaming Chairs"],
  },
  {
    slug: "smart-home",
    name_en: "Smart Home",
    name_sq: "Shtëpi Inteligjente",
    description_en: "Smart devices for your home",
    description_sq: "Pajisje inteligjente për shtëpinë tuaj",
    icon: Home,
    color: "bg-orange-50 text-orange-600",
    subcategories: ["Smart Speakers", "Security", "Lighting", "Thermostats"],
  },
  {
    slug: "accessories",
    name_en: "Accessories",
    name_sq: "Aksesorë",
    description_en: "Cables, chargers, cases, and more",
    description_sq: "Kabllo, karikues, kuti, dhe më shumë",
    icon: Headphones,
    color: "bg-cyan-50 text-cyan-600",
    subcategories: ["Headphones", "Chargers", "Cables", "Bags"],
  },
  {
    slug: "components",
    name_en: "PC Components",
    name_sq: "Komponentë PC",
    description_en: "Build or upgrade your PC",
    description_sq: "Ndërtoni ose përmirësoni PC-në tuaj",
    icon: Cpu,
    color: "bg-yellow-50 text-yellow-600",
    subcategories: ["Graphics Cards", "Processors", "Memory", "Storage"],
  },
  {
    slug: "cameras",
    name_en: "Cameras",
    name_sq: "Kamera",
    description_en: "Digital cameras and photography gear",
    description_sq: "Kamera digjitale dhe pajisje fotografike",
    icon: Camera,
    color: "bg-pink-50 text-pink-600",
    subcategories: ["DSLR", "Mirrorless", "Action Cameras", "Lenses"],
  },
  {
    slug: "wearables",
    name_en: "Wearables",
    name_sq: "Veshje Inteligjente",
    description_en: "Smartwatches and fitness trackers",
    description_sq: "Orë inteligjente dhe gjurmues fitnesi",
    icon: Watch,
    color: "bg-indigo-50 text-indigo-600",
    subcategories: ["Smartwatches", "Fitness Bands", "Smart Glasses"],
  },
]

export default function CategoriesPage() {
  const { locale, t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("nav.allCategories")}</h1>
        <p className="text-gray-500 mt-1">
          {locale === 'sq'
            ? 'Shfletoni të gjitha kategoritë tona të produkteve'
            : 'Browse all our product categories'
          }
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="bg-white border-gray-200 hover:border-red-300 hover:shadow-md transition-all group cursor-pointer h-full">
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-7 h-7" />
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                  {locale === 'sq' ? category.name_sq : category.name_en}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  {locale === 'sq' ? category.description_sq : category.description_en}
                </p>

                <div className="flex flex-wrap gap-2">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs text-gray-400">+{category.subcategories.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center text-red-500 text-sm mt-4 group-hover:translate-x-1 transition-transform">
                  {locale === 'sq' ? 'Shiko produktet' : 'View products'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
