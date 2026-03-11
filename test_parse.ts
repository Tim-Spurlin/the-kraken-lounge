import fs from 'fs'
import Papa from 'papaparse'
import https from 'https'

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQf5qoMtNgc7kQTbmw_pJxKaWioKThrFdyp-3ZZt79gOiNz_pfYQf4f1lB81aGQzuQ3CqB_6xyFIyNL/pub?output=csv'

https.get(GOOGLE_SHEET_CSV_URL, (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data += chunk
    })
    res.on('end', () => {
        Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                console.log("Parsed Rows: ", results.data.length)
                console.log(results.data)

                const today = new Date()
                today.setHours(0, 0, 0, 0)
                console.log("Today is:", today.toISOString())

                results.data.forEach((row: any) => {
                    const eventDate = new Date(row.date)
                    console.log(`Event Date: ${row.date} -> Parsed Date Object: ${eventDate.toISOString()} -> Valid upcoming? ${eventDate >= today}`)
                })
            }
        })
    })
})
