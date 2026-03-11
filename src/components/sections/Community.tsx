import { Users, GraduationCap, HandHeart, FilmStrip, RowsPlusTop, Boat } from '@phosphor-icons/react'

export function Community() {
  const initiatives = [
    {
      icon: GraduationCap,
      title: 'UTRGV #Subculture: Feel the Beat',
      description: 'Landmark collaboration with University of Texas Rio Grande Valley Public Relations, Main Street District, and Brownsville International Film Festival. Drew over 300+ attendees with workshops in printmaking, music production/theory, VR, and dance. First 250 participants received free commemorative T-shirts. A massive multi-disciplinary educational event transforming the venue into an interactive campus.'
    },
    {
      icon: Users,
      title: 'Hernandez-Brownsville Music Festival (BMF)',
      description: 'Annual festival organized by the Hernandez brothers to combat regional brain drain. Provides economic incentive for musicians to stay in the Rio Grande Valley. Features multi-band showcases with accessible pricing ($10 pre-sale, $15 at door). Owner Daniel Alvarado: "My goal is to have really good musicians down in the Valley. We want to build something the community can be a part of."'
    },
    {
      icon: FilmStrip,
      title: 'Brownsville International Film Festival (BIFF)',
      description: 'Official screening location for BIFF, supporting the festival\'s mission to promote film and broader arts within the border region. Proving versatility as a multi-disciplinary cultural space beyond live music.'
    },
    {
      icon: Boat,
      title: 'Team Kraken Kayak Sponsorship',
      description: 'Active sponsor of Team Kraken, a local kayak team competing in the 2026 season. Demonstrates local business mutualism—publicly thanking The Grafik Spot (Sandra) and Bryan Vega for custom tie-dye team shirts. Team rallies at partner venues like Cobbleheads, showcasing cross-business collaboration.'
    },
    {
      icon: RowsPlusTop,
      title: 'Alternative Lifestyle Events',
      description: 'Hosts specialized educational weekends including "Fifty Shades of Kraken" BDSM educational events with Electric Play Class (by Markus of Fox-n-lion) and Negotiations Dynamic Classes focused on consent and safety. Also hosts annual Kraken EVENT Weekend featuring Meet & Greet, Taping Class, Miss Kraken Bikini Contest, and DJ sets—celebrating venue anniversary and owner Daniel Alvarado\'s birthday.'
    },
    {
      icon: HandHeart,
      title: 'Philanthropic & Tourism Integration',
      description: 'Participates in citywide events like Almost St. Patrick\'s Day Pub Crawl. Featured on private party bus itineraries alongside 5x5 Brewing Co., El Hueso de Fraile, and Half Moon Saloon. Consistently integrated into regional tourism and mobile commerce supporting downtown economic development.'
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
              A Decade of Community Building
            </h3>
            <div className="space-y-4 text-foreground/80">
              <p className="text-lg">
                Operating for approximately a decade under the leadership of Daniel Alvarado through AlvaradoEstrada LLC, The Kraken Lounge has successfully navigated significant economic challenges—including a temporary COVID-19 shutdown with an estimated $100,000 loss—emerging stronger and more committed to the community.
              </p>
              <p className="text-lg">
                <span className="font-bold text-accent">Municipal Leadership:</span> As Brownsville expanded its downtown entertainment districts and bar safety regulations, The Kraken Lounge was highlighted as a benchmark for compliance and civic responsibility. Alvarado stated: "I've been here for 10 years and I rarely have any issues. But the reality is that we do sell alcohol and liquor and something is bound to happen." This mature approach to safety—embracing ID scanning, cameras, and heightened protocols—ensures patron security while supporting downtown revitalization.
              </p>
              <p className="text-lg">
                <span className="font-bold text-accent">For Local Visual Artists:</span> Our walls are your canvas. We display rotating exhibitions providing visibility outside traditional gallery constraints. Staff actively accommodate accessibility needs, rearranging spaces for wheelchair users and adjusting lighting to reduce seizure risks.
              </p>
              <p className="text-lg">
                <span className="font-bold text-accent">For Independent Musicians:</span> We're a critical node in the Texas touring circuit. As Alvarado explains: "My goal is to have really good musicians down in the Valley. A lot of our locals can stay down here and enjoy a good show. We want to build something the community can be a part of."
              </p>
              <p className="text-lg">
                <span className="font-bold text-accent">For the Alternative Community:</span> We provide the absolute only venue in Brownsville dedicated entirely to alternative, heavy, and underground sounds. From metal and goth to punk and techno, we serve marginalized subcultures excluded from mainstream entertainment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
