import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'

interface AudioTrack {
  title: string
  url: string
  language: 'english' | 'spanish'
  eventId?: string
  eventTitle?: string
}

interface AudioPlayerContextType {
  currentTrack: AudioTrack | null
  isPlaying: boolean
  audioRef: React.RefObject<HTMLAudioElement | null>
  playTrack: (track: AudioTrack) => void
  pause: () => void
  resume: () => void
  togglePlayPause: () => void
  currentTime: number
  duration: number
  seek: (time: number) => void
  volume: number
  setVolume: (volume: number) => void
  isMuted: boolean
  toggleMute: () => void
  nextTrack: () => void
  previousTrack: () => void
  playlist: AudioTrack[]
  setPlaylist: (tracks: AudioTrack[]) => void
  currentTrackIndex: number
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volumeKV, setVolumeKV] = useKV<number>('audio-player-volume', 0.7)
  const [volume, setVolumeInternal] = useState(volumeKV ?? 0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.7)
  const [playlist, setPlaylist] = useState<AudioTrack[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (volumeKV !== undefined) {
      setVolumeInternal(volumeKV)
    }
  }, [volumeKV])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume

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
  }, [volume, isMuted])

  const playTrack = (track: AudioTrack) => {
    if (audioRef.current) {
      if (currentTrack?.url === track.url && !audioRef.current.paused) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setCurrentTrack(track)
        
        let index = playlist.findIndex(t => t.url === track.url)
        
        if (index === -1) {
          const newPlaylist = [...playlist, track]
          setPlaylist(newPlaylist)
          index = newPlaylist.length - 1
        }
        
        setCurrentTrackIndex(index)
        
        audioRef.current.src = track.url
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const nextTrack = () => {
    if (playlist.length === 0) return
    
    const nextIndex = (currentTrackIndex + 1) % playlist.length
    const nextTrack = playlist[nextIndex]
    
    if (nextTrack && audioRef.current) {
      setCurrentTrack(nextTrack)
      setCurrentTrackIndex(nextIndex)
      audioRef.current.src = nextTrack.url
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const previousTrack = () => {
    if (playlist.length === 0) return
    
    const prevIndex = currentTrackIndex - 1 < 0 ? playlist.length - 1 : currentTrackIndex - 1
    const prevTrack = playlist[prevIndex]
    
    if (prevTrack && audioRef.current) {
      setCurrentTrack(prevTrack)
      setCurrentTrackIndex(prevIndex)
      audioRef.current.src = prevTrack.url
      audioRef.current.play()
      setIsPlaying(true)
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

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolumeInternal(clampedVolume)
    setVolumeKV(clampedVolume)
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume
    }
    if (isMuted && clampedVolume > 0) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      if (audioRef.current && volume !== undefined) {
        audioRef.current.volume = volume
      }
    } else {
      if (volume !== undefined) {
        setPreviousVolume(volume)
      }
      setIsMuted(true)
      if (audioRef.current) {
        audioRef.current.volume = 0
      }
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
        volume,
        setVolume,
        isMuted,
        toggleMute,
        nextTrack,
        previousTrack,
        playlist,
        setPlaylist,
        currentTrackIndex,
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
