"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FAQPage() {
  const { locale } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: locale === 'sq' ? 'Si mund të bëj një porosi?' : 'How do I place an order?',
      answer: locale === 'sq'
        ? 'Për të bërë një porosi, thjesht zgjidhni produktin që dëshironi, shtojeni në shportë, dhe vazhdoni me procesin e pagesës. Mund të paguani me kartë krediti, transfer bankar, ose para në dorëzim.'
        : 'To place an order, simply select the product you want, add it to your cart, and proceed with the checkout process. You can pay by credit card, bank transfer, or cash on delivery.',
    },
    {
      question: locale === 'sq' ? 'Sa kohë zgjat dërgesa?' : 'How long does delivery take?',
      answer: locale === 'sq'
        ? 'Dërgesa zakonisht zgjat 1-3 ditë pune për adresat brenda Tiranës dhe 2-5 ditë pune për qytetet e tjera në Shqipëri. Për porositë mbi 5000 L, dërgesa është falas!'
        : 'Delivery usually takes 1-3 business days for addresses within Tirana and 2-5 business days for other cities in Albania. For orders over 5000 L, delivery is free!',
    },
    {
      question: locale === 'sq' ? 'A mund të kthej një produkt?' : 'Can I return a product?',
      answer: locale === 'sq'
        ? 'Po! Ne ofrojmë politikë kthimi 30 ditë për të gjitha produktet. Produkti duhet të jetë në gjendjen origjinale me paketimin e plotë. Kontaktoni shërbimin e klientit për të filluar procesin e kthimit.'
        : 'Yes! We offer a 30-day return policy on all products. The product must be in its original condition with complete packaging. Contact customer service to initiate the return process.',
    },
    {
      question: locale === 'sq' ? 'Cilat metoda pagese pranoni?' : 'What payment methods do you accept?',
      answer: locale === 'sq'
        ? 'Ne pranojmë kartë krediti/debiti (Visa, Mastercard), transfer bankar, dhe para në dorëzim (COD). Të gjitha transaksionet janë të sigurta dhe të enkriptuara.'
        : 'We accept credit/debit cards (Visa, Mastercard), bank transfer, and cash on delivery (COD). All transactions are secure and encrypted.',
    },
    {
      question: locale === 'sq' ? 'A kanë produktet garanci?' : 'Do products come with warranty?',
      answer: locale === 'sq'
        ? 'Po, të gjitha produktet vijnë me garancinë e prodhuesit. Periudha e garancisë ndryshon sipas produktit dhe prodhuesit. Detajet e garancisë gjenden në faqen e çdo produkti.'
        : 'Yes, all products come with the manufacturer\'s warranty. The warranty period varies depending on the product and manufacturer. Warranty details can be found on each product page.',
    },
    {
      question: locale === 'sq' ? 'Si mund të gjurmoj porosinë time?' : 'How can I track my order?',
      answer: locale === 'sq'
        ? 'Pasi të dërgohet porosia juaj, do të merrni një email me numrin e gjurmimit. Mund të përdorni këtë numër për të gjurmuar statusin e dërgesës. Gjithashtu mund të kontrolloni statusin në llogarinë tuaj.'
        : 'Once your order is shipped, you will receive an email with the tracking number. You can use this number to track the delivery status. You can also check the status in your account.',
    },
    {
      question: locale === 'sq' ? 'A ofroni instalim?' : 'Do you offer installation?',
      answer: locale === 'sq'
        ? 'Për disa produkte si TV të mëdha dhe pajisje shtëpiake, ne ofrojmë shërbim instalimi me pagesë shtesë. Kontaktoni shërbimin e klientit për më shumë detaje.'
        : 'For some products like large TVs and home appliances, we offer installation service for an additional fee. Contact customer service for more details.',
    },
    {
      question: locale === 'sq' ? 'Si mund të kontaktoj mbështetjen?' : 'How can I contact support?',
      answer: locale === 'sq'
        ? 'Mund të na kontaktoni përmes email-it në support@techbuy.al, përmes telefonit në +355 69 123 4567, ose përmes formularit të kontaktit në faqen tonë. Ekipi ynë është i disponueshëm 24/7.'
        : 'You can contact us via email at support@techbuy.al, by phone at +355 69 123 4567, or through the contact form on our website. Our team is available 24/7.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'sq' ? 'Pyetjet e Shpeshta' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            {locale === 'sq'
              ? 'Gjeni përgjigjet për pyetjet më të shpeshta'
              : 'Find answers to the most common questions'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-white border-gray-200 mb-4">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-gray-500 transition-transform flex-shrink-0",
                    openIndex === index && "transform rotate-180"
                  )} />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {locale === 'sq'
              ? 'Nuk e gjetët përgjigjen që kërkoni?'
              : 'Didn\'t find the answer you\'re looking for?'}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            {locale === 'sq' ? 'Na Kontaktoni' : 'Contact Us'}
          </a>
        </div>
      </div>
    </div>
  )
}
