# Events Integration Status

## 🔍 Why Your Events Appear Empty

Your events section is currently displaying **default/fallback events** because the Google Sheets integration has not been configured yet with your actual published sheet URL.

## ✅ What's Already Done

1. **Google Sheets Integration**: Fully implemented and ready to use
2. **CSV Parser (PapaParse)**: Installed and configured  
3. **Column Headers**: Match your exact specification
4. **Event Types**: All four types supported (live, themed, recurring, special)
5. **Date Filtering**: Automatically filters out past events
6. **Fallback System**: Shows default events if Google Sheets can't be loaded

## 🎯 What You Need To Do

### Quick Summary
**Replace one line of code** in `/src/components/sections/Events.tsx` with your Google Sheets published CSV URL.

### Detailed Instructions

👉 **See the complete guide here: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**

### TL;DR Steps:

1. **Format your Google Sheet** with these exact headers:
   ```
   id | title | date | time | type | genres | bands | description | price
   ```

2. **Publish your sheet as CSV**:
   - File → Share → Publish to web
   - Select your sheet, change to "CSV" format
   - Click Publish and copy the URL

3. **Update the code**:
   - Open `/src/components/sections/Events.tsx`
   - Line 10: Replace `'YOUR_PUBLISHED_GOOGLE_SHEET_CSV_URL_HERE'` with your actual URL
   - Save the file

4. **Test**: Check browser console (F12) for success/error messages

## 📋 Required Column Format

| Column | Type | Example | Notes |
|--------|------|---------|-------|
| **id** | string | "1", "2", "3" | Unique identifier |
| **title** | string | "Brujeria - The Deathgrind Tour" | Event name |
| **date** | YYYY-MM-DD | "2026-11-14" | ISO date format required |
| **time** | string | "Doors 7:00 PM" | Display format |
| **type** | enum | "live" | Must be: `live`, `themed`, `recurring`, or `special` |
| **genres** | string | "Metal, Extreme" | Comma-separated |
| **bands** | string | "Brujeria, Support Act" | Comma-separated, optional |
| **description** | string | Full event description | Can be long |
| **price** | string | "Free", "$10", "TBA" | Display format |

## 🔄 How It Works

```
Your Google Sheet (published as CSV)
          ↓
    fetch() downloads CSV
          ↓
    PapaParse converts to JSON
          ↓
    Mapped to Event interface
          ↓
    Filtered (removes past dates)
          ↓
    Displayed in UI
```

## 🛡️ Fallback Protection

If your Google Sheet can't be loaded (network error, wrong URL, etc.), the app will automatically show these default events so your site never appears broken:

- Release the Kraken (March 21, 2026)
- Constellation, Dark Read & Dead Cool (April 16, 2026)
- Frenchy and the Punk Acoustic (April 23, 2026)
- Das Ich with Dark Constellation (May 14, 2026)
- Brujeria - The Deathgrind Tour (November 14, 2026)
- Wednesday Karaoke Night (recurring)
- First Friday Goth Night (monthly)
- Techno Sunday Sessions (recurring)

## 🐛 Troubleshooting

### "Events still show defaults after adding URL"
- Open browser console (F12 → Console)
- Look for error messages
- Verify your CSV URL works (open it directly in browser - you should see raw CSV)

### "Some events are missing"
- Check that dates are in the future (past events are auto-filtered)
- Verify date format is YYYY-MM-DD
- Ensure `type` field is one of the 4 valid values

### "Genres or bands not showing"
- Use comma separation: "Metal, Punk" (not "Metal Punk")
- Trim extra spaces
- Check for empty cells

## 📞 Need Help?

1. Check the detailed guide: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
2. Open browser console for error messages
3. Verify your sheet format matches exactly
4. Test your CSV URL in a browser

## 🎉 Once Configured

After you add your Google Sheets URL and save the file:
- Events will load automatically from your sheet
- Changes you make in Google Sheets will appear on your site immediately (after refresh)
- You can manage all events through Google Sheets (no code changes needed)
- Past events will be hidden automatically
