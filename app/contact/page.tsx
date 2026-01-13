"use client"

import type React from "react"

import { ArrowRight, Mail, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to Discord for support
    window.open("https://discord.gg/j2AaVSpkad", "_blank")
  }

  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Discord Support",
      description: "Join our Discord server for instant support and community",
      action: "Join Discord",
      link: "https://discord.gg/j2AaVSpkad",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      action: "Send Email",
      link: "mailto:support@techbuy.al",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      link: "#",
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Need help? Have questions? Our support team is here to assist you 24/7.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:shadow-lg group-hover:shadow-purple-500/25">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3">{method.title}</h3>
              <p className="text-gray-300 mb-4">{method.description}</p>
              <a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                {method.action}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-purple-400 font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-400 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-400 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-400 font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Quick Support</h3>
              <p className="text-gray-300 mb-4">
                For immediate assistance, join our Discord server where our team is available 24/7 to help with:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Account delivery issues</li>
                <li>• Payment questions</li>
                <li>• Technical support</li>
                <li>• Product inquiries</li>
                <li>• Warranty claims</li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Discord</span>
                  <span className="text-green-400 font-medium">Instant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Live Chat</span>
                  <span className="text-green-400 font-medium">&lt; 5 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Email</span>
                  <span className="text-yellow-400 font-medium">&lt; 24 hours</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Support Team</span>
                  <span>24/7 Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Discord</span>
                  <span>Always Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Live Chat</span>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
