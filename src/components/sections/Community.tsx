import { Users, GraduationCap, HandHeart } from '@phosphor-icons/react'

export function Community() {
  const initiatives = [
    {
      icon: GraduationCap,
      title: 'UTRGV #Subculture Initiative',
      description: 'Multi-year collaboration with the University of Texas Rio Grande Valley bringing artists, musicians, and creatives together. Featured steamroller printmaking, musical innovation workshops, VR tours, and pop-up performances that transformed downtown streets into an open-air arts incubator.'
    },
    {
      icon: Users,
      title: 'Hernandez-Brownsville Music Festival',
      description: 'Hosted this ambitious 11-band festival designed to bring high-quality, community-based shows to the Rio Grande Valley. Featured regional headliners, local legends, and an 8-year reunion performance — all under one roof.'
    },
    {
      icon: HandHeart,
      title: 'Charitable Fundraising',
      description: 'From Woofstock 2018 to various community causes, The Kraken Lounge opens its doors for philanthropic events that support local families and animals in need.'
    }
  ]

  return (
    <section id="community" className="py-20 gradient-mesh bg-noise">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl md:text-6xl mb-4 text-accent">
              Community Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              More than a bar — a vital cultural institution deeply integrated into the civic life of Brownsville
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {initiatives.map((item) => (
              <div 
                key={item.title}
                className="bg-card border border-border p-8 rounded-sm card-glow"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <item.icon className="w-16 h-16 text-accent flex-shrink-0" weight="fill" />
                  <div>
                    <h3 className="font-heading text-2xl mb-3 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-foreground/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-background border-2 border-primary/50 p-8 rounded-sm">
            <h3 className="font-heading text-3xl text-center mb-6 text-accent">
              Supporting the Underground
            </h3>
            <div className="space-y-4 text-foreground/80">
              <p className="text-lg">
                <span className="font-bold text-accent">For Local Visual Artists:</span> Our walls are your canvas. We display rotating exhibitions of local artwork, providing visibility outside traditional gallery constraints.
              </p>
              <p className="text-lg">
                <span className="font-bold text-accent">For Independent Musicians:</span> We're a critical node in the Texas touring circuit, connecting Valley artists with regional and national acts.
              </p>
              <p className="text-lg">
                <span className="font-bold text-accent">For the Alternative Community:</span> We provide the absolute only venue in Brownsville dedicated entirely to alternative, heavy, and underground sounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
