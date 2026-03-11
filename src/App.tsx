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

function App() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <AudioOverview />
        <About />
        <Events />
        <Music />
        <FoodDrinks />
        <Community />
        <Contact />
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
      <Toaster />
    </div>
  )
}

export default App
