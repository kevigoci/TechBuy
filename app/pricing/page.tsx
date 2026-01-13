"use client"

import { ArrowRight, Check, Star, Zap } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "PC Money Boost",
      description: "Professional money boosting for PC players",
      icon: <Zap className="w-8 h-8" />,
      packages: [
        { amount: "1 Billion", price: "$15", popular: false },
        { amount: "2 Billion", price: "$25", popular: true },
        { amount: "3 Billion", price: "$35", popular: false },
        { amount: "4 Billion", price: "$45", popular: false },
      ],
      features: ["Safe money drop method", "Instant delivery", "24/7 support", "Lifetime warranty"],
    },
    {
      name: "PC Modded Accounts",
      description: "Premium modded accounts with everything unlocked",
      icon: <Star className="w-8 h-8" />,
      packages: [
        { amount: "2 Billion + Unlocks", price: "$35", popular: false },
        { amount: "5 Billion + Unlocks", price: "$50", popular: true },
        { amount: "10 Billion + Unlocks", price: "$75", popular: false },
        { amount: "20 Billion + Unlocks", price: "$100", popular: false },
      ],
      features: ["All vehicles unlocked", "Max level character", "All properties owned", "Rare collectibles included"],
    },
    {
      name: "Console Services",
      description: "Money boosting and accounts for console players",
      icon: <Check className="w-8 h-8" />,
      packages: [
        { amount: "Console Money Boost", price: "$20", popular: false },
        { amount: "Console Modded Account", price: "$40", popular: true },
      ],
      features: ["Xbox & PlayStation support", "Safe transfer methods", "Account customization", "Priority support"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-white hover:text-purple-400 transition-colors">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Marketplace
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our competitive pricing tiers. All packages include lifetime warranty and 24/7 support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="glass-card p-8 relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400">{tier.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {tier.packages.map((pkg, pkgIndex) => (
                  <div
                    key={pkgIndex}
                    className={`p-3 rounded-lg border ${pkg.popular ? "border-purple-500 bg-purple-500/10" : "border-gray-600"} relative`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{pkg.amount}</span>
                      <span className="text-2xl font-bold text-purple-400">{pkg.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="text-lg font-semibold text-purple-400">What's Included:</h4>
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 mr-3 text-green-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                View Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose TechBuy?</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">5000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">Lifetime</div>
              <div className="text-gray-300">Warranty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
