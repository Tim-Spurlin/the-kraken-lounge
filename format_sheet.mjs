import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
    keyFile: './kraken-bot-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '1eE5laJ0PUWvCJUrHWoYtVOoYz3YowZpOJWfVghkzLd8';

async function formatSheet() {
    try {
        const client = await auth.getClient();
        // Get the sheet ID and existing bandings
        const spreadSheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetData = spreadSheet.data.sheets[0];
        const sheetId = sheetData.properties.sheetId;

        const requests = [];

        // 0. Remove existing banding if any exists
        if (sheetData.bandedRanges && sheetData.bandedRanges.length > 0) {
            sheetData.bandedRanges.forEach(band => {
                requests.push({
                    deleteBanding: {
                        bandedRangeId: band.bandedRangeId
                    }
                });
            });
        }

        requests.push(
            // 1. Freeze first row and first column
            {
                updateSheetProperties: {
                    properties: {
                        sheetId: sheetId,
                        gridProperties: {
                            frozenRowCount: 1,
                            frozenColumnCount: 1
                        }
                    },
                    fields: 'gridProperties(frozenRowCount, frozenColumnCount)'
                }
            },
            // 2. Format Header Row (Black background, bold, white text, centered)
            {
                repeatCell: {
                    range: {
                        sheetId: sheetId,
                        startRowIndex: 0,
                        endRowIndex: 1,
                    },
                    cell: {
                        userEnteredFormat: {
                            backgroundColor: { red: 0, green: 0, blue: 0 },
                            textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 }, bold: true },
                            horizontalAlignment: 'CENTER',
                            verticalAlignment: 'MIDDLE'
                        }
                    },
                    fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
                }
            },
            // 3. Format Date Column (Bold)
            {
                repeatCell: {
                    range: {
                        sheetId: sheetId,
                        startColumnIndex: 2,
                        endColumnIndex: 3,
                        startRowIndex: 1
                    },
                    cell: {
                        userEnteredFormat: {
                            textFormat: { bold: true },
                            horizontalAlignment: 'CENTER'
                        }
                    },
                    fields: 'userEnteredFormat(textFormat,horizontalAlignment)'
                }
            },
            // 4. Set Dropdowns for the "Type" column (Column E, index 4)
            {
                setDataValidation: {
                    range: {
                        sheetId: sheetId,
                        startColumnIndex: 4,
                        endColumnIndex: 5,
                        startRowIndex: 1, // Start on Row 2 to avoid putting a dropdown on the header
                        endRowIndex: 1000
                    },
                    rule: {
                        condition: {
                            type: 'ONE_OF_LIST',
                            values: [
                                { userEnteredValue: 'live' },
                                { userEnteredValue: 'special' },
                                { userEnteredValue: 'themed' },
                                { userEnteredValue: 'recurring' }
                            ]
                        },
                        showCustomUi: true,
                        strict: true
                    }
                }
            },
            // 5. Format Price column as Currency (Column I, index 8)
            {
                repeatCell: {
                    range: {
                        sheetId: sheetId,
                        startColumnIndex: 8,
                        endColumnIndex: 9,
                        startRowIndex: 1
                    },
                    cell: {
                        userEnteredFormat: {
                            numberFormat: {
                                type: 'CURRENCY',
                                pattern: '"$"#,##0.00'
                            }
                        }
                    },
                    fields: 'userEnteredFormat.numberFormat'
                }
            },
            // 6. Center align whole sheet vertically
            {
                repeatCell: {
                    range: { sheetId: sheetId, startRowIndex: 1 },
                    cell: { userEnteredFormat: { verticalAlignment: 'MIDDLE' } },
                    fields: 'userEnteredFormat.verticalAlignment'
                }
            },
            // 7. Add alternating row colors (banding)
            {
                addBanding: {
                    bandedRange: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: 1,
                            endRowIndex: 1000,
                            startColumnIndex: 0,
                            endColumnIndex: 9
                        },
                        rowProperties: {
                            headerColor: { red: 0.1, green: 0.1, blue: 0.1 },
                            firstBandColor: { red: 0.95, green: 0.95, blue: 0.95 },
                            secondBandColor: { red: 1.0, green: 1.0, blue: 1.0 }
                        }
                    }
                }
            }
        );

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: { requests }
        });

        console.log('Successfully formatted the spreadsheet!');
    } catch (error) {
        if (error.code === 403 || error.message.includes('permission')) {
            console.error('ERROR_PERMISSION_DENIED');
        } else {
            console.error('Error formatting spreadsheet:', error.message);
        }
    }
}

formatSheet();
