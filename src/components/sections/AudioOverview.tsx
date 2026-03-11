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
    <section id="overview" className="py-24 bg-gradient-to-b from-background via-card to-background relative overflow-hidden">
      <div className="absolute inset-0 hexagon-pattern opacity-20" />
      <div className="absolute inset-0 aurora-gradient" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Headphones className="w-20 h-20 mx-auto text-accent animate-pulse-glow" weight="fill" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl text-gradient-purple gothic-glow"
            >
              Hear Our Story
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground font-heading"
            >
              Discover The Kraken Lounge in Your Language
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-lg blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative bg-card border-2 border-primary/40 rounded-lg p-8 deep-shadow hover:border-primary transition-all duration-500 glow-border overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                      <Globe className="w-8 h-8 text-primary" weight="fill" />
                    </div>
                    <div>
                      <h3 className="font-heading text-3xl text-accent">English</h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">Audio Overview</p>
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed">
                    Experience the full story of The Kraken Lounge's radical South Texas sanctuary. Learn about our mission, community, and cultural impact in English.
                  </p>

                  <audio
                    ref={englishAudioRef}
                    controlsList="nodownload"
                    onEnded={() => setPlayingEnglish(false)}
                    onPause={() => setPlayingEnglish(false)}
                    className="w-full"
                  >
                    <source src="https://res.cloudinary.com/dw3lf8roj/video/upload/v1773202298/The_Kraken_Lounge_s_Radical_South_Texas_Sanctuary_1_vtjdx2.mp4" type="video/mp4" />
                  </audio>

                  <button
                    onClick={handleEnglishPlay}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-heading text-xl py-4 px-6 rounded-md transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_40px_oklch(0.65_0.24_310_/_0.6)] group"
                  >
                    <SpeakerHigh className="w-6 h-6 group-hover:animate-pulse" weight="fill" />
                    {playingEnglish ? 'Pause' : 'Listen Now'}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/30 rounded-lg blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative bg-card border-2 border-accent/40 rounded-lg p-8 deep-shadow hover:border-accent transition-all duration-500 glow-border overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent">
                      <Globe className="w-8 h-8 text-accent" weight="fill" />
                    </div>
                    <div>
                      <h3 className="font-heading text-3xl text-accent">Español</h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">Vista General de Audio</p>
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed">
                    Vive la historia completa del oasis cultural de Brownsville. Descubre nuestra misión, comunidad e impacto cultural en español.
                  </p>

                  <audio
                    ref={spanishAudioRef}
                    controlsList="nodownload"
                    onEnded={() => setPlayingSpanish(false)}
                    onPause={() => setPlayingSpanish(false)}
                    className="w-full"
                  >
                    <source src="https://res.cloudinary.com/dw3lf8roj/video/upload/v1773202453/The_Kraken_Lounge_oasis_cultural_de_Brownsville_unssbh.mp4" type="video/mp4" />
                  </audio>

                  <button
                    onClick={handleSpanishPlay}
                    className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-heading text-xl py-4 px-6 rounded-md transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_40px_oklch(0.75_0.20_330_/_0.6)] group"
                  >
                    <SpeakerHigh className="w-6 h-6 group-hover:animate-pulse" weight="fill" />
                    {playingSpanish ? 'Pausar' : 'Escuchar Ahora'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-card/50 border border-primary/30 rounded-lg px-6 py-4 backdrop-blur-sm">
              <p className="text-muted-foreground text-sm">
                🎧 <span className="text-accent font-heading">Immerse yourself</span> in the complete Kraken Lounge experience
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
