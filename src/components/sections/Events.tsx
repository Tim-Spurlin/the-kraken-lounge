import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { CalendarBlank, Clock, MapPin } from '@phosphor-icons/react'
import { format } from 'date-fns'

import { Event, defaultEvents, fetchEvents } from '@/data/events'

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1eE5laJ0PUWvCJUrHWoYtVOoYz3YowZpOJWfVghkzLd8/export?format=csv'

export function Events() {
  const [events, setEvents] = useState<Event[]>(defaultEvents)
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL.includes('YOUR_PUBLISHED')) {
        console.warn('Google Sheets URL not configured. Using default events.')
        setIsLoading(false)
        return
      }
      
      try {
        console.log('Fetching events from Google Sheets...')
        const data = await fetchEvents(GOOGLE_SHEET_CSV_URL)
        console.log('Fetched events:', data)
        if (data && data.length > 0) {
          setEvents(data)
        } else {
          console.warn('No events found in Google Sheet, using defaults')
        }
      } catch (e) {
        console.error('Failed to load events from Google Sheet, using fallback:', e)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Filter out events that occurred before today
  const upcomingEvents = events.filter((event) => {
    if (!event.date) return true; // keep if no date
    const eventDate = new Date(event.date)
    if (isNaN(eventDate.getTime())) return true; // keep if date is malformed so it doesn't crash
    return eventDate >= today
  })

  const filteredEvents = activeTab === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(event => event.type === activeTab)

  const getGenreColor = (genre: string) => {
    const colors: Record<string, string> = {
      'Metal': 'bg-primary text-primary-foreground',
      'Punk': 'bg-accent text-accent-foreground',
      'Goth': 'bg-secondary text-secondary-foreground',
      'Industrial': 'bg-muted text-muted-foreground',
      'Techno': 'bg-primary/60 text-foreground',
      'Indie': 'bg-accent/60 text-foreground'
    }
    return colors[genre] || 'bg-muted text-muted-foreground'
  }

  return (
    <section id="events" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 hexagon-pattern" />
      <div className="absolute inset-0 aurora-gradient opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-5xl md:text-6xl mb-4 text-gradient-purple gothic-glow">
            Upcoming Shows
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From live bands to themed nights, there's always something happening at The Kraken Lounge
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-3 md:grid-cols-5 mb-8 bg-card gap-2">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All Events</TabsTrigger>
            <TabsTrigger value="live" className="text-xs sm:text-sm">Live Bands</TabsTrigger>
            <TabsTrigger value="themed" className="text-xs sm:text-sm">Themed Nights</TabsTrigger>
            <TabsTrigger value="recurring" className="text-xs sm:text-sm">Weekly</TabsTrigger>
            <TabsTrigger value="special" className="text-xs sm:text-sm">Special Events</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredEvents.length === 0 ? (
              <Card className="p-12 text-center bg-card border-border">
                <p className="text-xl text-muted-foreground mb-4">
                  No upcoming events in this category yet.
                </p>
                <p className="text-muted-foreground">
                  Check back soon or follow us on social media for the latest updates!
                </p>
              </Card>
            ) : (
              filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="p-6 bg-card border-2 border-primary/40 hover:border-primary card-glow transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 circuit-lines opacity-30 pointer-events-none" />
                  <div className="relative z-10 flex flex-col md:flex-row gap-6">
                    <div className="md:w-32 flex-shrink-0">
                      <div className="bg-primary text-primary-foreground p-4 rounded-sm text-center">
                        <div className="text-3xl font-heading">
                          {format(new Date(event.date), 'dd')}
                        </div>
                        <div className="text-sm uppercase tracking-wider">
                          {format(new Date(event.date), 'MMM')}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-heading text-2xl md:text-3xl text-foreground">
                          {event.title}
                        </h3>
                        {event.price && (
                          <span className="text-accent font-bold text-lg">
                            {event.price}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {event.genres.map((genre) => (
                          <Badge key={genre} className={getGenreColor(genre)}>
                            {genre}
                          </Badge>
                        ))}
                      </div>

                      {event.bands && event.bands.length > 0 && (
                        <div className="text-foreground/80">
                          <span className="font-bold">Lineup:</span> {event.bands.join(' • ')}
                        </div>
                      )}

                      <p className="text-foreground/70">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2">
                          <Clock weight="bold" className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin weight="bold" className="w-4 h-4" />
                          The Kraken Lounge
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
