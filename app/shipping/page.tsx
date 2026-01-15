"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Truck, Clock, MapPin, Package, CheckCircle } from "lucide-react"

export default function ShippingPage() {
  const { locale } = useLanguage()

  const shippingZones = [
    {
      zone: locale === 'sq' ? 'Tiranë' : 'Tirana',
      time: locale === 'sq' ? '1-2 ditë pune' : '1-2 business days',
      cost: locale === 'sq' ? '200 L (Falas mbi 5000 L)' : '200 L (Free over 5000 L)',
    },
    {
      zone: locale === 'sq' ? 'Durrës, Elbasan, Shkodër' : 'Durres, Elbasan, Shkoder',
      time: locale === 'sq' ? '2-3 ditë pune' : '2-3 business days',
      cost: locale === 'sq' ? '300 L (Falas mbi 5000 L)' : '300 L (Free over 5000 L)',
    },
    {
      zone: locale === 'sq' ? 'Qytete të tjera' : 'Other cities',
      time: locale === 'sq' ? '3-5 ditë pune' : '3-5 business days',
      cost: locale === 'sq' ? '400 L (Falas mbi 5000 L)' : '400 L (Free over 5000 L)',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Truck className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'sq' ? 'Informacion Dërgese' : 'Shipping Information'}
          </h1>
          <p className="text-purple-100 max-w-2xl mx-auto">
            {locale === 'sq'
              ? 'Dërgesë e shpejtë dhe e sigurt në të gjithë Shqipërinë'
              : 'Fast and secure delivery across Albania'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Free Shipping Banner */}
        <Card className="bg-green-50 border-green-200 mb-8">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">
                {locale === 'sq' ? 'Dërgesë Falas!' : 'Free Shipping!'}
              </h3>
              <p className="text-green-700">
                {locale === 'sq'
                  ? 'Për të gjitha porositë mbi 5000 L, dërgesa është falas në të gjithë Shqipërinë.'
                  : 'For all orders over 5000 L, shipping is free across Albania.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Zones */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'sq' ? 'Zonat e Dërgesës' : 'Shipping Zones'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {shippingZones.map((zone, index) => (
            <Card key={index} className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-gray-900">{zone.zone}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{zone.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{zone.cost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipping Process */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'sq' ? 'Procesi i Dërgesës' : 'Shipping Process'}
        </h2>
        <Card className="bg-white border-gray-200 mb-12">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: locale === 'sq' ? 'Porosia Pranohet' : 'Order Received',
                  desc: locale === 'sq' ? 'Porosia juaj konfirmohet' : 'Your order is confirmed',
                },
                {
                  step: '2',
                  title: locale === 'sq' ? 'Përgatitja' : 'Processing',
                  desc: locale === 'sq' ? 'Produkti përgatitet për dërgesë' : 'Product is prepared for shipping',
                },
                {
                  step: '3',
                  title: locale === 'sq' ? 'Në Rrugë' : 'In Transit',
                  desc: locale === 'sq' ? 'Porosia është në rrugë' : 'Order is on its way',
                },
                {
                  step: '4',
                  title: locale === 'sq' ? 'Dorëzuar' : 'Delivered',
                  desc: locale === 'sq' ? 'Porosia dorëzohet tek ju' : 'Order is delivered to you',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'sq' ? 'Informacione të Rëndësishme' : 'Important Information'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {locale === 'sq' ? 'Oraret e Dërgesës' : 'Delivery Hours'}
              </h3>
              <p className="text-gray-600">
                {locale === 'sq'
                  ? 'Dërgesat bëhen nga e Hëna deri të Premten, ora 9:00 - 18:00. Nuk bëhen dërgesa gjatë fundjavës dhe festave zyrtare.'
                  : 'Deliveries are made Monday to Friday, 9:00 AM - 6:00 PM. No deliveries on weekends and public holidays.'}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {locale === 'sq' ? 'Gjurmimi i Porosisë' : 'Order Tracking'}
              </h3>
              <p className="text-gray-600">
                {locale === 'sq'
                  ? 'Pasi porosia të dërgohet, do të merrni email me numrin e gjurmimit. Mund të kontrolloni statusin në çdo kohë në llogarinë tuaj.'
                  : 'Once your order ships, you will receive an email with the tracking number. You can check the status anytime in your account.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
