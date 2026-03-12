import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, MapPin, Headphones } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import { fetchEvents, type Event } from '@/data/events'
import { useAudioPlayer } from '@/contexts/AudioPlayerContext'
import { Globe, SpeakerHigh } from '@phosphor-icons/react'

const TRACKING_API_URL = 'https://script.google.com/macros/s/AKfycbxPaQivWxKDYw31OIbjOjphwOFG6C4Rp286fz1YmRnYEOJffvGVSdKSeo-tNPgcmJmu/exec'

const EVENT_AUDIO_URLS: Record<string, { english: string; spanish: string }> = {
  '4': {
    english: 'https://www.dropbox.com/scl/fi/eq6782sfui2kzxkgkx68p/German_industrial_legends_Das_Ich_in_Brownsville.m4a?rlkey=d3h7uusk4xrb0s8svwtpvhy0q&st=eiyf5gzo&dl=1',
    spanish: 'https://www.dropbox.com/scl/fi/2m0layi9i35jm6v12bdx1/Das_Ich_conquista_Brownsville.m4a?rlkey=ltdfvqvbmzasmsgz0ffzbvzka&st=qs3xw2n2&dl=1'
  },
  '5': {
    english: 'https://www.dropbox.com/scl/fi/uj6huaplmys2ng3gj1x52/Brujeria-s_Masked_Deathgrind_Rebellion_in_Brownsville.m4a?rlkey=ybz1dzzuesuvprjvydvc7luly&st=90m3vuel&dl=1',
    spanish: 'https://www.dropbox.com/scl/fi/kj1oecb8ozom3vj01jd5q/Brujer-a_y_el_mito_del_metal_narcosat-nico.m4a?rlkey=d1osfqc36f2lpr0imkf3xu0f6&st=p8pb4lof&dl=1'
  },
  '7': {
    english: 'https://www.dropbox.com/scl/fi/vrxbmgiazx2hf19iji86f/Brownsville_s_First_Friday_Goth_Night_Sanctuary.m4a?rlkey=yve8smahs8oqryym4p4qpvwqn&st=04sk6q2f&dl=1',
    spanish: 'https://www.dropbox.com/scl/fi/kz8064avmqaqtcxeeul3m/G-ticos_impulsando_el_centro_de_Brownsville.m4a?rlkey=2vgqop1s503pnadvneqqaor9o&st=7dretta6&dl=1'
  },
  '2': {
    english: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773288866/Why_Heavy_Noise_Cures_Modern_Anxiety_pwleyp.mp4',
    spanish: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773288899/M%C3%BAsica_oscura_como_herramienta_de_supervivencia_rsgftd.mp4'
  },
  '8': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/8qa406tsq8hwhj5thmqog/Underground_Techno_Cures_Sunday_Scaries.m4a?rlkey=0ns4ltliqd0gel0n7mxu86imp&st=c9ltwtp5',
    spanish: 'https://dl.dropboxusercontent.com/scl/fi/3jtxdy6k6hixoomqax7ir/Terapia_de_techno_dominical_en_Brownsville.m4a?rlkey=s9sxxi8cgh7bu25631z4l1f6o&st=0zxner97'
  },
  '3': {
    english: 'https://dl.dropboxusercontent.com/scl/fi/uf03itkdfagqfns0g213c/Dark_Alternative_Collision_in_Brownsville.m4a?rlkey=d5lo2j62obd2uw4ee10cfvgrc&st=0qd52thg',
    spanish: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1773288899/M%C3%BAsica_oscura_como_herramienta_de_supervivencia_rsgftd.mp4'
  }
}

const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVFxhкультовый_id/pub?output=csv'

export function EventDetail() {
    const { id } = useParams()
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { playTrack, currentTrack, isPlaying, setPlaylist } = useAudioPlayer()

    useEffect(() => {
        async function loadEvent() {
            try {
                setLoading(true)
                const events = await fetchEvents(sheetCsvUrl)
                const foundEvent = events.find(e => e.id === id)

                if (foundEvent) {
                    setEvent(foundEvent)

                    fetch(TRACKING_API_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            eventId: foundEvent.id,
                            title: foundEvent.title,
                            date: foundEvent.date
                        })
                    }).catch(err => console.error("Tracking Error:", err))
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

    useEffect(() => {
        if (event) {
            const pageTitle = `${event.title} | The Kraken Lounge`
            document.title = pageTitle
            window.scrollTo(0, 0)

            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('config', 'G-KCDECFFH0G', {
                    page_location: window.location.href,
                    page_path: window.location.pathname
                })
            }

            if (event.id && EVENT_AUDIO_URLS[event.id]) {
                const audioUrls = EVENT_AUDIO_URLS[event.id]
                const audioTracks = [
                    {
                        title: event.title,
                        url: audioUrls.english,
                        language: 'english' as const,
                        eventId: event.id,
                        eventTitle: event.title
                    },
                    {
                        title: event.title,
                        url: audioUrls.spanish,
                        language: 'spanish' as const,
                        eventId: event.id,
                        eventTitle: event.title
                    }
                ]
                setPlaylist(audioTracks)
            }
        }
    }, [event, setPlaylist])

    const hasAudioOverview = event?.id && EVENT_AUDIO_URLS[event.id]
    const audioUrls = hasAudioOverview ? EVENT_AUDIO_URLS[event.id] : null

    const handlePlayEnglish = () => {
        if (event && audioUrls) {
            playTrack({
                title: event.title,
                url: audioUrls.english,
                language: 'english',
                eventId: event.id,
                eventTitle: event.title
            })
        }
    }

    const handlePlaySpanish = () => {
        if (event && audioUrls) {
            playTrack({
                title: event.title,
                url: audioUrls.spanish,
                language: 'spanish',
                eventId: event.id,
                eventTitle: event.title
            })
        }
    }

    const isEnglishPlaying = audioUrls && currentTrack?.url === audioUrls.english && isPlaying
    const isSpanishPlaying = audioUrls && currentTrack?.url === audioUrls.spanish && isPlaying

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-display text-primary mb-4">Loading...</h1>
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-display text-destructive mb-4">Error</h1>
                <p className="text-muted-foreground mb-8">{error || 'Event not found'}</p>
                <Link to="/#events" className="text-accent hover:text-accent/80 flex items-center gap-2 transition-colors">
                    <ArrowLeft size={16} /> Back to Events
                </Link>
            </div>
        )
    }

    const isFree = !event.price || event.price.toLowerCase() === 'free'

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            <Link to="/#events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to all events
            </Link>

            <article className="glass-panel p-8 md:p-12 rounded-2xl border border-primary/20 relative overflow-hidden group">
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
                                <span>
                                    {event.date ? (
                                        !isNaN(new Date(event.date).getTime())
                                            ? format(new Date(event.date), 'MMMM d, yyyy')
                                            : event.date
                                    ) : 'TBA'}
                                </span>
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

                        {hasAudioOverview && (
                            <div className="mb-10 p-6 rounded-xl bg-card/40 border border-primary/20">
                                <div className="flex items-center gap-2 mb-4">
                                    <Headphones className="w-5 h-5 text-accent" />
                                    <h3 className="text-xl font-display text-gradient-purple">Event Audio Overview</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">In-depth look at everything you need to know about this event</p>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handlePlayEnglish}
                                        className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.65_0.24_310_/_0.7)] border border-primary/50"
                                    >
                                        <Globe weight="fill" className="w-5 h-5" />
                                        <span className="font-heading text-sm tracking-wide">{isEnglishPlaying ? 'Pause' : 'English'}</span>
                                        <SpeakerHigh weight="fill" className={`w-5 h-5 ${isEnglishPlaying ? 'animate-pulse' : ''}`} />
                                    </button>

                                    <button
                                        onClick={handlePlaySpanish}
                                        className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-br from-accent via-accent/90 to-accent/80 hover:from-accent/90 hover:via-accent hover:to-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.75_0.20_330_/_0.7)] border border-accent/50"
                                    >
                                        <Globe weight="fill" className="w-5 h-5" />
                                        <span className="font-heading text-sm tracking-wide">{isSpanishPlaying ? 'Pausar' : 'Español'}</span>
                                        <SpeakerHigh weight="fill" className={`w-5 h-5 ${isSpanishPlaying ? 'animate-pulse' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="prose prose-invert prose-lg max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ ...props }) => <h1 className="text-3xl font-display text-primary mt-8 mb-4" {...props} />,
                                    h2: ({ ...props }) => <h2 className="text-2xl font-display text-accent mt-8 mb-4 border-b border-border/50 pb-2" {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-xl font-heading text-foreground mt-6 mb-3" {...props} />,
                                    p: ({ ...props }) => <p className="text-lg leading-relaxed mb-6" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4" {...props} />,
                                    ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-2 mb-6 ml-4" {...props} />,
                                    li: ({ ...props }) => <li className="text-slate-300" {...props} />,
                                    strong: ({ ...props }) => <strong className="font-semibold text-white tracking-wide" {...props} />
                                }}
                            >
                                {event.description}
                            </ReactMarkdown>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
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
                </div>
            </article>
        </div>
    )
}
