import { Pizza, Martini, CurrencyDollar } from '@phosphor-icons/react'
import pizzaVideo from '@/assets/video/grok-video-3bf85262-57e5-4733-adb1-5bfc67481dab_1772972300.mp4'

export function FoodDrinks() {
  return (
    <section id="food" className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl md:text-6xl mb-4 text-accent">
              Food & Drinks
            </h2>
            <p className="text-xl text-muted-foreground">
              More than just a music venue — we serve up some of the best pizza in Brownsville
            </p>
          </div>

          <div className="mb-12 relative">
            <div className="relative overflow-hidden rounded-lg border-2 border-primary card-glow">
              <video 
                className="w-full aspect-video object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
              >
                <source src={pizzaVideo} type="video/mp4" />
                <track
                  kind="captions"
                  srcLang="en"
                  label="English"
                  default
                />
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-6">
                <h3 className="font-heading text-2xl md:text-3xl text-accent mb-2">
                  The Kraken's Famous Pizza
                </h3>
                <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
                  Watch our kitchen crew craft the perfect pie! Our signature pizza features a hand-tossed crust with that ideal crispy texture, topped with premium mozzarella that melts to perfection, and our secret sauce blend that keeps people coming back. Each pizza is made fresh to order with locally-sourced ingredients whenever possible. Whether you're here for the music or the food, you won't leave disappointed — this is honestly some of the best pizza in Brownsville, and our customers agree!
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-background border border-border p-8 rounded-sm text-center">
              <Pizza className="w-16 h-16 mx-auto text-accent mb-4" weight="fill" />
              <h3 className="font-heading text-3xl mb-3 text-foreground">
                The Kraken Pizza
              </h3>
              <p className="text-foreground/80 mb-4">
                Honestly some of the best pizza in Brownsville, without a doubt. Our signature pies feature a perfectly crunchy crust and excellent cheese that keeps customers coming back.
              </p>
              <p className="text-accent font-bold text-lg">
                Whole pizzas are priced right — a steal for the quality
              </p>
            </div>

            <div className="bg-background border border-border p-8 rounded-sm text-center">
              <Martini className="w-16 h-16 mx-auto text-accent mb-4" weight="fill" />
              <h3 className="font-heading text-3xl mb-3 text-foreground">
                Ice Cold Beverages
              </h3>
              <p className="text-foreground/80 mb-4">
                Ice cold beers, handcrafted cocktails, and a wide variety of booze to suit every taste. Quick and friendly service from our experienced bar staff.
              </p>
              <p className="text-accent font-bold text-lg">
                Fair prices that honor our working-class roots
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border-2 border-primary p-8 rounded-sm text-center">
            <CurrencyDollar className="w-12 h-12 mx-auto text-accent mb-4" weight="fill" />
            <h3 className="font-heading text-2xl mb-3 text-foreground">
              Affordable. Delicious. Unpretentious.
            </h3>
            <p className="text-foreground/80 text-lg">
              Start your evening with dinner at 5:00 PM and stay through the late-night performances until 2:00 AM. Our kitchen and bar keep you fueled through the entire experience.
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">
              Don't just come for the music — try our delicious pizza!
            </p>
            <p className="text-foreground/70">
              Reviewers consistently highlight our food as a major draw, independent of the shows.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
