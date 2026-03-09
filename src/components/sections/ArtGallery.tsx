import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Palette } from '@phosphor-icons/react'

interface Artwork {
  id: string
  title: string
  artist: string
  imageUrl: string
  description: string
}

export function ArtGallery() {
  const [artworks] = useKV<Artwork[]>('artworks', [])
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  const artworksList = artworks || []

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

        {artworksList.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-card border border-border p-12 rounded-sm text-center">
            <p className="text-xl text-muted-foreground mb-4">
              Gallery content coming soon
            </p>
            <p className="text-foreground/70">
              The Kraken Lounge proudly displays rotating exhibitions of local visual art. Our physical walls are covered with paintings, illustrations, mixed-media pieces, and photography from diverse artists throughout the borderlands.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {artworksList.map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => setSelectedArtwork(artwork)}
                className="group cursor-pointer bg-card border-2 border-primary/40 rounded-sm overflow-hidden card-glow relative"
              >
                <div className="absolute inset-0 hexagon-pattern opacity-20 pointer-events-none" />
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-xl text-foreground mb-1">
                    {artwork.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    by {artwork.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 max-w-3xl mx-auto bg-background/50 border border-primary/30 p-6 rounded-sm text-center">
          <p className="text-lg text-foreground/80 mb-3">
            <span className="font-bold text-accent">Local Artists:</span> Want to display your work at The Kraken Lounge?
          </p>
          <p className="text-muted-foreground">
            We provide a platform for painters, illustrators, photographers, and mixed-media creators outside the constraints of traditional galleries. Contact us to learn about exhibition opportunities.
          </p>
        </div>
      </div>

      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-3xl bg-card border-border">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-3xl text-foreground">
                  {selectedArtwork.title}
                </DialogTitle>
                <p className="text-muted-foreground">by {selectedArtwork.artist}</p>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="w-full rounded-sm"
                />
                <p className="text-foreground/80">
                  {selectedArtwork.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
