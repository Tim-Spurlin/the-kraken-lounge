import { google } from 'googleapis';
import * as fs from 'fs';

const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '1eE5laJ0PUWvCJUrHWoYtVOoYz3YowZpOJWfVghkzLd8';

const unwantedText = `**Introduction: Cultivating the Alternative Underground in the Rio Grande Valley**
The landscape of live music in South Texas is undergoing a profound evolution, transitioning from strictly localized entertainment to a robust, internationally recognized ecosystem for alternative, extreme, and electronic art forms. At the absolute epicenter of this subcultural renaissance is The Kraken Lounge. Located at 1123 E Adams Street in the heart of downtown Brownsville, Texas, this venue has methodically established itself as an indispensable sanctuary for counterculture and avant-garde performance in the Lower Rio Grande Valley. Operating seven days a week from 5:00 PM to 2:00 AM, the establishment transcends the traditional parameters of a standard nightclub, functioning instead as a highly specialized incubator for art, diverse music genres, and intersectional community convergence.

The 2026 programming schedule for The Kraken Lounge represents a highly curated, remarkably diverse curation of events. It bridges the critical gap between legendary international touring acts and hyper-local community building. By hosting pioneering industrial artists from Europe, underground extreme metal collectives from Mexico and Los Angeles, and the vanguard of modern synthwave and dark cabaret, the venue provides Brownsville regulars and travelers alike with an uncompromising, world-class cultural itinerary. Furthermore, the venue's willingness to host eclectic gatherings—ranging from local film festival workshops to specialized alternative lifestyle events—cements its reputation as a multifaceted cultural hub.

This comprehensive research report offers an exhaustive musicological and sociological analysis of the upcoming shows at The Kraken Lounge. It provides a deep dive into the historical origins, sonic architectures, and subcultural significance of each performing act and event series. The objective is to equip the venue's dedicated patrons with unparalleled insight into the artistic magnitude of the 2026 calendar, ensuring that the local community is fully integrated into the global narrative these artists represent.

**Architectural and Curatorial Context of The Kraken Lounge**
Before dissecting the specific performers, it is vital to understand the physical and philosophical space they will occupy. The Kraken Lounge is situated within a broader network of downtown Brownsville arts organizations, frequently collaborating with entities like BAM (Brownsville Artists and Musicians) and the Brownsville International Film Festival (BIFF) to host interactive workshops, printmaking sessions, and virtual reality exhibitions. This integration into the broader arts district means the audience attending these concerts is often highly literate in visual and performance art, demanding a higher caliber of musical output.

The physical architecture of the venue heavily influences its programming capabilities. While the interior provides an intimate, heavily atmospheric dive-bar aesthetic perfect for acoustic sets, synth-pop acts, and late-night electronic sessions, the venue also boasts a massive outdoor space. This outdoor staging area is critical for accommodating the decibel levels and crowd sizes associated with internationally recognized extreme metal and industrial tours. It is this duality—the ability to pivot from an intimate listening room to a massive, open-air sonic assault—that makes The Kraken Lounge a highly sought-after destination for niche booking agencies.`;

async function cleanSpreadsheet() {
    try {
        console.log("Fetching spreadsheet data...");
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A:Z', // Get all data
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        const headers = rows[0];
        const descIdx = headers.indexOf('description');
        const teaserIdx = headers.indexOf('teaser');

        if (descIdx === -1) {
            console.log("Could not find description column");
            return;
        }

        let updatePromises = [];

        console.log("Analyzing and cleaning rows...");
        for (let i = 1; i < rows.length; i++) {
            let row = rows[i];
            let description = row[descIdx] || "";
            let teaser = row[teaserIdx] || "";

            let needsUpdate = false;
            let newDescription = description;
            let newTeaser = teaser;

            // Strip the exact preamble block (handling potential newline variations)
            // We use a robust split mechanism to drop the entire preamble if it exists
            const cutoffPhrase = "niche booking agencies.";

            if (newDescription.includes("Cultivating the Alternative Underground") && newDescription.includes(cutoffPhrase)) {
                const splitParts = newDescription.split(cutoffPhrase);
                if (splitParts.length > 1) {
                    // Take everything after the preamble, trim leading/trailing whitespace and asterisks
                    newDescription = splitParts[1].replace(/^[\*\s]+/, '').trim();
                    needsUpdate = true;
                }
            }

            // Also clean teasers if they accidentally got prepended with the intro
            if (teaserIdx !== -1 && newTeaser.includes("Cultivating the Alternative Underground")) {
                newTeaser = ""; // Blank it out entirely so the AI can regenerate it fresh
                needsUpdate = true;
            }

            if (needsUpdate) {
                // Determine the A1 notation cell references (e.g., Description is in column H, teaser might be I)
                // We know desc is descIdx, and apps script/sheets are 1-indexed. Column A = 65 in ascii.
                // Assuming columns don't go past Z for this simple sheet
                const descColLetter = String.fromCharCode(65 + descIdx);
                const descCellRange = `Sheet1!${descColLetter}${i + 1}`;

                updatePromises.push(
                    sheets.spreadsheets.values.update({
                        spreadsheetId,
                        range: descCellRange,
                        valueInputOption: 'USER_ENTERED',
                        requestBody: {
                            values: [[newDescription]]
                        }
                    }).then(() => console.log(`Cleaned description in row ${i + 1}`))
                );

                if (teaserIdx !== -1 && teaser !== newTeaser) {
                    const teaserColLetter = String.fromCharCode(65 + teaserIdx);
                    const teaserCellRange = `Sheet1!${teaserColLetter}${i + 1}`;
                    updatePromises.push(
                        sheets.spreadsheets.values.update({
                            spreadsheetId,
                            range: teaserCellRange,
                            valueInputOption: 'USER_ENTERED',
                            requestBody: {
                                values: [[newTeaser]]
                            }
                        }).then(() => console.log(`Cleaned teaser in row ${i + 1}`))
                    );
                }
            }
        }

        console.log(`Waiting for ${updatePromises.length} cell updates to finish...`);
        await Promise.all(updatePromises);
        console.log("Cleanup complete!");

    } catch (err) {
        console.error('The API returned an error: ' + err);
    }
}

cleanSpreadsheet();
