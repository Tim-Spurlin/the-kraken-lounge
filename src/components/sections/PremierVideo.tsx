import { FilmSlate } from '@phosphor-icons/react'

export function PremierVideo() {
  return (
    <section id="premier-video" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 plasma-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <FilmSlate className="w-12 h-12 text-accent" weight="fill" />
              <h2 className="font-heading text-5xl md:text-6xl text-accent gothic-glow">
                Official Video
              </h2>
              <FilmSlate className="w-12 h-12 text-accent" weight="fill" />
            </div>
            <p className="text-xl text-muted-foreground">
              Experience The Kraken — Brownsville's Underground Music Sanctuary
            </p>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg border-2 border-primary deep-shadow">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.dropbox.com/scl/fi/x8vzxq1pyglo56usrkilc/official-kraken-music-video-project-OFFICIAlL333_Final-Edit.mp4?rlkey=hr6o94gdpi1xcpjf85v6b757f&st=si4bb8ih&raw=1"
                  title="Official Kraken Music Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-8 bg-card/50 backdrop-blur-sm border border-primary/30 p-6 rounded-sm">
              <p className="text-center text-foreground/90 text-lg leading-relaxed">
                Step inside Brownsville's premier underground venue. This official video captures the raw energy,
                intense performances, and electrifying atmosphere that makes The Kraken Lounge the heartbeat of
                the Valley's alternative music scene. From thunderous metal shows to intimate acoustic sets,
                this is where legendary nights are born.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
