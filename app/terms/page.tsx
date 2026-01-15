"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { FileText } from "lucide-react"

export default function TermsPage() {
  const { locale } = useLanguage()

  const sections = [
    {
      title: locale === 'sq' ? '1. Pranimi i Kushteve' : '1. Acceptance of Terms',
      content: locale === 'sq'
        ? 'Duke përdorur faqen tonë të internetit dhe duke bërë blerje, ju pranoni këto kushte shërbimi. Nëse nuk pajtoheni me ndonjë nga këto kushte, ju lutem mos përdorni faqen tonë.'
        : 'By using our website and making purchases, you accept these terms of service. If you do not agree with any of these terms, please do not use our website.',
    },
    {
      title: locale === 'sq' ? '2. Përdorimi i Faqes' : '2. Use of Website',
      content: locale === 'sq'
        ? 'Ju pranoni të përdorni faqen tonë vetëm për qëllime të ligjshme dhe në përputhje me këto kushte. Ndalohet përdorimi i faqes për aktivitete të paligjshme, mashtruese, ose që shkelin të drejtat e të tjerëve.'
        : 'You agree to use our website only for lawful purposes and in accordance with these terms. The use of the website for illegal, fraudulent activities, or activities that violate the rights of others is prohibited.',
    },
    {
      title: locale === 'sq' ? '3. Llogaritë e Përdoruesve' : '3. User Accounts',
      content: locale === 'sq'
        ? 'Kur krijoni një llogari, ju jeni përgjegjës për ruajtjen e konfidencialitetit të kredencialeve tuaja. Njoftoni menjëherë nëse dyshoni për akses të paautorizuar në llogarinë tuaj.'
        : 'When you create an account, you are responsible for maintaining the confidentiality of your credentials. Notify us immediately if you suspect unauthorized access to your account.',
    },
    {
      title: locale === 'sq' ? '4. Porositë dhe Pagesat' : '4. Orders and Payments',
      content: locale === 'sq'
        ? 'Të gjitha çmimet janë në Lekë Shqiptare (ALL) ose Euro (EUR) dhe përfshijnë TVSH-në. Ne rezervojmë të drejtën të refuzojmë ose anulojmë porosi për arsye të ndryshme, duke përfshirë gabime në çmim ose mungesë stoku.'
        : 'All prices are in Albanian Lek (ALL) or Euro (EUR) and include VAT. We reserve the right to refuse or cancel orders for various reasons, including pricing errors or stock unavailability.',
    },
    {
      title: locale === 'sq' ? '5. Dërgesa' : '5. Delivery',
      content: locale === 'sq'
        ? 'Ne bëjmë çdo përpjekje për të dërguar produktet brenda kohës së specifikuar, por nuk jemi përgjegjës për vonesa jashtë kontrollit tonë. Rreziku i humbjes kalon tek ju në momentin e dorëzimit.'
        : 'We make every effort to deliver products within the specified time, but we are not responsible for delays beyond our control. Risk of loss passes to you at the time of delivery.',
    },
    {
      title: locale === 'sq' ? '6. Kthimet dhe Rimbursimet' : '6. Returns and Refunds',
      content: locale === 'sq'
        ? 'Kthimet pranohen brenda 30 ditëve nga blerja sipas kushteve të specifikuara në politikën tonë të kthimit. Rimbursimet procesohen brenda 5-7 ditëve pune pas pranimit të produktit të kthyer.'
        : 'Returns are accepted within 30 days of purchase according to the conditions specified in our return policy. Refunds are processed within 5-7 business days after receiving the returned product.',
    },
    {
      title: locale === 'sq' ? '7. Garancitë' : '7. Warranties',
      content: locale === 'sq'
        ? 'Produktet mbulohen nga garancia e prodhuesit. Ne nuk ofrojmë garanci shtesë përveç atyre të specifikuara nga prodhuesi. Për çështje garancie, kontaktoni shërbimin tonë të klientit.'
        : 'Products are covered by the manufacturer\'s warranty. We do not offer additional warranties beyond those specified by the manufacturer. For warranty issues, contact our customer service.',
    },
    {
      title: locale === 'sq' ? '8. Kufizimi i Përgjegjësisë' : '8. Limitation of Liability',
      content: locale === 'sq'
        ? 'TechBuy nuk do të jetë përgjegjës për dëme indirekte, të rastësishme, ose pasojësore që rezultojnë nga përdorimi i faqes ose produkteve tona, përveç rasteve të parashikuara nga ligji.'
        : 'TechBuy will not be liable for indirect, incidental, or consequential damages resulting from the use of our website or products, except as provided by law.',
    },
    {
      title: locale === 'sq' ? '9. Pronësia Intelektuale' : '9. Intellectual Property',
      content: locale === 'sq'
        ? 'Të gjitha përmbajtjet e faqes, duke përfshirë logot, tekstet, imazhet, janë pronë e TechBuy ose licencuesve tanë. Ndalohet kopjimi ose ripërdorimi pa leje të shkruar.'
        : 'All website content, including logos, texts, images, are the property of TechBuy or our licensors. Copying or reuse without written permission is prohibited.',
    },
    {
      title: locale === 'sq' ? '10. Ndryshime në Kushte' : '10. Changes to Terms',
      content: locale === 'sq'
        ? 'Ne rezervojmë të drejtën të ndryshojmë këto kushte në çdo kohë. Ndryshimet hyjnë në fuqi menjëherë pas publikimit në faqe. Vazhdimi i përdorimit të faqes pas ndryshimeve përbën pranim të kushteve të reja.'
        : 'We reserve the right to change these terms at any time. Changes take effect immediately upon posting on the website. Continued use of the website after changes constitutes acceptance of the new terms.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'sq' ? 'Kushtet e Shërbimit' : 'Terms of Service'}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {locale === 'sq'
              ? 'Kushtet dhe rregullat për përdorimin e shërbimeve tona'
              : 'Terms and conditions for using our services'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="bg-white border-gray-200 mb-8">
          <CardContent className="p-6">
            <p className="text-gray-600">
              {locale === 'sq'
                ? 'Përditësuar së fundmi: Janar 2025'
                : 'Last updated: January 2025'}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <Card className="bg-gray-100 border-gray-200 mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              {locale === 'sq' ? 'Pyetje?' : 'Questions?'}
            </h3>
            <p className="text-gray-600">
              {locale === 'sq'
                ? 'Nëse keni pyetje rreth kushteve tona të shërbimit, na kontaktoni në:'
                : 'If you have questions about our terms of service, contact us at:'}
            </p>
            <p className="text-red-500 mt-2">legal@techbuy.al</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
