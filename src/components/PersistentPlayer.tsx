import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, X } from '@phosphor-icons/react'
import { useAudioPlayer } from '@/contexts/AudioPlayerContext'
import { Slider } from '@/components/ui/slider'

export function PersistentPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, currentTime, duration, seek } = useAudioPlayer()

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSliderChange = (value: number[]) => {
    seek(value[0])
  }

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t-2 border-primary/40 shadow-2xl"
          style={{
            boxShadow: '0 -10px 50px oklch(0.65 0.24 310 / 0.4), 0 -20px 100px oklch(0.65 0.24 310 / 0.3)'
          }}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={togglePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.65_0.24_310_/_0.7)]"
              >
                {isPlaying ? (
                  <Pause weight="fill" className="w-5 h-5" />
                ) : (
                  <Play weight="fill" className="w-5 h-5 ml-0.5" />
                )}
              </motion.button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="font-heading text-sm uppercase tracking-wider text-foreground truncate">
                      {currentTrack.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-heading uppercase tracking-wide flex-shrink-0 ${
                      currentTrack.language === 'english' 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'bg-accent/20 text-accent border border-accent/30'
                    }`}>
                      {currentTrack.language === 'english' ? 'EN' : 'ES'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono flex-shrink-0">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSliderChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
