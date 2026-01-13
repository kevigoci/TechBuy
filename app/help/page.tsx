"use client"

import { ArrowRight, Search, HelpCircle, Book, MessageCircle, Shield, CreditCard } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: <Book className="w-8 h-8" />,
      title: "Getting Started",
      description: "Learn the basics of using TechBuy",
      articles: [
        "How to create an account",
        "Making your first purchase",
        "Understanding our products",
        "Account verification process",
      ],
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Payments & Billing",
      description: "Everything about payments and transactions",
      articles: ["Payment methods accepted", "Discord payment process", "Refund policy", "Transaction security"],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Account Security",
      description: "Keep your accounts safe and secure",
      articles: [
        "Account safety tips",
        "Password best practices",
        "Two-factor authentication",
        "Reporting security issues",
      ],
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Support",
      description: "Get help when you need it",
      articles: ["Contacting support", "Discord server guide", "Live chat features", "Warranty claims"],
    },
  ]

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Most orders are delivered within 5-15 minutes after payment confirmation. Complex orders may take up to 1 hour.",
    },
    {
      question: "Is it safe to buy GTA accounts?",
      answer:
        "Yes, all our accounts are legitimate and come with lifetime warranty. We use safe methods and provide full support.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We process all payments through our Discord server for personalized service and security. Multiple payment options available.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer refunds within 24 hours if the product doesn't match the description or if there are delivery issues.",
    },
    {
      question: "How do I contact support?",
      answer: "You can reach us through Discord (fastest), live chat, or email. Our support team is available 24/7.",
    },
    {
      question: "What's included with modded accounts?",
      answer:
        "Modded accounts include unlocked vehicles, properties, max level characters, and the specified amount of in-game money.",
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
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to your questions and get the help you need.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="glass-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:shadow-lg group-hover:shadow-purple-500/25">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3 text-center">{category.title}</h3>
              <p className="text-gray-300 text-center mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <li
                    key={articleIndex}
                    className="text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors"
                  >
                    • {article}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-300 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/j2AaVSpkad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              Contact Support
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
