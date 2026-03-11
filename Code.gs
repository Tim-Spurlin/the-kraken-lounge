function doPost(e) {
  // CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    // Determine target spreadsheet
    // Using active spreadsheet since this is bound to the sheet directly
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let analyticsSheet = ss.getSheetByName("Analytics");
    const mainSheet = ss.getSheetByName("Sheet1");

    // If Analytics doesn't exist yet, we can't track
    if (!analyticsSheet) {
      return ContentService.createTextOutput(JSON.stringify({ 
        "status": "error", 
        "message": "Analytics sheet not found" 
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }

    // Parse incoming request context from the web app
    const data = JSON.parse(e.postData.contents);
    const eventId = String(data.eventId);
    let eventTitle = String(data.title || "Unknown Show");
    let eventDate = String(data.date || "Unknown Date");

    if (!eventId) {
         return ContentService.createTextOutput(JSON.stringify({ 
            "status": "error", 
            "message": "Missing eventId" 
          }))
          .setMimeType(ContentService.MimeType.JSON);
    }

    // Attempt to locate the exact event ID in the Analytics tab
    const dataRange = analyticsSheet.getDataRange();
    const values = dataRange.getValues();
    
    let rowIndex = -1;
    let currentClicks = 0;

    // Loop through rows skipping standard headers (row 1 and 2 usually)
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][0]) === eventId) {
        rowIndex = i;
        currentClicks = parseInt(values[i][3]) || 0;
        break;
      }
    }

    if (rowIndex === -1) {
      // Event not found in Analytics tab. We need to append it.
      // E.g. [Event ID, Title, Date, Total Clicks]
      analyticsSheet.appendRow([eventId, eventTitle, eventDate, 1]);
    } else {
      // Event exists, increment the 4th column (index 3) by +1
      // Note: Apps Script Ranges are 1-indexed, so rowIndex+1 is the row, and 4 is the column D
      const targetCell = analyticsSheet.getRange(rowIndex + 1, 4);
      targetCell.setValue(currentClicks + 1);
    }

    // Return success response to the website
    const result = {
      "status": "success",
      "message": "Click recorded successfully",
      "newClicks": (rowIndex === -1) ? 1 : currentClicks + 1
    };

    return ContentService.createTextOutput(JSON.stringify(result))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Critical error fallback to send back to the console
    const result = {
      "status": "error",
      "message": error.toString(),
      "stack": error.stack
    };
    return ContentService.createTextOutput(JSON.stringify(result))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

// Support pre-flight OPTIONS requests from CORS
function doOptions(e) {
  return ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
      });
}

function doGet(e) {
  // Simple health check endpoint for testing in the browser
  return ContentService.createTextOutput(JSON.stringify({ "status": "online", "message": "Kraken Analytics API is running normally." }))
                       .setMimeType(ContentService.MimeType.JSON);
}

// ==========================================
// KRAKEN AI - GEMINI DESCRIPTION GENERATOR (V2)
// ==========================================

const KRAKEN_SYSTEM_INSTRUCTION = `You are the official Kraken Lounge event copywriter for The Kraken Lounge in Brownsville, Texas.

Your job is to generate two levels of event copy for every current or future event:
1. a short, enticing teaser for the main events listing page
2. a richer, more informative full description for the dedicated event detail page

You are not a generic nightlife copywriter. You write specifically for The Kraken Lounge, and every description must feel aligned with the venue’s real identity, atmosphere, audience, and culture.

PRIMARY OBJECTIVE
For each event, create:
- a compact teaser that sparks curiosity and encourages clicks without giving away everything
- a detailed event-page description that clearly explains what the event is, what kind of experience it offers, and what visitors should expect

The teaser should make people want to click.
The full description should reward the click with real, useful detail.

FACTUAL DISCIPLINE
- Never invent facts.
- Never guess at artist names, set times, doors times, cover charges, age restrictions, ticket links, drink specials, genres, or event logistics.
- Only use details that are explicitly provided or already verified.
- If information is incomplete, write around what is known without fabricating the rest.
- If a detail is uncertain, treat it as unverified and do not state it as fact.
- Do not present historical programming as current unless it has been re-confirmed.
- Do not confuse guest-reported patterns with confirmed official schedules.
- Do not write fake hype or fake urgency.

DATE AWARENESS AND EVENT STATUS
You will always be given the current date in the input.
You must compare every event date against the provided current date.

Rules:
- If the event date is before the provided current date, mark the event as passed.
- If the event is passed, do not write promotional teaser copy for the main page.
- If the event is today, the teaser may use timing language such as "Tonight."
- If the event is upcoming, write the teaser and full description normally.
- Never pretend a past event is still upcoming.
- Never rely on your own internal sense of time. Always use the current date provided in the request.

KRAKEN LOUNGE VENUE CONTEXT
Write with awareness of the real identity of The Kraken Lounge:
- downtown Brownsville venue
- strong connection to art, music, nightlife, and local culture
- known for alternative, rock, goth, punk, metal, electronic, techno, karaoke, and live-event energy depending on the night
- distinctive atmosphere, not a generic mainstream bar
- social media and official local listings are more reliable than random third-party directories

KNOWN VENUE FACTS
Use these facts carefully and consistently:
- Venue name: The Kraken Lounge
- Location: Brownsville, Texas
- Canonical address: 1123 E Adams St, Suite C, Brownsville, TX
- Phone: (956) 372-1550
- Most publishable standard hours: 5:00 PM to 2:00 AM daily
- Hours may vary for special events
- Strongly supported recurring items include Karaoke Wednesdays and First Friday Goth Night
- Some older or community-reported programming exists, but should not be stated as current unless re-confirmed
- Owner name: Daniel Alvarado

VOICE AND STYLE
Your writing must be:
- polished
- vivid
- specific
- clean
- natural
- detailed
- website-ready
- tailored to the actual event
- aligned with The Kraken Lounge brand

Your writing must not be:
- generic
- repetitive
- robotic
- cheesy
- fake-hyped
- vague
- stuffed with buzzwords
- overlong for the teaser
- too brief for the full event page

TEASER WRITING RULES
Requirements:
- 18 to 38 words by default
- give just enough detail to intrigue
- hint at the mood, genre, artist, or theme when verified
- do not overexplain
- do not dump every logistical detail
- end naturally with a click-oriented cue

Allowed CTA styles (do not use the exact same CTA every time):
- Read more
- View event details
- See full lineup
- Explore the event
- Get the full details

FULL DESCRIPTION RULES
Requirements:
- 120 to 240 words by default
- explain what the event is
- describe the type of experience guests should expect
- mention verified lineup, theme, genre, and logistics when provided
- capture the atmosphere accurately
- give enough detail that a visitor understands why the event matters
- stay grounded in facts
- do not pad the copy with fluff

WHEN INFORMATION IS PARTIAL
If event information is incomplete:
- still write a strong teaser if the event is upcoming
- still write a polished full description based only on verified facts
- gracefully omit missing items instead of inventing them

MASTER VENUE KNOWLEDGE BASE
Below is the official 2026 Performer Biographies and Event Deep-Dive for The Kraken Lounge.
CRITICAL INSTRUCTION: You must ONLY write about the specific artist, bands, or event name provided in your "Input Data". Do NOT mention any other artists, showcases, or history from this Knowledge Base unless they are explicitly performing at the current event. Use this knowledge base purely as a dictionary to look up the facts for the specific band on the current row.

*** Knowledge Base Start ***
The Well-Known Recurring Programming
Karaoke Wednesdays: Wednesday Karaoke is a recurring staple, heavily praised for democratizing the performance stage and allowing the local alternative community to participate directly in the venue's musical culture.
First Friday Goth Night: First Friday Goth Night is a recurring, highly anticipated monthly event. Typically kicking off with live performances at 11:00 PM and anchored by sets from DJ Vikingo, this no-cover night is the premier gathering for the local dark alternative community.
Sunday Sessions (Techno Night): Sunday Sessions are a recurring staple aimed at closing out the weekend with electronic music, utilizing the motto "Less drama, more #techno on Sundays!". These sessions frequently feature:
- Luna León: An open-format DJ and visual artist who paints atmospheric tapestries with sounds ranging from dark industrial techno to breakcore, RnB, and hyperpop. Beyond the decks, she is a curator for university exhibitions and DIY maker spaces.
- DJ Chavo: A frequently highlighted local talent who commands the decks during late-night Sunday electronic sets.

Deep Dive: Upcoming 2026 Touring Artists & Bands
The Revies (January 10, 2026): Hailing from Monterrey, Mexico, The Revies are a high-energy rock band that has rapidly ascended the North American indie ranks. They achieved a massive milestone by winning 1st place among over 500 submissions in the "Nuevo Talento Nuevo Leon" contest. In November 2024, they were the only Mexican band invited to perform at the Machaca Rock Fest, playing to a crowd of 30,000 people and sharing the stage with titans like Limp Bizkit, Marilyn Manson, and Hoobastank. Their January appearance is part of a dedicated fundraising tour.
Acid Wizard Tx (February 7, 2026): Formed in late 2023 in Corpus Christi, Texas, Acid Wizard Tx is a heavy trio that blends doom, sludge, and heavy rock. The band consists of Riot (guitar), Fernando Moreno (bass/vocals), and Tommy Gunnz (drums). Heavily influenced by the godfathers of the genre like Black Sabbath, the band describes their sound as "doom/sludge from the perpetual summer hell that is South Texas". They recorded their debut album at Red Barn Studios in Mission, Texas, bringing a massive, sludgy wall of sound to the live stage.
Dark Constellation Tour: Dead Cool, Astari Nite & Pilgrims (April 16, 2026)
- Dead Cool: Operating out of Wilmington, North Carolina, Dead Cool is an intriguing darkwave and synth-pop duo formed in 2020 by husband and wife Johnny and Angela Yeagher. Johnny provides multifaceted vocals, synthesizers, and guitar, perfectly paired with Angela's driving bass rhythms and harmonizing vocals. Influenced by The Sisters of Mercy, Depeche Mode, and Suicide, the band is known for catchy dark anthems like "Are We Living, Are We Dead" and "Story of Another Life". They were recently rated among the Top 50 Goth Bands by Goths Worldwide.
- Astari Nite: Formed in Miami, Florida in 2008 by vocalist Mychael Ghost and drummer Illia Tulloch, Astari Nite is an alternative rock band that conjures a mesmerizing blend of 80s goth and new wave vibes. Their music explores themes of death, love, and the occult. The band is currently touring in support of their 2024 album, Resolution of Happiness, a brilliantly cinematic, slightly more upbeat record infused with the spirit of David Bowie and The Cure, featuring standout tracks like "Tongue Tied Galore" and "Double Feature Matinee".
- Pilgrims: A Boston-based Latine post-punk and coldwave band founded in 2018 by Chilean vocalist Juls Garat and Colombian guitarist Claudio Marcio. Joined by bassist Sean Woodbury, the band explores their experiences as immigrants through a dark, driving musical lens. Their newest album, Gemini, features the euphoric, resistance-themed post-punk single "Blissing Hour" and the bi-lingual track "Alien," which directly addresses their decade-long journey as immigrants in the US.
Frenchy and the Punk w/ Ego Likeness Acoustic (April 23, 2026)
- Frenchy and the Punk: Formed in New York City in 2005, this dynamic duo consists of French-born singer and percussionist Samantha Stephenson and American guitarist Scott Helland (formerly the bassist of the legendary 80s hardcore punk band Deep Wound, alongside J Mascis). Their sound is a wild, bohemian blend of dark alternative, post-punk, and cabaret folk. They recently released their eighth studio album, Midnight Garden, which bursts with dance grooves and soaring vocals.
- Ego Likeness: Created in Baltimore, Maryland in 1999, Ego Likeness is the brainchild of artist/musician Steven Archer and writer/vocalist Donna Lynch. Taking their name from Frank Herbert's classic sci-fi novel Dune, the band evolved from dark trip-hop into a powerhouse of industrial rock and darkwave. With six full-length albums under Metropolis Records, including Breedless and When the Wolves Return, they are renowned for Donna's passionately emotive vocals and Steven's heavy, atmospheric electronics.
Das Ich w/ Melody Zenith (May 14, 2026)
- Das Ich: One of the most legendary electronic acts to ever play the venue, Das Ich are the pioneers of "Neue Deutsche Todeskunst" (New German Death Art). Formed in Bavaria in 1989 by vocalist Stefan Ackermann and keyboardist/programmer Bruno Kramm, the band is famous for its classically inspired gothic-industrial style, extreme on-stage theatrics, and German-language lyrics. After a 19-year hiatus due to Ackermann's severe health struggles and Kramm's political activism, the band returned triumphantly with their 2025 album Fanal, a dark, orchestral, and industrial masterpiece warning against societal decay and the post-factual age.
- Melody Zenith: Serving as the opener, Melody Zenith is a darkwave enchantress who weaves poetry into dramatic electronic soundscapes. Her music utilizes glossy synths and pulsing basslines to channel gothic romanticism and cinematic glamour.
The Phoenix Within (August 2, 2026): Hailing from Queens, New York, The Phoenix Within is an independent alternative prog-rock band formed in 2012. Fronted by singer-songwriter Omar Feliciano, and backed by Nick Narlis (bass), John Narlis (guitar), and Steve Khan (drums), the band creates emotionally charged music focused on resilience and the underdog mentality. They are known for tackling heavy sociological issues, such as their intense metal track "Next," which directly addresses the harsh realities of mass shootings and gun violence in America. Feliciano is also notably a published author of guitar chord songbooks based on the band's catalog.
Rob Zombie & Marilyn Manson (November 14, 2026)
- Rob Zombie: The undisputed king of shock-rock and industrial metal, Zombie is touring in support of his highly anticipated new album, The Great Satan (releasing in early 2026), featuring blistering new singles like "(I'm a) Rock 'N' Roller" and "Punks And Demons".
- Marilyn Manson: The controversial and iconic industrial rock frontman joins Zombie as a co-headliner, bringing decades of gothic-metal history to the border.
*** Knowledge Base End ***

OUTPUT FORMAT
Return structured output in this exact JSON shape:

{
  "event_status": "upcoming | today | passed",
  "title": "",
  "slug": "",
  "main_page_teaser": "",
  "main_page_cta": "",
  "detail_page_description": "",
  "short_meta_description": "",
  "internal_notes": {
    "verified_facts": [],
    "missing_or_unverified": [],
    "risk_flags": []
  }
}

FIELD RULES
- event_status must reflect comparison against the provided current date
- title should be clean and publishable
- slug should be lowercase and hyphenated
- main_page_teaser should be concise and enticing
- main_page_cta should be short and clickable
- detail_page_description should be comprehensive and polished
- short_meta_description should be SEO-friendly and under 160 characters`;

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Kraken AI')
      .addItem('🤖 Add Event (AI Dupe Check)', 'checkAndAddEvent')
      .addSeparator()
      .addItem('📝 Generate Missing Descriptions', 'generateDescriptions')
      .addItem('✨ Enhance Existing Descriptions', 'enhanceDescriptions')
      .addToUi();
}

function getOrAddTeaserColumn(sheet, headers) {
  let teaserIdx = headers.indexOf("teaser");
  if (teaserIdx === -1) {
    // Column doesn't exist, let's add it securely to the end
    teaserIdx = headers.length;
    sheet.getRange(1, teaserIdx + 1).setValue("teaser");
    headers.push("teaser");
  }
  return teaserIdx;
}

const DUPE_CHECK_INSTRUCTION = `You are a strict data entry gatekeeper for The Kraken Lounge.
Your job is to receive a raw text input of a new event and compare it against a list of already scheduled events.
You must absolutely determine if the new event is a duplicate of an existing one. Use semantic reasoning (e.g., if bands, dates, and genres match, it is the same event even if the title differs slightly).

OUTPUT FORMAT
Return strict JSON:
{
  "is_duplicate": boolean,
  "reason": "String explaining why it is or isn't a duplicate. If duplicate, name the existing event.",
  "parsed_event": {
    "title": "String",
    "date": "YYYY-MM-DD",
    "time": "String (e.g., 8:00 PM)",
    "type": "live | themed | recurring | special",
    "genres": "Comma separated string",
    "bands": "Comma separated string",
    "description": "Any remaining description/notes",
    "price": "String"
  }
}

If 'is_duplicate' is true, the 'parsed_event' fields can be empty.
If 'is_duplicate' is false, you MUST extract the details from the raw input into the 'parsed_event' object as accurately as possible.`;

function checkAndAddEvent() {
  const ui = SpreadsheetApp.getUi();
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  
  if (!apiKey) {
    ui.alert("Error: GEMINI_API_KEY is missing from Script Properties.");
    return;
  }

  const response = ui.prompt(
    'Kraken AI: Add New Event',
    'Paste the raw text details of the new event (bands, date, time, description, etc):',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return; // User canceled
  }

  const rawInput = response.getResponseText().trim();
  if (!rawInput) return;

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  if (!sheet) {
    ui.alert("Error: 'Sheet1' not found.");
    return;
  }

  // Gather existing events for comparison
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  const titleIdx = headers.indexOf("title");
  const dateIdx = headers.indexOf("date");
  const bandsIdx = headers.indexOf("bands");

  if (titleIdx === -1 || dateIdx === -1) {
    ui.alert("Error: Sheet must have 'title' and 'date' columns.");
    return;
  }

  let existingEventsList = "";
  for (let i = 1; i < values.length; i++) {
    const title = values[i][titleIdx];
    const date = values[i][dateIdx];
    const bands = bandsIdx !== -1 ? values[i][bandsIdx] : "";
    if (title || date) {
      existingEventsList += `- ${title} | Date: ${date} | Bands: ${bands}\n`;
    }
  }

  if (existingEventsList === "") existingEventsList = "No existing events currently scheduled.";

  const promptText = `EXISTING SCHEDULED EVENTS:
${existingEventsList}

RAW INPUT FOR NEW EVENT:
"${rawInput}"

Determine if this new event is a duplicate of any existing scheduled events. Provide the parsed data if it is safe to add.`;

  try {
    // We make a custom POST call here using the new instruction
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      "system_instruction": { "parts": [{"text": DUPE_CHECK_INSTRUCTION}] },
      "contents": [{ "role": "user", "parts": [{"text": promptText}] }],
      "generationConfig": { "temperature": 0.2, "responseMimeType": "application/json" } // Low temp for strict parsing
    };

    const options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };

    const apiResponse = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(apiResponse.getContentText());

    if (json.error) throw new Error(json.error.message);

    const responseText = json.candidates[0].content.parts[0].text.trim();
    const result = JSON.parse(responseText);

    if (result.is_duplicate) {
      ui.alert('⚠️ Duplicate Detected', result.reason, ui.ButtonSet.OK);
    } else {
      // It's a new event, append it!
      const p = result.parsed_event;
      
      // Determine columns to map parsed data
      const newRow = new Array(headers.length).fill("");
      
      const mapField = (fieldName, parsedValue) => {
        const idx = headers.indexOf(fieldName);
        if (idx !== -1 && parsedValue) newRow[idx] = parsedValue;
      };

      mapField("title", p.title);
      mapField("date", p.date);
      mapField("time", p.time);
      mapField("type", p.type);
      mapField("genres", p.genres);
      mapField("bands", p.bands);
      mapField("description", p.description);
      mapField("price", p.price);

      sheet.appendRow(newRow);
      ui.alert('✅ Event Added', `Successfully parsed and added: ${p.title}\n\nDate: ${p.date}`, ui.ButtonSet.OK);
    }

  } catch (e) {
    ui.alert('Error checking duplicate: ' + e.message);
  }
}

function processDescriptions(mode) {
  // PRE-FLIGHT AUTH CHECK
  // Google will silently block the AI if this script isn't authorized for external requests.
  // By putting this naked fetch outside of a try/catch block, we force the script to legitimately 
  // crash with a security exception, which FINALLY triggers the "Authorization Required" popup for the user!
  UrlFetchApp.fetch('https://www.google.com', {muteHttpExceptions: true});

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Error: 'Sheet1' not found. Please ensure your events are on a tab named Sheet1.");
    return;
  }

  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) {
    SpreadsheetApp.getUi().alert("Error: GEMINI_API_KEY is missing from Script Properties. Please add your Google AI Studio API key.");
    return;
  }

  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];

  const titleIdx = headers.indexOf("title");
  const dateIdx = headers.indexOf("date");
  const typeIdx = headers.indexOf("type");
  const genresIdx = headers.indexOf("genres");
  const bandsIdx = headers.indexOf("bands");
  const descIdx = headers.indexOf("description");

  if (descIdx === -1 || titleIdx === -1) {
    SpreadsheetApp.getUi().alert("Error: Make sure your headers include at least 'title' and 'description'.");
    return;
  }

  // Ensure 'teaser' column exists
  const teaserIdx = getOrAddTeaserColumn(sheet, headers);
  const currentDate = new Date().toISOString().split('T')[0];
  let updatedCount = 0;
  let errorMessages = [];

  // Check if the user has specifically selected a single row to force an update on it
  const activeRange = sheet.getActiveRange();
  const activeRow = activeRange ? activeRange.getRow() : -1;
  const isSingleRowSelected = activeRange ? activeRange.getNumRows() === 1 : false;

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const description = String(row[descIdx] || "").trim();
    const existingTeaser = String(row[teaserIdx] || "").trim();
    const eventTitle = String(row[titleIdx] || "").trim();

    if (!eventTitle) continue;

    let shouldProcess = false;
    let inputNotes = "";

    // Force process if the user explicitly clicked on this exact row
    const isTargetRow = isSingleRowSelected && (i + 1) === activeRow;

    if (isTargetRow) {
      shouldProcess = true;
      if (description === "") {
        inputNotes = "Empty description. Generate from scratch based on title/genre/bands.";
      } else {
        inputNotes = `Manager's Basic Notes:\n"${description}"`;
      }
    } else if (mode === 'GENERATE' && description === "") {
      shouldProcess = true;
      inputNotes = "Empty description. Generate from scratch based on title/genre/bands.";
    } else if (mode === 'ENHANCE' && description !== "" && description.length < 350) {
      shouldProcess = true;
      inputNotes = `Manager's Basic Notes:\n"${description}"`;
    } else if (mode === 'ENHANCE' && existingTeaser === "" && description.length >= 350) {
      // Edge case: they have a long description but no teaser yet
      shouldProcess = true;
      inputNotes = `Manager's Existing Description that needs a teaser auto-generated and formatting clean up:\n"${description}"`;
    }

    // Skip all other rows if the user specifically targeted one
    if (isSingleRowSelected && !isTargetRow) {
      shouldProcess = false;
    }

    if (shouldProcess) {
      const eventDate = row[dateIdx] || "TBA";
      const eventType = row[typeIdx] || "Special Event";
      const eventGenres = row[genresIdx] || "";
      const eventBands = row[bandsIdx] || "";

      const prompt = `Input Data for Event:
      Current Date Today: ${currentDate}
      Event Name: ${eventTitle}
      Event Date: ${eventDate}
      Event Type: ${eventType}
      Genres: ${eventGenres}
      Performing Bands: ${eventBands}
      
      Instructions:
      ${inputNotes}`;

      try {
        const jsonResponse = callGeminiFlash(prompt, apiKey);
        
        if (jsonResponse) {
          const newTeaser = jsonResponse.main_page_teaser || "";
          const newDescription = jsonResponse.detail_page_description || "";
          
          if (newDescription) sheet.getRange(i + 1, descIdx + 1).setValue(newDescription);
          if (newTeaser) sheet.getRange(i + 1, teaserIdx + 1).setValue(newTeaser);
          
          updatedCount++;
          Utilities.sleep(1500); 
        }
      } catch (e) {
        Logger.log("Error processing row " + (i + 1) + ": " + e.message);
        errorMessages.push(`Row ${i + 1}: ${e.message}`);
      }
    }
  }

  if (updatedCount === 0) {
    if (errorMessages.length > 0) {
      SpreadsheetApp.getUi().alert(`Errors occurred during processing:\n${errorMessages.join('\n')}`);
    } else {
      SpreadsheetApp.getUi().alert(`No events matched the criteria for ${mode.toLowerCase()} mode. Try adding some basic notes or new blank events!`);
    }
  } else {
    SpreadsheetApp.getUi().alert(`Success! Processed and injected ${updatedCount} event descriptions using Gemini 1.5 Flash.`);
  }
}

function generateDescriptions() {
  processDescriptions('GENERATE');
}

function enhanceDescriptions() {
  processDescriptions('ENHANCE');
}

function callGeminiFlash(promptText, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    "system_instruction": {
      "parts": [
        {"text": KRAKEN_SYSTEM_INSTRUCTION}
      ]
    },
    "contents": [
      {
        "role": "user",
        "parts": [
          {"text": promptText}
        ]
      }
    ],
    "generationConfig": {
      "temperature": 0.5,
      "responseMimeType": "application/json"
    }
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());

  if (json.error) {
    throw new Error(json.error.message);
  }

  let responseText = json.candidates[0].content.parts[0].text.trim();
  
  // Strip markdown code block wrapping if Gemini outputs it
  if (responseText.startsWith('```')) {
    responseText = responseText.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
  }
  
  return JSON.parse(responseText);
}

/**
 * Run this function ONCE from the Apps Script Editor (the dropdown next to the Run button).
 * Because the AI functions use dynamic URLs, Google's security scanner sometimes 
 * fails to pop up the "Allow" window. Running this simple, hardcoded function 
 * forces the "Authorization Required" popup to appear.
 */
function testGooglePermissions() {
  UrlFetchApp.fetch('https://www.google.com');
  SpreadsheetApp.getUi().alert('Permissions granted successfully! You can now use the Kraken AI from the spreadsheet menu.');
}

