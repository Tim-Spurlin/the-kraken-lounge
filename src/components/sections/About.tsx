import { Lightning, Heart, MusicNotes } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute inset-0 aurora-gradient opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-6xl text-center mb-12 text-gradient-purple gothic-glow"
          >
            A Sanctuary for Alternative Culture
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none space-y-6 text-foreground/90"
          >
            <p className="text-xl leading-relaxed">
              Since its doors first opened, <span className="text-accent font-bold">The Kraken Lounge</span> has stood as Brownsville's definitive refuge for alternative music and underground culture. Located in the heart of historic downtown at 1123 E Adams St, Suite C, we are more than just a bar—we are a cultural institution, a community hub, and a sanctuary for those who refuse to conform.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 my-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center space-y-3 deep-shadow p-6 rounded-md bg-background/30 border border-primary/20 hover:border-accent/50 transition-all duration-300"
              >
                <Lightning className="w-12 h-12 mx-auto text-accent animate-pulse-glow" weight="fill" />
                <h3 className="font-heading text-2xl text-accent">Rebellious</h3>
                <p className="text-muted-foreground">A getaway from mainstream music, championing heavy metal, punk, goth, industrial, and underground techno.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center space-y-3 deep-shadow p-6 rounded-md bg-background/30 border border-primary/20 hover:border-accent/50 transition-all duration-300"
              >
                <MusicNotes className="w-12 h-12 mx-auto text-accent animate-pulse-glow" weight="fill" />
                <h3 className="font-heading text-2xl text-accent">Authentic</h3>
                <p className="text-muted-foreground">Low-lit, gothic atmosphere meets genuine dive bar warmth. Raw, unpretentious, and real.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center space-y-3 deep-shadow p-6 rounded-md bg-background/30 border border-primary/20 hover:border-accent/50 transition-all duration-300"
              >
                <Heart className="w-12 h-12 mx-auto text-accent animate-pulse-glow" weight="fill" />
                <h3 className="font-heading text-2xl text-accent">Welcoming</h3>
                <p className="text-muted-foreground">A safe, inclusive space where alternative subcultures thrive and everyone belongs.</p>
              </motion.div>
            </div>
            
            <p className="text-xl leading-relaxed">
              Under the leadership of owner <span className="font-bold text-accent">Daniel Alvarado</span>, The Kraken Lounge has weathered storms—both literal and metaphorical. When the COVID-19 pandemic forced venues across the country to shutter permanently, we fought to survive. Through the darkest days of 2020, Daniel's unwavering commitment to the community kept the dream alive. In 2021, we reopened with strict safety protocols, proving that The Kraken Lounge was here to stay.
            </p>
            
            <p className="text-xl leading-relaxed">
              Today, we continue to champion the artists, musicians, and creatives who make the Rio Grande Valley's alternative scene pulse with life. Our walls showcase rotating exhibitions of local visual art. Our stage hosts touring indie bands, local legends, and everything in between. Our kitchen serves up some of the best pizza in Brownsville. And our bar pours ice-cold beers and handcrafted cocktails at prices that honor our working-class roots.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-gradient deep-shadow p-8 rounded-md mt-8"
            >
              <p className="text-lg italic text-center text-accent font-heading text-2xl">
                "One of the absolute only establishments in Brownsville catered specifically and unapologetically to the alternative music scene."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
