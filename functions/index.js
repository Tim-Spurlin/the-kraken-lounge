const functions = require('firebase-functions/v1');
const { google } = require('googleapis');
const cors = require('cors')({ origin: true });
const path = require('path');

const keyFilePath = path.join(__dirname, 'kraken-bot-key.json');
const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '1eE5laJ0PUWvCJUrHWoYtVOoYz3YowZpOJWfVghkzLd8';

exports.trackClick = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // Handle Preflight OPTIONS
        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'POST');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.status(204).send('');
            return;
        }

        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { eventId, title, date } = req.body;
            if (!eventId) {
                return res.status(400).send('Missing eventId');
            }

            // Check if event exists in Analytics sheet
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: 'Analytics!A:D'
            });

            const rows = response.data.values || [];

            let rowIndex = -1;
            let currentClicks = 0;

            for (let i = 1; i < rows.length; i++) {
                if (rows[i][0] === String(eventId)) {
                    rowIndex = i;
                    currentClicks = parseInt(rows[i][3] || '0', 10);
                    if (isNaN(currentClicks)) currentClicks = 0;
                    break;
                }
            }

            if (rowIndex === -1) {
                // Event not found in Analytics, append it
                await sheets.spreadsheets.values.append({
                    spreadsheetId,
                    range: 'Analytics!A:D',
                    valueInputOption: 'USER_ENTERED',
                    insertDataOption: 'INSERT_ROWS',
                    requestBody: {
                        values: [[String(eventId), title || 'Unknown Title', date || 'Unknown Date', 1]]
                    }
                });
            } else {
                // Event found, update clicks
                const sheetRowNumber = rowIndex + 1; // 0-indexed to 1-indexed row
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `Analytics!D${sheetRowNumber}:D${sheetRowNumber}`,
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [[currentClicks + 1]]
                    }
                });
            }

            res.status(200).send({ success: true, newClicks: rowIndex === -1 ? 1 : currentClicks + 1 });
        } catch (error) {
            console.error('Error tracking click:', error);
            res.status(500).send({ error: error.message });
        }
    });
});
