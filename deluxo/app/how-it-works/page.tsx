"use client"

import { ArrowRight, Shield, CreditCard, Download, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Browse & Select",
      description:
        "Choose from our premium GTA V accounts and money boosting services. All accounts are verified and secure.",
      details: ["Browse verified accounts", "Check account details", "View screenshots & stats"],
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Secure Payment",
      description: "Complete your purchase through our Discord server for personalized service and instant support.",
      details: ["Join our Discord", "Speak with our team", "Secure transaction process"],
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Receive your account details or money boost within minutes of payment confirmation.",
      details: ["Fast delivery", "Account credentials", "24/7 support available"],
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Enjoy Gaming",
      description: "Start playing immediately with your new premium account or boosted in-game currency.",
      details: ["Immediate access", "Premium features unlocked", "Lifetime warranty"],
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

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            How Deluxo Marketplace Works
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get premium GTA V accounts and money boosting services in just 4 simple steps. Safe, secure, and delivered
            instantly.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:shadow-lg group-hover:shadow-purple-500/25">
                {step.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-2">Step {index + 1}</div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3">{step.title}</h3>
              <p className="text-gray-300 mb-4">{step.description}</p>
              <ul className="text-sm text-gray-400 space-y-1">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Is it safe to buy accounts?</h3>
              <p className="text-gray-300 mb-4">
                Yes, all our accounts are legitimate and verified. We provide lifetime warranty on all purchases.
              </p>

              <h3 className="text-lg font-semibold text-purple-400 mb-2">How fast is delivery?</h3>
              <p className="text-gray-300 mb-4">
                Most orders are delivered within 5-15 minutes after payment confirmation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300 mb-4">
                We process payments through our Discord server for personalized service and security.
              </p>

              <h3 className="text-lg font-semibold text-purple-400 mb-2">Do you offer support?</h3>
              <p className="text-gray-300">
                Yes, we provide 24/7 customer support through our Discord server and live chat.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Start Shopping Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
