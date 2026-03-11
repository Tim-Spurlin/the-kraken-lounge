import Papa from 'papaparse';

async function testFetch() {
    const url = 'https://docs.google.com/spreadsheets/d/1eE5laJ0PUWvCJUrHWoYtVOoYz3YowZpOJWfVghkzLd8/gviz/tq?tqx=out:csv';
    const res = await fetch(url);
    const text = await res.text();

    Papa.parse(text, {
        header: true,
        complete: (results) => {
            console.log("Headers:", results.meta.fields);
            if (results.data.length > 0) {
                console.log("First Row Data:", results.data[0]);
                console.log("Last Row Data:", results.data[results.data.length - 2]); // -1 is often empty line
            }
        }
    });
}

testFetch();
