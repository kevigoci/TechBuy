"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Loader2, Save, User } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()
  const { t, locale } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await updateProfile(formData)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success(locale === 'sq' ? 'Profili u përditësua me sukses' : 'Profile updated successfully')
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("account.profile")}</h1>
        <p className="text-gray-500 mt-1">
          {locale === 'sq' ? 'Menaxho informacionin e profilit tënd' : 'Manage your profile information'}
        </p>
      </div>

      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <User className="w-5 h-5 text-red-500" />
            {t("account.editProfile")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                {t("auth.email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-gray-50 border-gray-200 text-gray-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                {locale === 'sq' ? 'Email-i nuk mund të ndryshohet' : 'Email cannot be changed'}
              </p>
            </div>

            <div>
              <Label htmlFor="full_name" className="text-gray-700">
                {t("auth.fullName")}
              </Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700">
                {locale === 'sq' ? 'Telefoni' : 'Phone'}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white border-gray-200 text-gray-900 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <Button type="submit" className="bg-red-500 hover:bg-red-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {t("common.save")}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">{t("account.changePassword")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">
            {locale === 'sq'
              ? 'Për të ndryshuar fjalëkalimin, do t\'ju dërgohet një email me lidhjen e rivendosjes.'
              : 'To change your password, you will receive an email with a reset link.'
            }
          </p>
          <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
            {locale === 'sq' ? 'Dërgo Email Rivendosjeje' : 'Send Reset Email'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
