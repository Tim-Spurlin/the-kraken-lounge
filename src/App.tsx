import { Hero } from '@/components/sections/Hero'
import { AudioOverview } from '@/components/sections/AudioOverview'
import { About } from '@/components/sections/About'
import { Events } from '@/components/sections/Events'
import { Music } from '@/components/sections/Music'
import { FoodDrinks } from '@/components/sections/FoodDrinks'
import { Community } from '@/components/sections/Community'
import { Contact } from '@/components/sections/Contact'
import { Navigation } from '@/components/Navigation'
import { Toaster } from '@/components/ui/sonner'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EventDetail } from '@/components/pages/EventDetail'
import { ScrollToHash } from '@/components/ScrollToHash'
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext'
import { PersistentPlayer } from '@/components/PersistentPlayer'
import { AudioPlaylistManager } from '@/components/AudioPlaylistManager'
import { useEffect } from 'react'

function Home() {
  return (
    <>
      <Hero />
      <AudioOverview />
      <About />
      <Events />
      <Music />
      <FoodDrinks />
      <Community />
      <Contact />
    </>
  )
}

function App() {
  useEffect(() => {
    const handleGlobalPlay = (e: Event) => {
      const target = e.target as HTMLMediaElement
      if (target.tagName === 'AUDIO' || target.tagName === 'VIDEO') {
        // Find all other media elements and pause them
        const mediaElements = document.querySelectorAll('audio, video')
        mediaElements.forEach((media) => {
          if (media !== target && !(media as HTMLMediaElement).paused) {
            (media as HTMLMediaElement).pause()
          }
        })
      }
    }

    document.addEventListener('play', handleGlobalPlay, true)
    
    return () => {
      document.removeEventListener('play', handleGlobalPlay, true)
    }
  }, [])

  return (
    <AudioPlayerProvider>
      <Router>
        <AudioPlaylistManager />
        <ScrollToHash />
        <div className="min-h-screen bg-background text-foreground pb-24">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<EventDetail />} />
            </Routes>
          </main>
          <footer className="bg-card border-t border-border py-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} The Kraken Lounge. Brownsville's Underground Music Sanctuary.
              </p>
              <p className="text-muted-foreground text-xs mt-2">
                1123 E Adams St, Suite C • Brownsville, TX 78520 • (956) 372-1550
              </p>
            </div>
          </footer>
          <PersistentPlayer />
          <Toaster />
        </div>
      </Router>
    </AudioPlayerProvider>
  )
}

export default App
