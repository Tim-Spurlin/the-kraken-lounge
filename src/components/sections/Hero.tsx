import { Flame } from '@phosphor-icons/react'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center gradient-mesh bg-noise overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,oklch(0.12_0.01_265)_100%)]" />
      
      <div className="container mx-auto px-4 text-center relative z-10 py-32">
        <div className="max-w-5xl mx-auto space-y-8">
          <Flame className="w-16 h-16 md:w-24 md:h-24 mx-auto text-accent animate-pulse-glow" weight="fill" />
          
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-accent gothic-glow leading-tight">
            The Kraken Lounge
          </h1>
          
          <p className="font-heading text-2xl md:text-4xl text-foreground tracking-wider">
            Brownsville's Underground Music Sanctuary
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <div className="text-center">
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Open Daily</p>
              <p className="font-heading text-xl text-foreground">5:00 PM - 2:00 AM</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Location</p>
              <p className="font-heading text-xl text-foreground">1123 E Adams St, Suite C</p>
            </div>
          </div>
          
          <div className="pt-8">
            <a 
              href="#events" 
              className="inline-block bg-primary hover:bg-accent text-primary-foreground font-heading text-lg px-8 py-4 rounded-sm transition-all hover:shadow-[0_0_30px_oklch(0.55_0.25_25_/_0.5)] hover:scale-105"
            >
              See Upcoming Shows
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  )
}
