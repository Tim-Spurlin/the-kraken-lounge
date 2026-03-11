import { Guitar, Microphone, Disc, Lightning } from '@phosphor-icons/react'
import { useRef, useEffect } from 'react'

export function Music() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      audio.currentTime = 0
    }

    const handleTimeUpdate = () => {
      if (audio.currentTime >= 226) {
        audio.pause()
        audio.currentTime = 0
      }
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

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
    <section id="music" className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 circuit-lines" />
      <div className="absolute inset-0 plasma-glow opacity-20" />
      
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
                className="bg-card border-2 border-primary/40 p-6 rounded-sm card-glow relative overflow-hidden"
              >
                <div className="absolute inset-0 hexagon-pattern opacity-20 pointer-events-none" />
                <genre.icon className="w-12 h-12 text-accent mb-4 relative z-10" weight="fill" />
                <h3 className="font-heading text-2xl mb-3 text-foreground relative z-10">
                  {genre.name}
                </h3>
                <p className="text-foreground/70 relative z-10">
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
                  className="bg-card border-2 border-primary/40 p-6 rounded-sm hover:border-primary transition-colors card-glow relative overflow-hidden"
                >
                  <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
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

          <div className="bg-card border border-primary p-8 rounded-sm card-glow">
            <h3 className="font-heading text-3xl mb-6 text-center text-accent">
              Official Music Video
            </h3>
            <div className="space-y-6">
              <div className="aspect-video w-full rounded-sm overflow-hidden border-2 border-accent shadow-[0_0_40px_oklch(0.65_0.24_310_/_0.3)]">
                <video 
                  controls 
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                  poster="https://res.cloudinary.com/dw3lf8roj/image/upload/v1772991787/ChatGPT_Image_Mar_8_2026_10_12_36_AM_owghcv.png"
                >
                  <source src="https://www.dropbox.com/scl/fi/t4bpagqx89xg2m524bjmj/Kraken-Music-Video_Official-03-10-2026.mp4?rlkey=1l5wt7qgugsb6znyec2clm48r&st=xf6jqv1o&raw=1" type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              </div>
              <div className="text-center">
                <h4 className="font-heading text-2xl text-foreground mb-2">
                  The Kraken - Official Music Video
                </h4>
                <p className="text-muted-foreground">
                  A gift from one of our beloved regulars. This is what The Kraken Lounge inspires—raw creativity and musical passion from our community. A visual and sonic tribute to Brownsville's underground sanctuary.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-primary p-8 rounded-sm card-glow">
            <h3 className="font-heading text-3xl mb-6 text-center text-accent">
              Featured Track
            </h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <img 
                  src="https://res.cloudinary.com/dw3lf8roj/image/upload/v1772991787/ChatGPT_Image_Mar_8_2026_10_12_36_AM_owghcv.png"
                  alt="The Kraken single artwork"
                  className="w-full aspect-square object-cover rounded-sm border-2 border-accent shadow-[0_0_40px_oklch(0.65_0.24_310_/_0.3)]"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-heading text-2xl text-foreground mb-2">
                    The Kraken
                  </h4>
                  <p className="text-muted-foreground mb-1">
                    An original track created as a gift by one of our beloved regulars. This is what The Kraken Lounge inspires—raw creativity and musical passion from our community.
                  </p>
                  <p className="text-accent text-sm font-bold">
                    Duration: 3:46
                  </p>
                </div>
                <audio 
                  ref={audioRef}
                  controls 
                  controlsList="nodownload"
                  className="w-full"
                  style={{
                    accentColor: 'oklch(0.65 0.24 310)',
                    filter: 'brightness(0.9) contrast(1.1)'
                  }}
                >
                  <source src="https://res.cloudinary.com/dw3lf8roj/video/upload/v1773027817/41qnq-5adv5_apk5ll.wav" type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
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
