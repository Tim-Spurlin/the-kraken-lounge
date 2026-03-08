import { Guitar, Microphone, Disc, Lightning } from '@phosphor-icons/react'

export function Music() {
  const genres = [
    {
      icon: Guitar,
      name: 'Heavy Metal & Hard Rock',
      description: 'Traditional metal, Nu Metal, Doom Metal, and hardcore punk. High volume, intense energy, and uncompromising aggression.'
    },
    {
      icon: Lightning,
      name: 'Goth, Darkwave & Industrial',
      description: 'Synthesized atmospheres and dark aesthetics that perfectly complement our red-lit sanctuary. A home for the goth subculture.'
    },
    {
      icon: Microphone,
      name: 'Punk Rock & Alternative',
      description: 'DIY ethos, rapid-fire sets, and zero barrier between artist and crowd. Pure underground energy.'
    },
    {
      icon: Disc,
      name: 'Electronic & Techno',
      description: 'Underground techno, house, and EDM. Techno Sundays transform the lounge into a pulsating dance floor.'
    }
  ]

  const recurringEvents = [
    {
      day: 'Sunday',
      name: 'Techno Sundays',
      time: '9:30 PM',
      description: 'Less drama, more techno. Underground electronic music to close out your weekend.'
    },
    {
      day: 'Wednesday',
      name: 'Karaoke Night',
      time: '8:00 PM',
      description: 'Break down the barrier between performer and audience. Sing your heart out in our gothic sanctuary.'
    },
    {
      day: 'Friday',
      name: 'Live Band Showcase',
      time: '10:00 PM',
      description: 'Local and touring acts take the stage. Check our events calendar for lineup details.'
    },
    {
      day: 'Saturday',
      name: 'Special Events',
      time: 'Varies',
      description: 'Themed tribute nights, festivals, and one-of-a-kind experiences. Never the same twice.'
    }
  ]

  return (
    <section id="music" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl mb-4 text-accent">
            The Sound of the Underground
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A refuge from mainstream music. The only venue in Brownsville dedicated entirely to alternative, heavy, and underground sounds.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 gap-8">
            {genres.map((genre) => (
              <div 
                key={genre.name}
                className="bg-card border border-border p-6 rounded-sm card-glow"
              >
                <genre.icon className="w-12 h-12 text-accent mb-4" weight="fill" />
                <h3 className="font-heading text-2xl mb-3 text-foreground">
                  {genre.name}
                </h3>
                <p className="text-foreground/70">
                  {genre.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-heading text-4xl mb-8 text-center text-accent">
              Weekly Programming
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {recurringEvents.map((event) => (
                <div 
                  key={event.day}
                  className="bg-card border border-border p-6 rounded-sm hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-heading text-2xl text-foreground">
                        {event.name}
                      </h4>
                      <p className="text-accent font-bold">
                        Every {event.day} • {event.time}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground/70">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 border-2 border-primary p-8 rounded-sm text-center">
            <p className="text-xl font-heading text-foreground mb-2">
              Want to play at The Kraken Lounge?
            </p>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented alternative artists to grace our stage
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-primary hover:bg-accent text-primary-foreground font-heading px-8 py-3 rounded-sm transition-all hover:shadow-[0_0_30px_oklch(0.55_0.25_25_/_0.5)]"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
