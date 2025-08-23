"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail, MessageCircle } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [showLiveChat, setShowLiveChat] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert("Thank you for subscribing! You'll receive updates at " + email)
      setEmail("")
    }
  }

  const handleLinkClick = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openDiscord = () => {
    window.open("https://discord.gg/j2AaVSpkad", "_blank")
  }

  return (
    <>
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 relative">
                  <Image src="/deluxo-logo.png" alt="Deluxo Logo" fill className="object-contain" />
                </div>
                <span className="font-heading font-bold text-xl text-foreground">Deluxo Marketplace</span>
              </div>
              <p className="text-muted-foreground mb-4">
                The world's leading marketplace for GTA V accounts and money boosting services. Trusted by thousands of
                gamers worldwide.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" onClick={() => window.open("https://facebook.com/deluxo", "_blank")}>
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.open("https://twitter.com/deluxo", "_blank")}>
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.open("https://instagram.com/deluxo", "_blank")}>
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.open("https://youtube.com/deluxo", "_blank")}>
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleLinkClick("products")}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Browse Games
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("how-it-works")}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("safety")}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Safety & Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("pricing")}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Pricing
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleLinkClick("help")}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={openDiscord}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowLiveChat(true)}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Live Chat
                  </button>
                </li>
                <li>
                  <button
                    onClick={openDiscord}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Report Issue
                  </button>
                </li>
                <li>
                  <button
                    onClick={openDiscord}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    Community
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">Get the latest deals and updates delivered to your inbox.</p>
              <form onSubmit={handleEmailSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-input border-border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  <Mail className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">© 2025 Deluxo Marketplace. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button
                  onClick={() => handleLinkClick("privacy")}
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleLinkClick("terms")}
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => handleLinkClick("cookies")}
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showLiveChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full glass-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Live Chat Support</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLiveChat(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">
              Get instant support from our team! Join our Discord server for live chat assistance.
            </p>
            <div className="flex space-x-2">
              <Button onClick={openDiscord} className="flex-1 bg-gradient-primary hover:opacity-90">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discord Chat
              </Button>
              <Button variant="outline" onClick={() => setShowLiveChat(false)} className="border-border">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
