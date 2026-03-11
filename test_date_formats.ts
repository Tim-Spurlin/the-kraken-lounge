const formats = [
    "July18,2026",
    "July18 2026",
    "July18th2026",
    "July18th,2026",
    "Dec2nd2026",
    "March3rd2026",
    "April1st,2026"
];

function parseFlexibleDate(dateStr: string): Date {
    if (!dateStr) return new Date("");

    // 1. Inject spaces between letters and numbers (e.g. "July18" -> "July 18", "18th2026" -> "18th 2026")
    let cleanStr = dateStr.replace(/([a-zA-Z])(\d)/g, '$1 $2').replace(/(\d)([a-zA-Z])/g, '$1 $2');

    // 2. Remove ordinal indicators (st, nd, rd, th) from days
    cleanStr = cleanStr.replace(/\b(\d+)\s?(st|nd|rd|th)\b/gi, '$1');

    let d = new Date(cleanStr);

    // 3. Fallback for European formats (DD-MM-YYYY)
    if (isNaN(d.getTime())) {
        const parts = cleanStr.split(/[-/]/);
        if (parts.length === 3 && parts[2].length === 4) {
            d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }
    }
    return d;
}

console.log("Testing Spaceless Date Parsing:");
formats.forEach(f => {
    const d = parseFlexibleDate(f);
    console.log(`"${f}" -> ${!isNaN(d.getTime()) ? d.toISOString().split('T')[0] : "INVALID"}`)
});
