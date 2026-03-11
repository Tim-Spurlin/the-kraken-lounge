import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Tag, Share2, MapPin } from 'lucide-react'
import { fetchEvents, type Event } from '@/data/events'

// The URL from Google Apps Script you provided
const TRACKING_API_URL = 'https://script.google.com/macros/s/AKfycbxPaQivWxKDYw31OIbjOjphwOFG6C4Rp286fz1YmRnYEOJffvGVSdKSeo-tNPgcmJmu/exec'

export function EventDetail() {
    const { id } = useParams()
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadEvent() {
            try {
                setLoading(true)
                // Use the much more stable Google Visualization API CSV export endpoint and bypass aggressive caching
                const sheetCsvUrl = `https://docs.google.com/spreadsheets/d/1eE5laJ0PUWvCJUrHWoYtVOoYz3YowZpOJWfVghkzLd8/gviz/tq?tqx=out:csv&t=${Date.now()}`
                const events = await fetchEvents(sheetCsvUrl)
                const foundEvent = events.find(e => e.id === id)

                if (foundEvent) {
                    setEvent(foundEvent)

                    // Trigger the analytics tracking!
                    fetch(TRACKING_API_URL, {
                        method: 'POST',
                        mode: 'no-cors', // standard approach to avoid basic CORS blocks when we just need to send data
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            eventId: foundEvent.id,
                            title: foundEvent.title,
                            date: foundEvent.date
                        })
                    }).catch(err => console.error("Tracking Error:", err)); // fire and forget
                } else {
                    setError('Event not found')
                }
            } catch (err) {
                setError('Failed to load event details')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            loadEvent()
        }
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-display text-destructive mb-4">Error</h1>
                <p className="text-muted-foreground mb-8">{error || 'Event not found'}</p>
                <Link to="/" className="text-accent hover:text-accent/80 flex items-center gap-2 transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>
        )
    }

    const isFree = !event.price || event.price.toLowerCase() === 'free'

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to all events
            </Link>

            <article className="glass-panel p-8 md:p-12 rounded-2xl border border-primary/20 relative overflow-hidden group">
                {/* Subtle background glow based on event type */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                                {event.type}
                            </span>
                            {isFree ? (
                                <span className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                                    Free Entry
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-accent/20 text-accent border border-accent/30">
                                    {event.price}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-gradient-purple mb-6 leading-tight">
                            {event.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-muted-foreground mb-8 font-heading">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-accent" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span>The Kraken Lounge</span>
                            </div>
                        </div>

                        {event.bands && (
                            <div className="mb-8 p-6 rounded-xl bg-background/50 border border-border/50">
                                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Featuring</h3>
                                <div className="flex flex-wrap gap-2">
                                    {event.bands.map((band: string, idx: number) => (
                                        <span key={idx} className="font-heading text-lg text-foreground px-3 py-1 rounded-md bg-secondary/50 border border-secondary">
                                            {band.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed text-slate-300 whitespace-pre-wrap">
                                {event.description}
                            </p>
                        </div>

                        {event.genres && (
                            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border/50 text-muted-foreground">
                                <Tag className="w-4 h-4" />
                                <span className="text-sm font-medium uppercase tracking-wider">
                                    {event.genres}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-4">
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: event.title,
                                        text: `Check out ${event.title} at The Kraken Lounge!`,
                                        url: window.location.href,
                                    })
                                } else {
                                    navigator.clipboard.writeText(window.location.href)
                                    alert('Link copied to clipboard!')
                                }
                            }}
                            className="px-6 py-3 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground font-heading tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-border"
                        >
                            <Share2 size={18} />
                            Share Event
                        </button>

                        <a
                            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Kraken+Lounge:+Event"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-xl bg-accent text-background font-heading tracking-wider font-semibold hover:bg-accent/90 transition-all duration-300 shadow-[0_0_15px_oklch(0.6_0.2_280_/_0.5)] hover:shadow-[0_0_25px_oklch(0.6_0.2_280_/_0.7)] text-center"
                        >
                            Add to Calendar
                        </a>
                    </div>
                </div>
            </article>
        </div>
    )
}
