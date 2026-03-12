import { Headphones, Globe, SpeakerHigh } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export function AudioOverview() {
  const englishAudioRef = useRef<HTMLAudioElement>(null)
  const spanishAudioRef = useRef<HTMLAudioElement>(null)
  const [playingEnglish, setPlayingEnglish] = useState(false)
  const [playingSpanish, setPlayingSpanish] = useState(false)

  const handleEnglishPlay = () => {
    if (spanishAudioRef.current && !spanishAudioRef.current.paused) {
      spanishAudioRef.current.pause()
      setPlayingSpanish(false)
    }
    if (englishAudioRef.current) {
      if (playingEnglish) {
        englishAudioRef.current.pause()
        setPlayingEnglish(false)
      } else {
        englishAudioRef.current.play()
        setPlayingEnglish(true)
      }
    }
  }

  const handleSpanishPlay = () => {
    if (englishAudioRef.current && !englishAudioRef.current.paused) {
      englishAudioRef.current.pause()
      setPlayingEnglish(false)
    }
    if (spanishAudioRef.current) {
      if (playingSpanish) {
        spanishAudioRef.current.pause()
        setPlayingSpanish(false)
      } else {
        spanishAudioRef.current.play()
        setPlayingSpanish(true)
      }
    }
  }

  return (
    <section id="overview" className="py-16 bg-gradient-to-b from-background via-card to-background relative overflow-hidden">
      <div className="absolute inset-0 hexagon-pattern opacity-20" />
      <div className="absolute inset-0 aurora-gradient" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8 space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Headphones className="w-12 h-12 mx-auto text-accent animate-pulse-glow" weight="fill" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl text-gradient-purple gothic-glow"
            >
              Hear Our Story
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            
            <div className="relative bg-card/90 backdrop-blur-sm border-2 border-primary/40 rounded-2xl p-6 md:p-8 deep-shadow hover:border-primary transition-all duration-500 glow-border overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-heading uppercase tracking-wider">Audio Overviews</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <audio
                    ref={englishAudioRef}
                    controlsList="nodownload"
                    onEnded={() => setPlayingEnglish(false)}
                    onPause={() => setPlayingEnglish(false)}
                    className="hidden"
                  >
                    <source src="https://res.cloudinary.com/dw3lf8roj/video/upload/v1773202298/The_Kraken_Lounge_s_Radical_South_Texas_Sanctuary_1_vtjdx2.mp4" type="video/mp4" />
                  </audio>

                  <audio
                    ref={spanishAudioRef}
                    controlsList="nodownload"
                    onEnded={() => setPlayingSpanish(false)}
                    onPause={() => setPlayingSpanish(false)}
                    className="hidden"
                  >
                    <source src="https://res.cloudinary.com/dw3lf8roj/video/upload/v1773202453/The_Kraken_Lounge_oasis_cultural_de_Brownsville_unssbh.mp4" type="video/mp4" />
                  </audio>

                  <button
                    onClick={handleEnglishPlay}
                    className="flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground font-heading text-lg md:text-xl py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_50px_oklch(0.65_0.24_310_/_0.7)] active:scale-95 group/btn border border-primary/50 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Globe className="w-5 h-5 group-hover/btn:scale-110 transition-transform" weight="fill" />
                    <span className="relative z-10">{playingEnglish ? 'Pause' : 'English'}</span>
                    <SpeakerHigh className={`w-5 h-5 transition-all ${playingEnglish ? 'animate-pulse' : ''}`} weight="fill" />
                  </button>

                  <button
                    onClick={handleSpanishPlay}
                    className="flex-1 bg-gradient-to-br from-accent via-accent/90 to-accent/80 hover:from-accent/90 hover:via-accent hover:to-accent text-accent-foreground font-heading text-lg md:text-xl py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_50px_oklch(0.75_0.20_330_/_0.7)] active:scale-95 group/btn border border-accent/50 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Globe className="w-5 h-5 group-hover/btn:scale-110 transition-transform" weight="fill" />
                    <span className="relative z-10">{playingSpanish ? 'Pausar' : 'Español'}</span>
                    <SpeakerHigh className={`w-5 h-5 transition-all ${playingSpanish ? 'animate-pulse' : ''}`} weight="fill" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
