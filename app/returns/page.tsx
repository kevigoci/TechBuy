"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { RotateCcw, CheckCircle, XCircle, AlertCircle, Package } from "lucide-react"
import Link from "next/link"

export default function ReturnsPage() {
  const { locale } = useLanguage()

  const eligibleItems = [
    locale === 'sq' ? 'Produkte të padëmtuara në paketimin origjinal' : 'Undamaged products in original packaging',
    locale === 'sq' ? 'Produkte me të gjitha aksesorët dhe dokumentacionin' : 'Products with all accessories and documentation',
    locale === 'sq' ? 'Produkte të kthyera brenda 30 ditëve nga blerja' : 'Products returned within 30 days of purchase',
    locale === 'sq' ? 'Produkte me faturën origjinale të blerjes' : 'Products with original purchase receipt',
  ]

  const nonEligibleItems = [
    locale === 'sq' ? 'Produkte të hapura/përdorura (software, kufje, etj.)' : 'Opened/used products (software, headphones, etc.)',
    locale === 'sq' ? 'Produkte të dëmtuara nga keqpërdorimi' : 'Products damaged by misuse',
    locale === 'sq' ? 'Produkte të personalizuara ose me porosi speciale' : 'Customized or special order products',
    locale === 'sq' ? 'Produkte të kthyera pas 30 ditëve' : 'Products returned after 30 days',
  ]

  const steps = [
    {
      step: '1',
      title: locale === 'sq' ? 'Kontaktoni Mbështetjen' : 'Contact Support',
      desc: locale === 'sq'
        ? 'Na kontaktoni përmes email ose telefon për të filluar procesin e kthimit.'
        : 'Contact us via email or phone to initiate the return process.',
    },
    {
      step: '2',
      title: locale === 'sq' ? 'Merrni Autorizimin' : 'Get Authorization',
      desc: locale === 'sq'
        ? 'Do të merrni numrin e autorizimit të kthimit (RMA).'
        : 'You will receive a Return Merchandise Authorization (RMA) number.',
    },
    {
      step: '3',
      title: locale === 'sq' ? 'Paketoni Produktin' : 'Pack the Product',
      desc: locale === 'sq'
        ? 'Paketoni produktin në paketimin origjinal me të gjitha aksesorët.'
        : 'Pack the product in original packaging with all accessories.',
    },
    {
      step: '4',
      title: locale === 'sq' ? 'Dërgoni Produktin' : 'Ship the Product',
      desc: locale === 'sq'
        ? 'Dërgoni produktin në adresën tonë ose ne e marrim atë.'
        : 'Ship the product to our address or we can pick it up.',
    },
    {
      step: '5',
      title: locale === 'sq' ? 'Rimbursimi' : 'Refund',
      desc: locale === 'sq'
        ? 'Pas verifikimit, rimbursimi bëhet brenda 5-7 ditëve pune.'
        : 'After verification, refund is processed within 5-7 business days.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <RotateCcw className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'sq' ? 'Kthime & Rimburisme' : 'Returns & Refunds'}
          </h1>
          <p className="text-orange-100 max-w-2xl mx-auto">
            {locale === 'sq'
              ? 'Politikë kthimi 30 ditë për kënaqësinë tuaj'
              : '30-day return policy for your satisfaction'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Policy Overview */}
        <Card className="bg-white border-gray-200 mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {locale === 'sq' ? 'Politika Jonë e Kthimit' : 'Our Return Policy'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {locale === 'sq'
                ? 'Ne besojmë në cilësinë e produkteve tona dhe kënaqësinë e klientëve tanë. Nëse nuk jeni të kënaqur me blerjen tuaj, mund ta ktheni produktin brenda 30 ditëve për rimbursim të plotë ose këmbim. Lexoni kushtet më poshtë për më shumë detaje.'
                : 'We believe in the quality of our products and our customers\' satisfaction. If you are not satisfied with your purchase, you can return the product within 30 days for a full refund or exchange. Read the conditions below for more details.'}
            </p>
          </CardContent>
        </Card>

        {/* Eligible / Non-eligible */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold text-gray-900">
                  {locale === 'sq' ? 'Pranohen për Kthim' : 'Eligible for Return'}
                </h3>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-semibold text-gray-900">
                  {locale === 'sq' ? 'Nuk Pranohen për Kthim' : 'Not Eligible for Return'}
                </h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'sq' ? 'Procesi i Kthimit' : 'Return Process'}
        </h2>
        <Card className="bg-white border-gray-200 mb-12">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              {steps.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Refund Info */}
        <Card className="bg-blue-50 border-blue-200 mb-8">
          <CardContent className="p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">
                {locale === 'sq' ? 'Informacion për Rimbursimin' : 'Refund Information'}
              </h3>
              <p className="text-blue-700 text-sm">
                {locale === 'sq'
                  ? 'Rimbursimet procesohen brenda 5-7 ditëve pune pas pranimit të produktit. Rimbursimi do të bëhet në metodën origjinale të pagesës. Për pagesa me para në dorëzim, rimbursimi bëhet përmes transferit bankar.'
                  : 'Refunds are processed within 5-7 business days after receiving the product. The refund will be made to the original payment method. For cash on delivery payments, refunds are made via bank transfer.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {locale === 'sq'
              ? 'Keni pyetje rreth kthimeve?'
              : 'Have questions about returns?'}
          </p>
          <Link href="/contact">
            <Button className="bg-red-500 hover:bg-red-600">
              {locale === 'sq' ? 'Na Kontaktoni' : 'Contact Us'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
