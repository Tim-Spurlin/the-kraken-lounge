# Google Sheets Events Integration Setup Guide

## Overview
Your events section is currently showing default/fallback events because the Google Sheets integration needs to be configured with your published sheet URL.

## Current Status
✅ Google Sheets integration code is ready
✅ CSV parsing (PapaParse) is installed and configured
✅ Headers match your specification: `id, title, date, time, type, genres, bands, description, price`
❌ **Missing**: Your actual Google Sheets CSV URL

## Step-by-Step Setup Instructions

### Step 1: Prepare Your Google Sheet
Make sure your Google Sheet has these exact column headers (in this order):
```
id | title | date | time | type | genres | bands | description | price
```

**Header Definitions:**
- **id**: Unique identifier (e.g., "1", "2", "3")
- **title**: Event name (e.g., "Brujeria - The Deathgrind Tour")
- **date**: Format as YYYY-MM-DD (e.g., "2026-11-14")
- **time**: Event time (e.g., "Doors 7:00 PM" or "9:30 PM")
- **type**: Must be one of: `live`, `themed`, `recurring`, or `special`
- **genres**: Comma-separated genres (e.g., "Metal, Extreme" or "Techno, Electronic")
- **bands**: Comma-separated band names (e.g., "Brujeria, Support Act") - optional, leave empty for non-band events
- **description**: Full event description
- **price**: Price info (e.g., "Free", "$10", "TBA", or "$10 pre-sale / $15 door")

### Step 2: Example Row Format
```
1 | Brujeria - The Deathgrind Tour | 2026-11-14 | Doors 7:00 PM | live | Metal, Extreme | Brujeria | Massive outdoor concert featuring internationally recognized deathgrind/metal band. | TBA
```

### Step 3: Publish Your Google Sheet as CSV

1. Open your Google Sheet
2. Click **File** → **Share** → **Publish to web**
3. In the dialog:
   - Under "Link" tab, select the specific sheet/tab with your events
   - Change the dropdown from "Web page" to **"Comma-separated values (.csv)"**
4. Click **Publish**
5. Copy the generated URL (it will look like this):
   ```
   https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
   ```

### Step 4: Add URL to the Code

Open the file: `/workspaces/spark-template/src/components/sections/Events.tsx`

Find this line (around line 11):
```typescript
const GOOGLE_SHEET_CSV_URL = 'YOUR_PUBLISHED_GOOGLE_SHEET_CSV_URL_HERE'
```

Replace it with your actual published CSV URL:
```typescript
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_ACTUAL_SHEET_ID/pub?output=csv'
```

### Step 5: Test the Integration

After adding your URL:
1. Save the file
2. The app will automatically reload
3. Check the browser console (F12 → Console tab) for messages:
   - ✅ "Fetching events from Google Sheets..."
   - ✅ "Fetched events: [array of events]"
   - ❌ If you see errors, check your sheet format and URL

## Troubleshooting

### Events are still empty after setup
1. **Check the browser console** for error messages
2. **Verify your CSV URL** - try opening it directly in a browser. You should see raw CSV data.
3. **Check column headers** - they must match exactly (case-sensitive)
4. **Date format** - must be YYYY-MM-DD
5. **Type values** - must be exactly: `live`, `themed`, `recurring`, or `special`

### Some events are missing
- Check that the date is in the future (past events are filtered out)
- Verify there are no empty required fields
- Make sure `type` field contains valid values

### Genres or bands not appearing
- Use commas to separate multiple values: "Metal, Punk" not "Metal Punk"
- Remove extra spaces: "Metal, Punk" not "Metal,  Punk  "

## Data Flow
```
Google Sheet → Publish as CSV → fetch() → PapaParse → Event objects → Display
```

## Fallback Behavior
If the Google Sheet can't be loaded (network error, invalid URL, etc.), the app will automatically show the default events defined in `/src/data/events.ts`. This ensures your site never shows empty events.

## Support
If you continue having issues:
1. Share your Google Sheets CSV URL
2. Share any console error messages
3. Confirm your column headers match exactly
