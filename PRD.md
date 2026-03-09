# Planning Guide

The Kraken Lounge website serves as the digital embodiment of Brownsville's premier alternative music venue—a gothic sanctuary where heavy metal, punk, industrial, and underground techno converge in the heart of the Rio Grande Valley.

**Experience Qualities**:
1. **Visceral** - The website must immediately immerse visitors in the venue's dark, atmospheric aesthetic through bold gothic design with deep blacks, charcoals, and blood-red accents that mirror the raw, underground physical space
2. **Rebellious** - Content and design should celebrate the venue's counter-cultural mission as a refuge from mainstream music, embracing raw authenticity over commercial polish
3. **Welcoming** - Despite the dark aesthetic, the interface must convey the warmth and inclusivity that makes The Kraken Lounge a safe community hub for alternative subcultures

**Complexity Level**: Light Application (multiple features with basic state)
This is a content showcase with interactive elements like event calendars, artist galleries, and navigation between multiple thematic sections—not requiring complex state management but more than a simple landing page.

## Essential Features

### Hero Section with Atmospheric Introduction
- **Functionality**: Immersive full-screen welcome featuring venue name, tagline, and atmospheric visuals
- **Purpose**: Immediately establish the gothic aesthetic and alternative identity
- **Trigger**: Page load
- **Progression**: Visitor lands on page → Encounters bold gothic typography and dark visuals → Understands venue's identity instantly → Scrolls to explore further
- **Success criteria**: First-time visitors can articulate the venue's alternative/gothic identity within 5 seconds

### Event Calendar & Live Music Showcase
- **Functionality**: Display upcoming shows, themed nights (Techno Sundays, Karaoke Wednesdays), and special events
- **Purpose**: Serve as primary information source for patrons planning visits
- **Trigger**: Navigation to Events section or homepage scroll
- **Progression**: User seeks show information → Finds categorized event listings → Views date, time, bands, genre → Can access ticket/RSVP links
- **Success criteria**: Users can find next upcoming show in under 10 seconds

### Visual Arts Gallery
- **Functionality**: Showcase rotating collection of local artwork displayed in the physical venue
- **Purpose**: Honor the venue's commitment to visual artists and convey the artistic atmosphere
- **Trigger**: Navigation to Art/Gallery section
- **Progression**: User explores gallery → Views artwork images → Reads artist credits → Appreciates venue's cultural impact
- **Success criteria**: Gallery effectively communicates venue's role as an art space, not just a bar

### About/History Section
- **Functionality**: Tell the venue's story including pandemic resilience, owner Daniel Alvarado's vision, and community integration
- **Purpose**: Build emotional connection and establish legitimacy as cultural institution
- **Trigger**: Navigation to About section
- **Progression**: User seeks venue background → Reads compelling narrative → Learns about 2020 survival → Understands community importance → Develops loyalty
- **Success criteria**: Story conveys resilience and community values authentically

### Location & Contact Information
- **Functionality**: Display address (1123 E Adams St, Suite C), hours (5PM-2AM daily), phone (956-372-1550), and embedded map
- **Purpose**: Provide essential logistics for first-time visitors
- **Trigger**: Navigation to Contact/Visit section
- **Progression**: User needs directions → Finds clear address and hours → Can call or map location → Successfully visits venue
- **Success criteria**: Zero confusion about location or operating hours

### Food & Drinks Menu Highlight
- **Functionality**: Showcase the renowned Kraken Pizza and craft beverages
- **Purpose**: Market venue as dining destination, not just late-night music spot
- **Trigger**: Navigation to Menu section
- **Progression**: User discovers food offerings → Sees pizza reputation → Notes affordable pricing → Plans dinner visit before show
- **Success criteria**: Pizza quality and affordability are immediately apparent

## Edge Case Handling

- **Mobile/Touch Interactions** - All gothic visual elements must maintain readability on small screens; touch targets appropriately sized
- **No Upcoming Events** - Calendar gracefully displays "Check back soon" messaging with social media links when event pipeline is empty
- **Slow Image Loading** - Dark skeleton loaders maintain gothic aesthetic during image fetch
- **Empty Art Gallery** - Placeholder content explains rotating nature of exhibitions
- **Browser Compatibility** - Fallback fonts and colors ensure gothic aesthetic persists even without modern CSS support

## Design Direction

The design must evoke the visceral sensation of descending into a dark underground sanctum—a space where darkness becomes comfort, where deep blacks and blood reds create an intense, raw atmosphere, where aggressive music meets artistic grit, and where the rawness of a dive bar coexists with intentional gothic darkness. Visitors should feel the intensity of shadow-lit alcoves, the raw energy of the underground scene, and the warmth of radical inclusivity. The aesthetic moves beyond Halloween tropes into a truly immersive, industrial gothic experience with subtle gradient overlays and crimson accents.

## Color Selection

The palette draws from industrial spaces, underground clubs, deep shadows, and blood-red lighting—creating a raw, intense atmosphere that captures the dive bar's authentic gothic edge.

- **Primary Color**: Deep Charcoal `oklch(0.30 0.08 0)` - The foundation of the gothic identity, representing raw industrial strength and underground authenticity. Used for primary surfaces and key interactive elements.
- **Secondary Colors**: 
  - Pitch Black `oklch(0.06 0.01 0)` - The deepest background representing the void, the underground, and absolute darkness
  - Dark Steel `oklch(0.12 0.01 0)` - Elevated surfaces like cards and sections, maintaining depth while providing subtle distinction
  - Smoky Charcoal `oklch(0.20 0.02 0)` - Secondary interactive elements and hover states, adding gothic depth
- **Accent Color**: Blood Red `oklch(0.50 0.20 25)` - Striking highlight for CTAs, glowing effects, and attention-grabbing elements like "LIVE TONIGHT" - evokes raw energy and electric intensity
- **Foreground/Background Pairings**: 
  - Pitch Black background `oklch(0.06 0.01 0)`: Pale text `oklch(0.95 0.01 0)` - Ratio 18.5:1 ✓
  - Deep Charcoal `oklch(0.30 0.08 0)`: White text `oklch(0.98 0 0)` - Ratio 9.1:1 ✓
  - Blood Red `oklch(0.50 0.20 25)`: White text `oklch(0.98 0 0)` - Ratio 6.8:1 ✓

## Font Selection

Typography must balance aggressive gothic edge with exceptional readability, evoking underground concert posters while remaining accessible for long-form reading.

- **Typographic Hierarchy**:
  - **Display/Hero (Venue Name)**: Creepster/56px/tight letter spacing/-1px - Bold, gothic, theatrical
  - **H1 (Section Headers)**: Bebas Neue Bold/42px/wide letter spacing/2px - Strong, commanding, concert-poster aesthetic
  - **H2 (Event Titles)**: Bebas Neue/32px/normal spacing - Clear hierarchy maintenance
  - **H3 (Band Names, Subsections)**: Inter Bold/24px/tight - Modern contrast, excellent readability
  - **Body Text**: Space Grotesk Regular/16px/1.7 line-height - Technical sophistication with warmth
  - **Small Text (Details, Hours)**: Space Grotesk/14px/1.6 line-height - Maintains readability at small sizes

## Animations

Animations should feel like descending into an industrial underground club—smooth, intense, raw. Subtle parallax on scroll creates dimensional depth. Event cards pulse gently with blood-red energy when hovering, like a heartbeat of the underground scene. Section reveals fade up from darkness with subtle shimmer effects. Navigation transitions slide with graceful momentum. Blood-red accent glows pulse subtly on hero elements creating an atmospheric, intense ambiance. Dark gradient shifts create living, breathing backgrounds. All animations respect prefers-reduced-motion for accessibility.

## Component Selection

- **Components**: 
  - **Card** (shadcn) - Event listings, artist features, food menu items; customized with dark gothic borders and blood-red accent hovers
  - **Tabs** (shadcn) - Organize event types (Live Shows, Themed Nights, Special Events)
  - **Dialog** (shadcn) - Full event details and artist bio popups with gothic styling
  - **Separator** (shadcn) - Sharp dividers with blood-red accent gradient
  - **Button** (shadcn) - Primary actions heavily customized with blood-red fills and glowing hover states
  - **Badge** (shadcn) - Genre tags (Metal, Punk, Techno, Goth) with color-coded system
- **Customizations**: 
  - Custom hero section with animated gothic typography
  - Custom event calendar grid with visual hierarchy
  - Custom image gallery with lightbox functionality
  - Parallax scroll effects on hero and section backgrounds
- **States**: 
  - Buttons: Blood-red glow on hover, pressed state darkens, focus ring in crimson
  - Cards: Lift slightly on hover with blood-red border glow, scale 1.02
  - Links: Underline appears on hover with blood-red accent
  - Active nav items: Blood-red bottom border with glow effect
- **Icon Selection**: 
  - Phosphor Icons Bold weight for aggressive aesthetic
  - MusicNote for events, Palette for art, MapPin for location, Lightning for energy
  - Skull or Fire icons for special themed nights
- **Spacing**: 
  - Sections: py-20 for generous breathing room
  - Cards: p-6 interior, gap-6 between cards
  - Hero: py-32 for dramatic presence
  - Mobile: Reduced to py-12 sections, p-4 cards
- **Mobile**: 
  - Hero text scales down but maintains impact
  - Event grid: 1 column on mobile, 2 on tablet, 3 on desktop
  - Navigation collapses to hamburger menu with slide-in drawer
  - Gallery: Single column with full-width images on mobile
  - All CTAs remain thumb-sized (min 44px) with increased spacing
