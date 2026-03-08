import { MapPin, Phone, Clock, InstagramLogo, FacebookLogo, XLogo } from '@phosphor-icons/react'

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl md:text-6xl mb-4 text-accent">
              Visit Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Step into Brownsville's underground music sanctuary
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-card border border-border p-6 rounded-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-accent flex-shrink-0" weight="fill" />
                  <div>
                    <h3 className="font-heading text-xl mb-2 text-foreground">Address</h3>
                    <p className="text-foreground/80">
                      1123 E Adams St, Suite C<br />
                      Brownsville, TX 78520
                    </p>
                    <a
                      href="https://maps.google.com/?q=1123+E+Adams+St+Suite+C+Brownsville+TX+78520"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-accent hover:text-primary transition-colors font-bold"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-sm">
                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-accent flex-shrink-0" weight="fill" />
                  <div>
                    <h3 className="font-heading text-xl mb-2 text-foreground">Hours</h3>
                    <p className="text-foreground/80">
                      <span className="font-bold">Open Every Day</span><br />
                      5:00 PM - 2:00 AM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-sm">
                <div className="flex items-start gap-4">
                  <Phone className="w-8 h-8 text-accent flex-shrink-0" weight="fill" />
                  <div>
                    <h3 className="font-heading text-xl mb-2 text-foreground">Phone</h3>
                    <a
                      href="tel:+19563721550"
                      className="text-foreground/80 hover:text-accent transition-colors text-lg"
                    >
                      (956) 372-1550
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-sm">
                <h3 className="font-heading text-xl mb-4 text-foreground">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/TheKrakenBrownsville"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary hover:bg-accent rounded-sm flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Facebook"
                  >
                    <FacebookLogo className="w-6 h-6 text-primary-foreground" weight="fill" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary hover:bg-accent rounded-sm flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <InstagramLogo className="w-6 h-6 text-primary-foreground" weight="fill" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary hover:bg-accent rounded-sm flex items-center justify-center transition-all hover:scale-110"
                    aria-label="X (formerly Twitter)"
                  >
                    <XLogo className="w-6 h-6 text-primary-foreground" weight="fill" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-sm">
              <div className="aspect-square md:aspect-auto md:h-full bg-muted rounded-sm flex items-center justify-center">
                <MapPin className="w-24 h-24 text-muted-foreground" weight="fill" />
              </div>
            </div>
          </div>

          <div className="mt-12 bg-primary/10 border-2 border-primary p-8 rounded-sm text-center">
            <h3 className="font-heading text-2xl mb-3 text-foreground">
              Questions? Want to Book a Show?
            </h3>
            <p className="text-foreground/80 mb-4">
              Get in touch with owner Daniel Alvarado — friendly, welcoming, and always ready to support the alternative arts community.
            </p>
            <p className="text-muted-foreground">
              Call us at <a href="tel:+19563721550" className="text-accent font-bold hover:underline">(956) 372-1550</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
