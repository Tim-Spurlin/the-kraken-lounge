export interface Event {
    id: string
    title: string
    date: string
    time: string
    type: 'live' | 'themed' | 'recurring' | 'special'
    genres: string[]
    bands?: string[]
    description: string
    price?: string
}

export const defaultEvents: Event[] = [
    {
        id: '1',
        title: 'Release the Kraken',
        date: '2026-03-21',
        time: 'Doors 8:00 PM',
        type: 'special',
        genres: ['Techno', 'Electronic'],
        description: 'An electronic event dedicated to Hard Techno and Warehouse Bass. Underground electronic music at its finest.',
        price: 'TBA'
    },
    {
        id: '2',
        title: 'Constellation, Dark Read & Dead Cool',
        date: '2026-04-16',
        time: 'Doors 7:00 PM',
        type: 'live',
        genres: ['Goth', 'Industrial'],
        bands: ['Constellation', 'Dark Read', 'Dead Cool'],
        description: 'A highly anticipated 2026 tour stop featuring some of the best in the dark alternative scene.',
        price: 'TBA'
    },
    {
        id: '3',
        title: 'Frenchy and the Punk (Acoustic) with Ego Likeness',
        date: '2026-04-23',
        time: 'Doors 7:00 PM',
        type: 'live',
        genres: ['Punk', 'Goth'],
        bands: ['Frenchy and the Punk', 'Ego Likeness'],
        description: 'An intimate acoustic set featuring Frenchy and the Punk performing alongside Ego Likeness.',
        price: 'TBA'
    },
    {
        id: '4',
        title: 'Das Ich with Dark Constellation',
        date: '2026-05-14',
        time: 'Doors 7:00 PM • Show 9:00 PM',
        type: 'live',
        genres: ['Industrial', 'Goth'],
        bands: ['Das Ich', 'Dark Constellation'],
        description: 'A major showcase featuring legendary German industrial act Das Ich with Dark Constellation.',
        price: 'TBA'
    },
    {
        id: '5',
        title: 'Brujeria - The Deathgrind Tour',
        date: '2026-11-14',
        time: 'TBA',
        type: 'live',
        genres: ['Metal', 'Extreme'],
        bands: ['Brujeria'],
        description: 'Massive outdoor concert featuring internationally recognized deathgrind/metal band Brujeria. A monumental booking for the extreme music scene.',
        price: 'TBA'
    },
    {
        id: '6',
        title: 'Wednesday Karaoke Night',
        date: '2026-03-12',
        time: '8:00 PM',
        type: 'recurring',
        genres: [],
        description: 'Always a blast! Mid-week karaoke where the community takes the stage. Break down the barrier between performer and audience.',
        price: 'Free'
    },
    {
        id: '7',
        title: 'First Friday Goth Night',
        date: '2026-04-04',
        time: '11:00 PM',
        type: 'themed',
        genres: ['Goth', 'Industrial'],
        description: 'Monthly gathering for the local dark alternative community featuring live performance and DJ Vikingo.',
        price: 'No Cover'
    },
    {
        id: '8',
        title: 'Techno Sunday Sessions',
        date: '2026-03-16',
        time: '9:30 PM',
        type: 'recurring',
        genres: ['Techno', 'Electronic'],
        description: 'Less drama, more techno! Underground electronic music to close out your weekend.',
        price: 'Varies'
    }
]
