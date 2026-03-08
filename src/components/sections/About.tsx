import { Lightning, Heart, MusicNotes } from '@phosphor-icons/react'

export function About() {
  return (
    <section id="about" className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-5xl md:text-6xl text-center mb-12 text-accent">
            A Sanctuary for Alternative Culture
          </h2>
          
          <div className="prose prose-invert prose-lg max-w-none space-y-6 text-foreground/90">
            <p className="text-xl leading-relaxed">
              Since its doors first opened, <span className="text-accent font-bold">The Kraken Lounge</span> has stood as Brownsville's definitive refuge for alternative music and underground culture. Located in the heart of historic downtown at 1123 E Adams St, Suite C, we are more than just a bar—we are a cultural institution, a community hub, and a sanctuary for those who refuse to conform.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 my-12">
              <div className="text-center space-y-3">
                <Lightning className="w-12 h-12 mx-auto text-accent" weight="fill" />
                <h3 className="font-heading text-2xl text-foreground">Rebellious</h3>
                <p className="text-muted-foreground">A getaway from mainstream music, championing heavy metal, punk, goth, industrial, and underground techno.</p>
              </div>
              <div className="text-center space-y-3">
                <MusicNotes className="w-12 h-12 mx-auto text-accent" weight="fill" />
                <h3 className="font-heading text-2xl text-foreground">Authentic</h3>
                <p className="text-muted-foreground">Low-lit, gothic atmosphere meets genuine dive bar warmth. Raw, unpretentious, and real.</p>
              </div>
              <div className="text-center space-y-3">
                <Heart className="w-12 h-12 mx-auto text-accent" weight="fill" />
                <h3 className="font-heading text-2xl text-foreground">Welcoming</h3>
                <p className="text-muted-foreground">A safe, inclusive space where alternative subcultures thrive and everyone belongs.</p>
              </div>
            </div>
            
            <p className="text-xl leading-relaxed">
              Under the leadership of owner <span className="font-bold">Daniel Alvarado</span>, The Kraken Lounge has weathered storms—both literal and metaphorical. When the COVID-19 pandemic forced venues across the country to shutter permanently, we fought to survive. Through the darkest days of 2020, Daniel's unwavering commitment to the community kept the dream alive. In 2021, we reopened with strict safety protocols, proving that The Kraken Lounge was here to stay.
            </p>
            
            <p className="text-xl leading-relaxed">
              Today, we continue to champion the artists, musicians, and creatives who make the Rio Grande Valley's alternative scene pulse with life. Our walls showcase rotating exhibitions of local visual art. Our stage hosts touring indie bands, local legends, and everything in between. Our kitchen serves up some of the best pizza in Brownsville. And our bar pours ice-cold beers and handcrafted cocktails at prices that honor our working-class roots.
            </p>
            
            <div className="bg-background/50 border border-primary/30 p-6 rounded-sm mt-8">
              <p className="text-lg italic text-center text-foreground/80">
                "One of the absolute only establishments in Brownsville catered specifically and unapologetically to the alternative music scene."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
