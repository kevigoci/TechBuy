"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  const { locale } = useLanguage()

  const sections = [
    {
      title: locale === 'sq' ? 'Informacioni që Mbledhim' : 'Information We Collect',
      content: locale === 'sq'
        ? 'Ne mbledhim informacion që ju na jepni direkt, si emri, adresa e emailit, numri i telefonit, adresa e dërgesës, dhe informacioni i pagesës kur bëni një porosi. Gjithashtu mbledhim automatikisht informacion teknik si adresa IP, lloji i shfletuesit, dhe faqet e vizituara.'
        : 'We collect information you provide directly to us, such as your name, email address, phone number, shipping address, and payment information when you place an order. We also automatically collect technical information such as IP address, browser type, and pages visited.',
    },
    {
      title: locale === 'sq' ? 'Si e Përdorim Informacionin' : 'How We Use Your Information',
      content: locale === 'sq'
        ? 'Informacionin tuaj e përdorim për të procesuar porositë, për të komunikuar me ju rreth porosive dhe produkteve, për të përmirësuar shërbimet tona, dhe për t\'ju dërguar informacione marketingu (vetëm me pëlqimin tuaj). Nuk e shesim informacionin tuaj personal tek palë të treta.'
        : 'We use your information to process orders, communicate with you about orders and products, improve our services, and send you marketing information (only with your consent). We do not sell your personal information to third parties.',
    },
    {
      title: locale === 'sq' ? 'Siguria e të Dhënave' : 'Data Security',
      content: locale === 'sq'
        ? 'Ne përdorim masa të rrepta sigurie për të mbrojtur informacionin tuaj personal. Të gjitha transaksionet janë të enkriptuara me SSL. Informacioni i kartës së kreditit nuk ruhet në serverët tanë - ai procesohet direkt nga ofruesit e pagesave të certifikuar.'
        : 'We use strict security measures to protect your personal information. All transactions are encrypted with SSL. Credit card information is not stored on our servers - it is processed directly by certified payment providers.',
    },
    {
      title: locale === 'sq' ? 'Cookies' : 'Cookies',
      content: locale === 'sq'
        ? 'Faqja jonë përdor cookies për të përmirësuar përvojën tuaj të navigimit, për të mbajtur mend preferencat tuaja, dhe për të analizuar trafikun e faqes. Mund t\'i çaktivizoni cookies në cilësimet e shfletuesit tuaj, por kjo mund të ndikojë funksionalitetin e faqes.'
        : 'Our website uses cookies to improve your browsing experience, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings, but this may affect the functionality of the site.',
    },
    {
      title: locale === 'sq' ? 'Të Drejtat Tuaja' : 'Your Rights',
      content: locale === 'sq'
        ? 'Ju keni të drejtë të kërkoni akses, korrigjim, ose fshirje të të dhënave tuaja personale. Gjithashtu mund të tërhiqni pëlqimin për komunikime marketingu në çdo kohë. Për të ushtruar këto të drejta, na kontaktoni në privacy@techbuy.al.'
        : 'You have the right to request access, correction, or deletion of your personal data. You can also withdraw consent for marketing communications at any time. To exercise these rights, contact us at privacy@techbuy.al.',
    },
    {
      title: locale === 'sq' ? 'Ndryshime në Politikë' : 'Changes to This Policy',
      content: locale === 'sq'
        ? 'Ne mund të përditësojmë këtë politikë privatësie herë pas here. Do t\'ju njoftojmë për ndryshime të rëndësishme duke postuar politikën e re në faqen tonë. Ju rekomandojmë të kontrolloni rregullisht këtë faqe për përditësime.'
        : 'We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on our website. We recommend checking this page regularly for updates.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'sq' ? 'Politika e Privatësisë' : 'Privacy Policy'}
          </h1>
          <p className="text-green-100 max-w-2xl mx-auto">
            {locale === 'sq'
              ? 'Si e mbrojmë dhe përdorim informacionin tuaj'
              : 'How we protect and use your information'}
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
            <p className="text-gray-600 mt-4">
              {locale === 'sq'
                ? 'Në TechBuy, ne e marrim seriozisht privatësinë tuaj. Kjo politikë shpjegon se si mbledhim, përdorim, dhe mbrojmë informacionin tuaj personal kur përdorni faqen tonë të internetit dhe shërbimet tona.'
                : 'At TechBuy, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our website and services.'}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <Card className="bg-gray-100 border-gray-200 mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              {locale === 'sq' ? 'Na Kontaktoni' : 'Contact Us'}
            </h3>
            <p className="text-gray-600">
              {locale === 'sq'
                ? 'Nëse keni pyetje rreth politikës sonë të privatësisë, na kontaktoni në:'
                : 'If you have questions about our privacy policy, contact us at:'}
            </p>
            <p className="text-red-500 mt-2">privacy@techbuy.al</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
