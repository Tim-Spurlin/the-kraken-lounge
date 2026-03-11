import { Palette } from '@phosphor-icons/react'

export function ArtGallery() {
  return (
    <section id="art" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid" />
      <div className="absolute inset-0 aurora-gradient opacity-20" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Palette className="w-16 h-16 mx-auto text-accent mb-4" weight="fill" />
          <h2 className="font-heading text-5xl md:text-6xl mb-4 text-accent">
            Visual Arts Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our walls are a living canvas, showcasing the work of talented local artists from across the Rio Grande Valley. The art is always changing, always inspiring.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-border p-12 rounded-sm text-center">
          <p className="text-xl text-muted-foreground mb-4">
            Gallery content coming soon
          </p>
          <p className="text-foreground/70">
            The Kraken Lounge proudly displays rotating exhibitions of local visual art. Our physical walls are covered with paintings, illustrations, mixed-media pieces, and photography from diverse artists throughout the borderlands.
          </p>
        </div>
      </div>
    </section>
  )
}
