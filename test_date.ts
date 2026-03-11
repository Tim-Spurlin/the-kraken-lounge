const eventStr = "July 18";
const d = new Date(eventStr);
const today = new Date();
today.setHours(0, 0, 0, 0);

console.log(`String: ${eventStr}`);
console.log(`Parsed Date: ${d.toISOString()}`);
console.log(`Is valid date object? ${!isNaN(d.getTime())}`);
console.log(`Today: ${today.toISOString()}`);
console.log(`Is it >= today? ${d >= today}`);
