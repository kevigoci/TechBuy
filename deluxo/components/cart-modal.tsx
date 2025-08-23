"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, ExternalLink, MessageCircle } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  title: string
  price: string
  image: string
  quantity: number
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onRemoveItem: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
}

export function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }: CartModalProps) {
  const total = cartItems.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("$", ""))
    return sum + price * item.quantity
  }, 0)

  const handleDiscordCheckout = () => {
    window.open("https://discord.gg/j2AaVSpkad", "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Shopping Cart ({cartItems.length} items)
          </DialogTitle>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 glass-card rounded-lg">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">Seller: Deluxo</p>
                    <p className="font-bold text-purple-400">{item.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Separator className="bg-border/50" />

            {/* Total */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-purple-400">${total.toFixed(2)}</span>
              </div>

              <div className="gradient-secondary p-4 rounded-lg space-y-3 glass-card">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span className="font-medium text-white">Payment Method: Discord Server</span>
                </div>
                <p className="text-sm text-white/80">
                  Complete your purchase by joining our Discord server. Our team will assist you with the payment
                  process and account delivery.
                </p>
                <Button
                  onClick={handleDiscordCheckout}
                  className="w-full gradient-primary hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discord to Complete Purchase
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
