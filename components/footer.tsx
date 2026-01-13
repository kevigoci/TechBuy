"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  Truck,
  Shield,
  HeadphonesIcon,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function Footer() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success("Thank you for subscribing!")
      setEmail("")
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust badges */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Free Shipping</h4>
                <p className="text-sm text-gray-400">Orders over 5000 L</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Secure Payment</h4>
                <p className="text-sm text-gray-400">100% secure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h4 className="font-semibold text-white">24/7 Support</h4>
                <p className="text-sm text-gray-400">Dedicated support</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Easy Returns</h4>
                <p className="text-sm text-gray-400">30 day returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Store className="h-8 w-8 text-red-500" />
              <span className="font-bold text-xl text-white">TechBuy</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Albania&apos;s premier online electronics store. Quality products, fast delivery, and exceptional customer service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Tirana, Albania</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-red-500" />
                <span>+355 69 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-red-500" />
                <span>support@techbuy.al</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer.customerService")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-400 transition-colors">
                  {t("footer.contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-red-400 transition-colors">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-red-400 transition-colors">
                  {t("footer.shippingInfo")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-red-400 transition-colors">
                  {t("footer.returns")}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer.aboutUs")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-400 transition-colors">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-red-400 transition-colors">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-red-400 transition-colors">
                  {t("footer.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer.newsletter")}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t("footer.newsletterDesc")}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                {t("footer.subscribe")}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Klevin Goci. {t("footer.allRightsReserved")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
