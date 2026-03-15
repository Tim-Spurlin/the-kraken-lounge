import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from '@phosphor-icons/react'

export function Lore() {
  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background layer */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 plasma-glow opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 py-12 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors mb-8 font-heading"
        >
          <ArrowLeft weight="bold" />
          Back to The Kraken
        </Link>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-sm bg-accent/20 text-accent mb-6 border border-accent glow">
            <BookOpen className="w-8 h-8" weight="duotone" />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl mb-4 text-foreground gothic-glow uppercase tracking-wider">
            The Lore of The Kraken
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full glow" />
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-start">
          
          <div className="order-2 md:order-1 space-y-6 text-lg text-foreground/80 leading-relaxed font-sans bg-card/60 p-8 rounded-sm border border-primary/30 deep-shadow">
            <p className="first-letter:text-5xl first-letter:font-heading first-letter:text-accent first-letter:float-left first-letter:mr-2">
              They called him... the Kraken. Sailing from port to port, not to forget, but to find a bar worth remembering. But every bar failed him. Weak drinks. Dead music. Empty laughter.
            </p>
            <p>
              And when a bar failed him... he left it broken, burning, and buried in smoke.
            </p>
            <p>
              Then one night, he came to a little town named Brownsville, near the far southern edge of Texas by the Gulf. The air felt different. Warmer. Real. Then he saw it. The Kraken Lounge. A place wearing his name.
            </p>
            <p>
              He stepped inside, ready to hate it. But the drinks were perfect. The music had soul. The art on the walls seemed alive. And for the first time in years... the storm inside him grew quiet.
            </p>
            <p className="italic text-accent font-medium mt-4">
              He did not leave the place in ash. Instead... it found a place in his heart.
            </p>
            <p className="font-heading text-xl mt-2">
              So, he stayed.
            </p>
          </div>

          <div className="order-1 md:order-2 sticky top-28">
            <div className="w-full aspect-[9/16] rounded-sm overflow-hidden border-2 border-accent shadow-[0_0_40px_oklch(0.55_0.24_310_/_0.3)] bg-black">
              <video
                controls
                controlsList="nodownload"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover"
                poster="https://www.dropbox.com/scl/fi/b2qbbpu4tmwyyhg0kdcwg/ChatGPT-Image-Mar-13-2026-02_24_35-PM.png?rlkey=66678zpw0yndr8bbnwgwl355y&st=napvvh5c&raw=1"
                playsInline
                preload="metadata"
              >
                <source src="https://www.dropbox.com/scl/fi/ru4v3czetkfdnlle0dbv8/The-Kraken-Lounge_-A-Bar-Worth-Remembering_1773439982.mp4?rlkey=1e5gemn7rat8w8j052h6157qv&st=ml87zf9p&raw=1" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 italic">
              Immerse yourself in the story...
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
