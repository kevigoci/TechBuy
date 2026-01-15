"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Store, Users, Award, Truck, Shield, Heart, Target, Eye } from "lucide-react"

export default function AboutPage() {
  const { locale } = useLanguage()

  const values = [
    {
      icon: Shield,
      title: locale === 'sq' ? 'Cilësi' : 'Quality',
      description: locale === 'sq'
        ? 'Ne ofrojmë vetëm produkte elektronike të cilësisë së lartë nga markat më të njohura.'
        : 'We offer only high-quality electronics from the most trusted brands.',
    },
    {
      icon: Users,
      title: locale === 'sq' ? 'Shërbim Klienti' : 'Customer Service',
      description: locale === 'sq'
        ? 'Ekipi ynë i dedikuar është gjithmonë gati t\'ju ndihmojë me çdo pyetje.'
        : 'Our dedicated team is always ready to help you with any questions.',
    },
    {
      icon: Truck,
      title: locale === 'sq' ? 'Dërgesë e Shpejtë' : 'Fast Delivery',
      description: locale === 'sq'
        ? 'Dërgesë e shpejtë në të gjithë Shqipërinë brenda 1-3 ditëve.'
        : 'Fast delivery across Albania within 1-3 business days.',
    },
    {
      icon: Heart,
      title: locale === 'sq' ? 'Kënaqësi e Garantuar' : 'Satisfaction Guaranteed',
      description: locale === 'sq'
        ? 'Politikë kthimi 30 ditë për të gjitha produktet.'
        : '30-day return policy on all products.',
    },
  ]

  const stats = [
    { value: '10,000+', label: locale === 'sq' ? 'Klientë të Kënaqur' : 'Happy Customers' },
    { value: '500+', label: locale === 'sq' ? 'Produkte' : 'Products' },
    { value: '5+', label: locale === 'sq' ? 'Vite Eksperiencë' : 'Years Experience' },
    { value: '24/7', label: locale === 'sq' ? 'Mbështetje' : 'Support' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Store className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === 'sq' ? 'Rreth TechBuy' : 'About TechBuy'}
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            {locale === 'sq'
              ? 'Dyqani kryesor i elektronikës online në Shqipëri që nga viti 2019'
              : 'Albania\'s premier online electronics store since 2019'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {locale === 'sq' ? 'Misioni Ynë' : 'Our Mission'}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'sq'
                  ? 'Misioni ynë është të sjellim teknologjinë më të fundit dhe më të mirë për çdo shtëpi dhe biznes në Shqipëri. Ne besojmë se teknologjia duhet të jetë e aksesueshme për të gjithë, me çmime të përballueshme dhe shërbim të shkëlqyer.'
                  : 'Our mission is to bring the latest and best technology to every home and business in Albania. We believe technology should be accessible to everyone, with affordable prices and excellent service.'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {locale === 'sq' ? 'Vizioni Ynë' : 'Our Vision'}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'sq'
                  ? 'Vizioni ynë është të bëhemi destinacioni numër një për elektronikë në rajon, duke ofruar një përvojë blerjeje të pandërprerë dhe produkte që përmirësojnë jetën e përditshme të klientëve tanë.'
                  : 'Our vision is to become the number one destination for electronics in the region, providing a seamless shopping experience and products that enhance our customers\' daily lives.'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {locale === 'sq' ? 'Vlerat Tona' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {locale === 'sq' ? 'Historia Jonë' : 'Our Story'}
            </h2>
            <div className="prose prose-lg max-w-3xl mx-auto text-gray-600">
              <p className="mb-4">
                {locale === 'sq'
                  ? 'TechBuy filloi si një ëndërr e vogël në vitin 2019, kur themeluesi ynë pa nevojën për një dyqan elektronike të besueshëm online në Shqipëri. Me vetëm disa produkte dhe shumë pasion, ne filluam rrugëtimin tonë.'
                  : 'TechBuy started as a small dream in 2019, when our founder saw the need for a reliable online electronics store in Albania. With just a few products and a lot of passion, we began our journey.'}
              </p>
              <p className="mb-4">
                {locale === 'sq'
                  ? 'Sot, ne jemi krenarë që shërbejmë mijëra klientë në të gjithë Shqipërinë, duke ofruar qindra produkte elektronike nga markat më të mira botërore. Ekipi ynë i dedikuar punon çdo ditë për të siguruar që ju të merrni produktet më të mira me çmimet më konkurruese.'
                  : 'Today, we are proud to serve thousands of customers across Albania, offering hundreds of electronics products from the world\'s best brands. Our dedicated team works every day to ensure you get the best products at the most competitive prices.'}
              </p>
              <p>
                {locale === 'sq'
                  ? 'Faleminderit që na besuat me nevojat tuaja teknologjike. Ne mezi presim të vazhdojmë t\'ju shërbejmë për shumë vite që vijnë!'
                  : 'Thank you for trusting us with your technology needs. We look forward to continuing to serve you for many years to come!'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
