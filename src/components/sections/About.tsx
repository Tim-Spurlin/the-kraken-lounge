import { Palette, PaintBrush, Heart, Pen } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid" />
      <div className="absolute inset-0 plasma-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-6xl text-center mb-12 text-gradient-purple gothic-glow"
          >
            A Canvas for Creative Expression
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none space-y-6 text-foreground/90"
          >
            <p className="text-xl leading-relaxed">
              At <span className="text-accent font-bold">The Kraken Lounge</span>, we believe art is the soul of culture. Our walls aren't just walls—they're living galleries, constantly evolving canvases that showcase the boundless creativity of local and regional artists. From striking paintings and evocative photography to experimental mixed-media installations, every surface tells a story.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 my-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center space-y-3 deep-shadow p-6 rounded-md bg-card border-2 border-primary/30 hover:border-primary transition-all duration-300 hexagon-pattern relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <Palette className="w-12 h-12 mx-auto text-accent animate-pulse-glow relative z-10" weight="fill" />
                <h3 className="font-heading text-2xl text-accent relative z-10">Rotating Exhibitions</h3>
                <p className="text-muted-foreground relative z-10">Our gallery is never static. New artists, new visions, new stories—constantly refreshed to keep the space alive and inspiring.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center space-y-3 deep-shadow p-6 rounded-md bg-card border-2 border-primary/30 hover:border-primary transition-all duration-300 circuit-lines relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                <Paintbrush className="w-12 h-12 mx-auto text-accent animate-pulse-glow relative z-10" weight="fill" />
                <h3 className="font-heading text-2xl text-accent relative z-10">All Mediums Welcome</h3>
                <p className="text-muted-foreground relative z-10">Painters, illustrators, photographers, sculptors, digital artists—all forms of visual expression find a home here.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center space-y-3 deep-shadow p-6 rounded-md bg-card border-2 border-primary/30 hover:border-primary transition-all duration-300 cyber-grid relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <Easel className="w-12 h-12 mx-auto text-accent animate-pulse-glow relative z-10" weight="fill" />
                <h3 className="font-heading text-2xl text-accent relative z-10">Supporting Artists</h3>
                <p className="text-muted-foreground relative z-10">We provide free exhibition space, promotion, and a platform for artists to connect with an engaged, appreciative audience.</p>
              </motion.div>
            </div>
            
            <p className="text-xl leading-relaxed">
              We're proud to contribute to artists of all kinds—emerging talents and established voices alike. By offering our venue as a gallery space, we help creators gain visibility, build their portfolios, and connect with buyers and fans. Art isn't a luxury at The Kraken; it's essential. It transforms the atmosphere, sparks conversation, and reminds us that creativity is rebellion.
            </p>
            
            <p className="text-xl leading-relaxed">
              Whether you're sipping a cold beer while admiring a hauntingly beautiful portrait, or debating the meaning of an abstract piece with friends between sets, art is woven into the very fabric of The Kraken experience. This isn't a sterile white-cube gallery—it's a dive bar gallery, where raw talent meets raw authenticity.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-gradient deep-shadow p-8 rounded-md mt-8"
            >
              <div className="text-center space-y-4">
                <Heart className="w-12 h-12 mx-auto text-accent" weight="fill" />
                <p className="text-lg italic text-accent font-heading text-2xl">
                  "Art is the heartbeat of The Kraken. Every piece on our walls is a testament to the vibrant creative community thriving in the Rio Grande Valley."
                </p>
              </div>
            </motion.div>

            <div className="mt-8 bg-primary/10 border-2 border-primary p-6 rounded-sm">
              <h3 className="font-heading text-2xl text-accent mb-3 text-center">
                Artists: Want to Exhibit?
              </h3>
              <p className="text-foreground/80 text-center">
                We're always looking for new voices to feature on our walls. Contact us to discuss showcasing your work at The Kraken Lounge—where art and music collide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
