import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Felix",
    rating: 5,
    text: "Great service! I bought completed a few deals but I have been using this site for a few weeks now and I can definitely recommend this website. 100% recommend!",
    verified: true,
  },
  {
    name: "Annika",
    rating: 5,
    text: "Everything was boosted, assisted, great of my life. Remembering those times for a weekend, I can definitely recommend this website.",
    verified: true,
  },
  {
    name: "Nayeli",
    rating: 5,
    text: "Great service! I played 3 games with Kalo and finally had a budget that gave me the best time and with the best experience of my life.",
    verified: true,
  },
  {
    name: "Eddy Roy",
    rating: 5,
    text: "Every time then, buy boost here the boosters are a great service and I can say that they I can definitely recommend this website.",
    verified: true,
  },
  {
    name: "KFC",
    rating: 5,
    text: "Very fun to play on this. I had couple boosters and each of them were effective and gave me good time and they are the games for me.",
    verified: true,
  },
  {
    name: "CashKing2024",
    rating: 5,
    text: "Just got my 2 billion GTA$ from Deluxo! Lightning fast delivery, took only 15 minutes. Best money boosting service I've ever used!",
    verified: true,
  },
  {
    name: "ModdedGamer",
    rating: 5,
    text: "Bought a modded account from Deluxo with insane cars and outfits. Everything works perfectly on PS5. Highly recommend!",
    verified: true,
  },
  {
    name: "GTAMillionaire",
    rating: 5,
    text: "Deluxo's money boost service is incredible! Got 4 billion GTA$ safely delivered. No account sharing needed. 10/10 service!",
    verified: true,
  },
  {
    name: "ConsolePlayer88",
    rating: 5,
    text: "Amazing modded account purchase from Deluxo! All the rare cars and properties included. Worth every penny!",
    verified: true,
  },
  {
    name: "PCMaster",
    rating: 5,
    text: "Deluxo delivered my money boost in under 20 minutes. Professional service, secure payment, and great customer support!",
    verified: true,
  },
  {
    name: "RichGamer",
    rating: 5,
    text: "Best investment ever! Deluxo's modded accounts come with everything unlocked. Saved me hundreds of hours of grinding!",
    verified: true,
  },
  {
    name: "SpeedRunner",
    rating: 5,
    text: "Deluxo's money boosting is the real deal. Got my billions instantly and can finally enjoy the game without grinding!",
    verified: true,
  },
  {
    name: "VIPPlayer",
    rating: 5,
    text: "Purchased a premium modded account from Deluxo. All rare vehicles, max stats, and billions in cash. Perfect service!",
    verified: true,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
            Trusted by Millions of Gamers Worldwide
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold text-foreground">Excellent</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-green-500 text-green-500" />
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card key={index} className="bg-card border-border flex-shrink-0 w-80">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                      {testimonial.verified && <p className="text-xs text-green-500">✓ Verified Purchase</p>}
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-foreground mb-2">Gaming Services Just Got Better</p>
          <p className="text-muted-foreground">We are setting the new standards in the gaming industry</p>
        </div>
      </div>
    </section>
  )
}
