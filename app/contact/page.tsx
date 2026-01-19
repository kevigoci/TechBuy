"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Clock,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Headphones,
} from "lucide-react"

export default function ContactPage() {
  const { locale } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    // In a real app, you would send the form data to your backend
  }

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: locale === "sq" ? "Na Telefononi" : "Call Us",
      description: locale === "sq" ? "Jemi të disponueshëm 24/7" : "We're available 24/7",
      action: "+355 69 123 4567",
      link: "tel:+355691234567",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: locale === "sq" ? "Email" : "Email",
      description: locale === "sq" ? "Përgjigjemi brenda 24 orëve" : "We respond within 24 hours",
      action: "support@techbuy.al",
      link: "mailto:support@techbuy.al",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: locale === "sq" ? "Chat Live" : "Live Chat",
      description: locale === "sq" ? "Bisedoni me ekipin tonë" : "Chat with our team",
      action: locale === "sq" ? "Fillo Chat" : "Start Chat",
      link: "#",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {locale === "sq" ? "Kthehu në Kryefaqe" : "Back to Home"}
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Headphones className="w-5 h-5 text-white" />
              <span className="text-white font-medium">
                {locale === "sq" ? "Mbështetje 24/7" : "24/7 Support"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {locale === "sq" ? "Na Kontaktoni" : "Contact Us"}
            </h1>
            <p className="text-xl text-white/90">
              {locale === "sq"
                ? "Keni pyetje? Ekipi ynë është këtu për t'ju ndihmuar."
                : "Have questions? Our team is here to help you."}
            </p>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background"/>
          </svg>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="group"
              >
                <Card className="p-6 bg-card border-border hover:shadow-xl transition-all duration-300 hover:border-red-500/50 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                  <span className="text-red-500 font-medium group-hover:text-violet-600 transition-colors">
                    {method.action}
                  </span>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-card border-border">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {locale === "sq" ? "Mesazhi u Dërgua!" : "Message Sent!"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {locale === "sq"
                      ? "Do t'ju kontaktojmë sa më shpejt të jetë e mundur."
                      : "We'll get back to you as soon as possible."}
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    {locale === "sq" ? "Dërgo një mesazh tjetër" : "Send another message"}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {locale === "sq" ? "Dërgoni një Mesazh" : "Send us a Message"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {locale === "sq" ? "Emri" : "Name"}
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-secondary border-border"
                          placeholder={locale === "sq" ? "Emri juaj" : "Your name"}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {locale === "sq" ? "Email" : "Email"}
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-secondary border-border"
                          placeholder={locale === "sq" ? "email@shembull.com" : "email@example.com"}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {locale === "sq" ? "Subjekti" : "Subject"}
                      </label>
                      <Input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-secondary border-border"
                        placeholder={locale === "sq" ? "Si mund t'ju ndihmojmë?" : "How can we help?"}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {locale === "sq" ? "Mesazhi" : "Message"}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 resize-none"
                        placeholder={locale === "sq" ? "Shkruani mesazhin tuaj këtu..." : "Type your message here..."}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-violet-600 text-white py-6 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {locale === "sq" ? "Dërgo Mesazhin" : "Send Message"}
                    </Button>
                  </form>
                </>
              )}
            </Card>

            {/* Info Cards */}
            <div className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  {locale === "sq" ? "Oraret e Punës" : "Business Hours"}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">
                      {locale === "sq" ? "E Hënë - E Premte" : "Monday - Friday"}
                    </span>
                    <span className="text-foreground font-medium">08:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">
                      {locale === "sq" ? "E Shtunë" : "Saturday"}
                    </span>
                    <span className="text-foreground font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {locale === "sq" ? "E Diel" : "Sunday"}
                    </span>
                    <span className="text-foreground font-medium">10:00 - 16:00</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  {locale === "sq" ? "Adresa" : "Address"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Rruga Myslym Shyri, Nr. 42<br />
                  Tiranë, Shqipëri 1001
                </p>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  {locale === "sq" ? "Shiko në Hartë" : "View on Map"}
                </Button>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 border-0">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === "sq" ? "Keni nevojë për ndihmë të shpejtë?" : "Need quick help?"}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {locale === "sq"
                    ? "Kontrolloni FAQ tonë për përgjigje të shpejta"
                    : "Check our FAQ for quick answers"}
                </p>
                <Link href="/faq">
                  <Button className="bg-white text-red-500 hover:bg-gray-100 w-full">
                    {locale === "sq" ? "Shiko FAQ" : "View FAQ"}
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
