import { Lightning } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="https://res.cloudinary.com/dw3lf8roj/video/upload/v1772992664/grok-video-4f82c481-47da-4ab2-b84a-195a0c260deb_xr7ho7.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container mx-auto px-4 text-center relative z-20 py-32 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Lightning className="w-16 h-16 md:w-24 md:h-24 mx-auto text-foreground animate-pulse-glow" weight="fill" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground gothic-glow leading-tight"
          >
            The Kraken Lounge
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-heading text-2xl md:text-4xl text-foreground tracking-wider"
          >
            Brownsville's Underground Music Sanctuary
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <div className="text-center">
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Open Daily</p>
              <p className="font-heading text-xl text-foreground">5:00 PM - 2:00 AM</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Location</p>
              <p className="font-heading text-xl text-foreground">1123 E Adams St, Suite C</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-8"
          >
            <div className="pointer-events-auto flex justify-center">
              <a
                href="#events"
                className="inline-block bg-primary hover:bg-secondary text-primary-foreground font-heading text-lg px-10 py-5 rounded-md transition-all duration-300 hover:shadow-[0_0_50px_oklch(0.25_0.02_0_/_0.6)] hover:scale-105"
              >
                See Upcoming Shows
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
