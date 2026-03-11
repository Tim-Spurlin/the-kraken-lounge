import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
    keyFile: '/home/saphyre-solutions/Desktop/Projects/Kraken_Promo/kraken-site-google-sheets-automation-service-account-key/kraken-sheets-api-0abc9dfa2bc5.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '1eE5laJ0PUWvCJUrHWoYtVOoYz3YowZpOJWfVghkzLd8';

async function upgradeSheet() {
    try {
        const spreadSheet = await sheets.spreadsheets.get({ spreadsheetId });
        const mainSheetId = spreadSheet.data.sheets.find(s => s.properties.title === 'Sheet1')?.properties?.sheetId || 0;

        let analyticsSheet = spreadSheet.data.sheets.find(s => s.properties.title === 'Analytics');
        let analyticsSheetId;

        const requests = [];

        // 1. Add Hints (Notes) to headers on main sheet
        requests.push({
            updateCells: {
                range: {
                    sheetId: mainSheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: 9
                },
                rows: [
                    {
                        values: [
                            { note: "Auto-generated unique ID. Do not change if possible." }, // A: id
                            { note: "The name of the event/show." }, // B: title
                            { note: "Event Date. E.g. 2026-07-18 or July 18 2026. Make sure to include the year!" }, // C: date
                            { note: "Event Time. E.g. 8:00 PM" }, // D: time
                            { note: "Select from the dropdown: live, special, themed, recurring" }, // E: type
                            { note: "Comma-separated musical genres. E.g. Rock, Metal" }, // F: genres
                            { note: "Comma-separated list of bands playing." }, // G: bands
                            { note: "Full description of the event." }, // H: description
                            { note: "Entry price. Leave blank if free." } // I: price
                        ]
                    }
                ],
                fields: "note"
            }
        });

        if (!analyticsSheet) {
            // Create Analytics tab
            requests.push({
                addSheet: {
                    properties: {
                        title: 'Analytics',
                        gridProperties: { rowCount: 100, columnCount: 10 }
                    }
                }
            });
        }

        // Run first batch to create sheet if needed
        let response = await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: { requests }
        });

        if (!analyticsSheet) {
            analyticsSheetId = response.data.replies.find(r => r.addSheet)?.addSheet?.properties?.sheetId;
        } else {
            analyticsSheetId = analyticsSheet.properties.sheetId;
        }

        // Now format the Analytics sheet
        if (analyticsSheetId !== undefined && !analyticsSheet) {
            // Just created, so set up headers and chart
            const analyticsRequests = [
                // Setup headers
                {
                    updateCells: {
                        range: {
                            sheetId: analyticsSheetId,
                            startRowIndex: 0,
                            endRowIndex: 1,
                            startColumnIndex: 0,
                            endColumnIndex: 4
                        },
                        rows: [
                            {
                                values: [
                                    { userEnteredValue: { stringValue: "Event ID" }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0, green: 0, blue: 0 } } },
                                    { userEnteredValue: { stringValue: "Title" }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0, green: 0, blue: 0 } } },
                                    { userEnteredValue: { stringValue: "Date" }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0, green: 0, blue: 0 } } },
                                    { userEnteredValue: { stringValue: "Total Clicks" }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0, green: 0, blue: 0 } } }
                                ]
                            }
                        ],
                        fields: "userEnteredValue,userEnteredFormat(textFormat,backgroundColor)"
                    }
                },
                // Format headers text to be white
                {
                    repeatCell: {
                        range: {
                            sheetId: analyticsSheetId,
                            startRowIndex: 0,
                            endRowIndex: 1,
                            startColumnIndex: 0,
                            endColumnIndex: 4
                        },
                        cell: {
                            userEnteredFormat: {
                                textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 }, bold: true }
                            }
                        },
                        fields: "userEnteredFormat.textFormat"
                    }
                },
                // Add a bar chart
                {
                    addChart: {
                        chart: {
                            spec: {
                                title: "Event Clicks",
                                basicChart: {
                                    chartType: "COLUMN",
                                    legendPosition: "BOTTOM_LEGEND",
                                    axis: [
                                        { position: "BOTTOM_AXIS", title: "Event Title" },
                                        { position: "LEFT_AXIS", title: "Clicks" }
                                    ],
                                    domains: [
                                        {
                                            domain: {
                                                sourceRange: {
                                                    sources: [
                                                        { sheetId: analyticsSheetId, startRowIndex: 1, endRowIndex: 50, startColumnIndex: 1, endColumnIndex: 2 } // Titles
                                                    ]
                                                }
                                            }
                                        }
                                    ],
                                    series: [
                                        {
                                            series: {
                                                sourceRange: {
                                                    sources: [
                                                        { sheetId: analyticsSheetId, startRowIndex: 1, endRowIndex: 50, startColumnIndex: 3, endColumnIndex: 4 } // Clicks
                                                    ]
                                                }
                                            },
                                            targetAxis: "LEFT_AXIS"
                                        }
                                    ],
                                    headerCount: 0
                                }
                            },
                            position: {
                                overlayPosition: {
                                    anchorCell: { sheetId: analyticsSheetId, rowIndex: 2, columnIndex: 5 },
                                    offsetXPixels: 0,
                                    offsetYPixels: 0,
                                    widthPixels: 600,
                                    heightPixels: 400
                                }
                            }
                        }
                    }
                }
            ];

            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: { requests: analyticsRequests }
            });
        }

        console.log('Successfully upgraded the spreadsheet with Analytics and Hints!');
    } catch (error) {
        console.error('Error upgrading spreadsheet:', error.message);
    }
}

upgradeSheet();
