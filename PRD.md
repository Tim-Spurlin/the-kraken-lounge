# Planning Guide

The Kraken Lounge website serves as the digital embodiment of Brownsville's premier alternative music venue—a gothic sanctuary where heavy metal, punk, industrial, and underground techno converge in the heart of the Rio Grande Valley.

**Experience Qualities**:
1. **Visceral** - The website must immediately immerse visitors in the venue's dark, atmospheric aesthetic through bold gothic design with deep purples, blacks, and sophisticated gradients that mirror the mystical, underground physical space
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

The design must evoke the visceral sensation of descending into a mystical underground sanctum—a space where darkness becomes comfort, where deep purples and blacks create an ethereal, sophisticated atmosphere, where aggressive music meets artistic refinement, and where the rawness of a dive bar coexists with intentional gothic elegance. Visitors should feel the intensity of purple-lit shadows, the mystical energy of the underground scene, and the warmth of radical inclusivity. The aesthetic moves beyond Halloween tropes into a truly immersive, sophisticated gothic experience with gradient overlays, aurora-like effects, and luminous accents.

## Color Selection

The palette draws from gothic cathedrals, underground clubs, deep twilight skies, and mystical purple nebulae—creating a sophisticated, immersive atmosphere that moves beyond the Halloween aesthetic into a truly gothic, ethereal experience.

- **Primary Color**: Deep Mystic Purple `oklch(0.45 0.20 295)` - The foundation of the gothic identity, representing mystery, royalty, and the underground alternative scene. Used for primary surfaces and key interactive elements.
- **Secondary Colors**: 
  - Rich Obsidian Black `oklch(0.08 0.02 280)` - The deepest background representing the void, the underground, and infinite depth
  - Midnight Slate `oklch(0.14 0.03 285)` - Elevated surfaces like cards and sections, maintaining depth while providing subtle distinction
  - Dark Plum Accent `oklch(0.25 0.10 310)` - Secondary interactive elements and hover states, adding gothic warmth
- **Accent Color**: Luminous Violet `oklch(0.65 0.24 310)` - Brilliant highlight for CTAs, glowing effects, and attention-grabbing elements like "LIVE TONIGHT" - evokes mystical energy and electric intensity
- **Foreground/Background Pairings**: 
  - Rich Obsidian background `oklch(0.08 0.02 280)`: Pale Mist text `oklch(0.96 0.01 280)` - Ratio 17.8:1 ✓
  - Deep Mystic Purple `oklch(0.45 0.20 295)`: White text `oklch(0.98 0 0)` - Ratio 8.2:1 ✓
  - Luminous Violet `oklch(0.65 0.24 310)`: White text `oklch(0.98 0 0)` - Ratio 5.1:1 ✓

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

Animations should feel like descending into a gothic cathedral or underground club—smooth, mystical, occasionally ethereal. Subtle parallax on scroll creates dimensional depth. Event cards pulse gently with purple energy when hovering, like a heartbeat of the underground scene. Section reveals fade up from darkness with subtle shimmer effects. Navigation transitions slide with graceful momentum. Purple and violet accent glows pulse subtly on hero elements creating an atmospheric, almost supernatural ambiance. Aurora-like gradient shifts create living, breathing backgrounds. All animations respect prefers-reduced-motion for accessibility.

## Component Selection

- **Components**: 
  - **Card** (shadcn) - Event listings, artist features, food menu items; customized with dark gothic borders and red accent hovers
  - **Tabs** (shadcn) - Organize event types (Live Shows, Themed Nights, Special Events)
  - **Dialog** (shadcn) - Full event details and artist bio popups with gothic styling
  - **Separator** (shadcn) - Sharp dividers with red accent gradient
  - **Button** (shadcn) - Primary actions heavily customized with blood-red fills and glowing hover states
  - **Badge** (shadcn) - Genre tags (Metal, Punk, Techno, Goth) with color-coded system
- **Customizations**: 
  - Custom hero section with animated gothic typography
  - Custom event calendar grid with visual hierarchy
  - Custom image gallery with lightbox functionality
  - Parallax scroll effects on hero and section backgrounds
- **States**: 
  - Buttons: Subtle red glow on hover, pressed state darkens, focus ring in crimson
  - Cards: Lift slightly on hover with red border glow, scale 1.02
  - Links: Underline appears on hover with red accent
  - Active nav items: Red bottom border with glow effect
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
