"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Plus, Trash2, Star } from "lucide-react"
import { toast } from "sonner"

// Mock addresses (in production, this would come from Supabase)
const mockAddresses: any[] = []

export default function AddressesPage() {
  const { t, locale } = useLanguage()
  const [addresses, setAddresses] = useState(mockAddresses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    label: "",
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    postal_code: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAddress = {
      id: Date.now().toString(),
      ...formData,
      is_default: addresses.length === 0,
    }

    setAddresses([...addresses, newAddress])
    setIsDialogOpen(false)
    setFormData({
      label: "",
      full_name: "",
      phone: "",
      street_address: "",
      city: "",
      postal_code: "",
    })
    toast.success(locale === 'sq' ? 'Adresa u shtua me sukses' : 'Address added successfully')
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id))
    toast.success(locale === 'sq' ? 'Adresa u fshi' : 'Address deleted')
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(a => ({
      ...a,
      is_default: a.id === id,
    })))
    toast.success(locale === 'sq' ? 'Adresa kryesore u vendos' : 'Default address set')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("account.addresses")}</h1>
          <p className="text-gray-500 mt-1">
            {locale === 'sq' ? 'Menaxho adresat e dërgesës' : 'Manage your shipping addresses'}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              {t("account.addAddress")}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-gray-900">{t("account.addAddress")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="label" className="text-gray-700">
                  {locale === 'sq' ? 'Emërtimi' : 'Label'} (e.g., Home, Work)
                </Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="bg-white border-gray-200 text-gray-900"
                  placeholder={locale === 'sq' ? 'Shtëpi' : 'Home'}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name" className="text-gray-700">{t("auth.fullName")}</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="bg-white border-gray-200 text-gray-900"
                    required
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
                    className="bg-white border-gray-200 text-gray-900"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="street_address" className="text-gray-700">
                  {locale === 'sq' ? 'Adresa' : 'Street Address'}
                </Label>
                <Input
                  id="street_address"
                  value={formData.street_address}
                  onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                  className="bg-white border-gray-200 text-gray-900"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-700">
                    {locale === 'sq' ? 'Qyteti' : 'City'}
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-white border-gray-200 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postal_code" className="text-gray-700">
                    {locale === 'sq' ? 'Kodi Postar' : 'Postal Code'}
                  </Label>
                  <Input
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="bg-white border-gray-200 text-gray-900"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-200 text-gray-700">
                  {t("common.cancel")}
                </Button>
                <Button type="submit" className="bg-red-500 hover:bg-red-600">
                  {t("common.save")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t("account.noAddresses")}</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              {locale === 'sq'
                ? 'Shtoni adresën tuaj të parë të dërgesës.'
                : 'Add your first shipping address.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{address.label || 'Address'}</span>
                    {address.is_default && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                        {locale === 'sq' ? 'Kryesor' : 'Default'}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {!address.is_default && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-yellow-500"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p className="text-gray-900 font-medium">{address.full_name}</p>
                  <p>{address.street_address}</p>
                  <p>{address.city}{address.postal_code && `, ${address.postal_code}`}</p>
                  <p>{address.phone}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
