import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-background via-card/50 to-background py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Premium Gaming Marketplace
          </div>

          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Deluxo
            </span>
            <span className="block text-accent">Marketplace</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover premium gaming accounts and digital items. Trusted quality, instant delivery, and unbeatable prices
            from Deluxo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-xl text-lg px-8 py-6"
            >
              Browse Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Secure & Trusted</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every transaction is protected with advanced security and buyer guarantee
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Instant Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get your digital products delivered immediately after purchase
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Handpicked accounts and items with verified authenticity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
