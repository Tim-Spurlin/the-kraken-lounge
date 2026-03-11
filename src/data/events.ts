import Papa from 'papaparse'

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

// Ensure columns in the Google Sheet exactly match these headers:
// id, title, date, time, type, genres, bands, description, price

function parseFlexibleDate(dateStr: string): string {
    if (!dateStr) return '';
    // Remove ordinal indicators (st, nd, rd, th) from days
    let cleanStr = dateStr.replace(/\b(\d+)(st|nd|rd|th)\b/gi, '$1');
    let d = new Date(cleanStr);

    // Check for DD-MM-YYYY format
    if (isNaN(d.getTime())) {
        const parts = cleanStr.split(/[-/]/);
        if (parts.length === 3 && parts[2].length === 4) {
            d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }
    }
    return isNaN(d.getTime()) ? dateStr : d.toISOString();
}

export async function fetchEvents(sheetCsvUrl: string): Promise<Event[]> {
    try {
        const res = await fetch(sheetCsvUrl)
        if (!res.ok) {
            throw new Error(`Failed to fetch CSV: ${res.statusText}`)
        }
        const csvText = await res.text()

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    try {
                        // Transform the CSV data into our Event interface
                        const events: Event[] = results.data.map((row: any) => ({
                            id: row.id || String(Math.random()),
                            title: row.title || 'Untitled Event',
                            date: row.date ? parseFlexibleDate(row.date) : new Date().toISOString(),
                            time: row.time || 'TBA',
                            type: (['live', 'themed', 'recurring', 'special'].includes(row.type) ? row.type : 'special') as Event['type'],
                            // Convert comma-separated string columns into arrays
                            genres: (row.genres || row.genre) ? (row.genres || row.genre).split(',').map((g: string) => g.trim()).filter(Boolean) : [],
                            bands: row.bands ? row.bands.split(',').map((b: string) => b.trim()).filter(Boolean) : undefined,
                            description: row.description || '',
                            price: row.price || 'TBA'
                        }))
                        resolve(events)
                    } catch (err) {
                        console.error("Error transforming CSV data", err)
                        reject(err)
                    }
                },
                error: (error: any) => {
                    console.error("Error parsing CSV data", error)
                    reject(error)
                }
            })
        })
    } catch (error) {
        console.error("Error fetching events", error)
        throw error
    }
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
