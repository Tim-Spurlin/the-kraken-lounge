import { MapPin, Phone, Clock, InstagramLogo, FacebookLogo, XLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-5xl md:text-6xl mb-4 text-gradient-purple gothic-glow">
              Visit Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Step into Brownsville's underground music sanctuary
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border-gradient deep-shadow p-6 rounded-md hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-accent flex-shrink-0" weight="fill" />
                  <div>
                    <h3 className="font-heading text-xl mb-2 text-accent">Address</h3>
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
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border-gradient deep-shadow p-6 rounded-md hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-accent flex-shrink-0" weight="fill" />
                  <div>
                    <h3 className="font-heading text-xl mb-2 text-accent">Hours</h3>
                    <p className="text-foreground/80">
                      <span className="font-bold">Open Every Day</span><br />
                      5:00 PM - 2:00 AM
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border-gradient deep-shadow p-6 rounded-md hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Phone className="w-8 h-8 text-accent flex-shrink-0" weight="fill" />
                  <div>
                    <h3 className="font-heading text-xl mb-2 text-accent">Phone</h3>
                    <a
                      href="tel:+19563721550"
                      className="text-foreground/80 hover:text-accent transition-colors text-lg"
                    >
                      (956) 372-1550
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card border-gradient deep-shadow p-6 rounded-md"
              >
                <h3 className="font-heading text-xl mb-4 text-accent">Follow for Updates</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay updated with the latest shows, events, and announcements
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/TheKrakenBrownsville"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary hover:bg-accent rounded-md flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_30px_oklch(0.65_0.24_310_/_0.6)]"
                    aria-label="Facebook"
                  >
                    <FacebookLogo className="w-6 h-6 text-primary-foreground" weight="fill" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary hover:bg-accent rounded-md flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_30px_oklch(0.65_0.24_310_/_0.6)]"
                    aria-label="Instagram"
                  >
                    <InstagramLogo className="w-6 h-6 text-primary-foreground" weight="fill" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary hover:bg-accent rounded-md flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_30px_oklch(0.65_0.24_310_/_0.6)]"
                    aria-label="X (formerly Twitter)"
                  >
                    <XLogo className="w-6 h-6 text-primary-foreground" weight="fill" />
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border-gradient deep-shadow p-6 rounded-md purple-shimmer"
            >
              <div className="aspect-square md:aspect-auto md:h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 aurora-gradient opacity-30" />
                <MapPin className="w-24 h-24 text-accent relative z-10 animate-pulse-glow" weight="fill" />
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 border-gradient deep-shadow p-8 rounded-md text-center"
          >
            <h3 className="font-heading text-2xl mb-3 text-accent gothic-glow">
              Questions? Want to Book a Show?
            </h3>
            <p className="text-foreground/80 mb-4">
              Get in touch with owner Daniel Alvarado — friendly, welcoming, and always ready to support the alternative arts community.
            </p>
            <p className="text-muted-foreground">
              Call us at <a href="tel:+19563721550" className="text-accent font-bold hover:underline">(956) 372-1550</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
