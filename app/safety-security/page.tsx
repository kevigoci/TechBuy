"use client"

import { ArrowRight, Shield, Lock, CheckCircle, AlertTriangle, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function SafetySecurityPage() {
  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Account Verification",
      description:
        "Every account is thoroughly verified and tested before listing to ensure authenticity and functionality.",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "All transactions are processed through our secure Discord server with verified staff members.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted Community",
      description: "Join thousands of satisfied customers who trust TechBuy for their gaming needs.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist with any issues or concerns.",
    },
  ]

  const safetyTips = [
    "Never share your account details with unauthorized third parties",
    "Change passwords immediately after receiving your account",
    "Enable two-factor authentication when available",
    "Contact support immediately if you experience any issues",
    "Keep your purchase receipts for warranty claims",
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
            Safety & Security
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your security is our top priority. Learn about our comprehensive safety measures and best practices.
          </p>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="glass-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 text-white group-hover:shadow-lg group-hover:shadow-purple-500/25">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Safety Guidelines */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Safety Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
                Best Practices
              </h3>
              <ul className="space-y-3">
                {safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="w-4 h-4 mr-3 mt-1 text-green-400 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
                Warning Signs
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>Be cautious of:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Requests for additional payments outside our system</li>
                  <li>• Suspicious account behavior after purchase</li>
                  <li>• Unauthorized access attempts</li>
                  <li>• Accounts that don't match the description</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Information */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Warranty & Protection</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Lifetime Warranty</h3>
              <p className="text-gray-300 text-sm">All accounts come with lifetime warranty against bans and issues.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Secure Delivery</h3>
              <p className="text-gray-300 text-sm">Account details delivered securely through encrypted channels.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Expert Support</h3>
              <p className="text-gray-300 text-sm">Dedicated support team available 24/7 for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
