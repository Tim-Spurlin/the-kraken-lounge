import { useState } from 'react'
import { Camera, X } from '@phosphor-icons/react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const galleryPhotos = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dw3lf8roj/image/upload/v1773000000/kraken-show-1.jpg',
    title: 'Metal Night',
    description: 'Packed house for a crushing metal performance'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dw3lf8roj/image/upload/v1773000001/kraken-show-2.jpg',
    title: 'Goth Night',
    description: 'First Friday Goth Night atmosphere'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dw3lf8roj/image/upload/v1773000002/kraken-show-3.jpg',
    title: 'Punk Rock Energy',
    description: 'High-energy punk performance'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dw3lf8roj/image/upload/v1773000003/kraken-show-4.jpg',
    title: 'Techno Sunday',
    description: 'Underground techno session'
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dw3lf8roj/image/upload/v1773000004/kraken-show-5.jpg',
    title: 'Live Band',
    description: 'Local band lighting up the stage'
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dw3lf8roj/image/upload/v1773000005/kraken-show-6.jpg',
    title: 'Crowd Energy',
    description: 'The crowd in full force'
  }
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof galleryPhotos[0] | null>(null)

  return (
    <section id="gallery" className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 hexagon-pattern opacity-10" />
      <div className="absolute inset-0 plasma-glow opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Camera className="w-16 h-16 mx-auto text-accent mb-4 gothic-glow" weight="fill" />
          <h2 className="font-heading text-5xl md:text-6xl mb-6 text-gradient-purple">
            Past Shows Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Relive the raw energy and unforgettable moments from our legendary nights of metal, punk, goth, and underground techno at Brownsville's premier alternative music sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border-2 border-border hover:border-accent transition-all duration-500 card-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/800x600/1a0a1f/a855f7?text=Show+Photo'
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="font-heading text-xl text-foreground mb-1 neon-text">
                  {photo.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {photo.description}
                </p>
              </div>

              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-accent/90 backdrop-blur-sm rounded-full p-4">
                  <Camera className="w-8 h-8 text-accent-foreground" weight="fill" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            More memories from the underground coming soon
          </p>
        </div>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl p-0 bg-background border-accent/50 overflow-hidden">
          {selectedPhoto && (
            <div className="relative">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-30 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-2 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" weight="bold" />
              </button>
              
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[85vh] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/1200x900/1a0a1f/a855f7?text=Show+Photo'
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-6">
                <h3 className="font-heading text-3xl text-foreground mb-2 neon-text">
                  {selectedPhoto.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
