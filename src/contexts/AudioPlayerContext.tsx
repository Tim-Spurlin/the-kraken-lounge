import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react'

interface AudioTrack {
  title: string
  url: string
  language: 'english' | 'spanish'
}

interface AudioPlayerContextType {
  currentTrack: AudioTrack | null
  isPlaying: boolean
  audioRef: React.RefObject<HTMLAudioElement>
  playTrack: (track: AudioTrack) => void
  pause: () => void
  resume: () => void
  togglePlayPause: () => void
  currentTime: number
  duration: number
  seek: (time: number) => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handlePause = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
    }
  }, [])

  const playTrack = (track: AudioTrack) => {
    if (audioRef.current) {
      if (currentTrack?.url === track.url && !audioRef.current.paused) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setCurrentTrack(track)
        audioRef.current.src = track.url
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resume = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      resume()
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        audioRef,
        playTrack,
        pause,
        resume,
        togglePlayPause,
        currentTime,
        duration,
        seek,
      }}
    >
      {children}
      <audio ref={audioRef} className="hidden" controlsList="nodownload" />
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}
