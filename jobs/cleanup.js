// jobs/cleanup.js - Node-Cron Background Jobs (Task 8)
const cron = require('node-cron');

// Every 1 minute: Clear old temporary data
cron.schedule('* * * * *', () => {
    if (global.temporarySubmissions && global.temporarySubmissions.length > 0) {
        const before = global.temporarySubmissions.length;
        // Remove entries older than 5 minutes
        const fiveMinAgo = Date.now() - 5 * 60 * 1000;
        global.temporarySubmissions = global.temporarySubmissions.filter(
            s => s.timestamp && s.timestamp > fiveMinAgo
        );
        const after = global.temporarySubmissions.length;
        console.log(`Cron job executed successfully. Cleaned ${before - after} old entries. Remaining: ${after}`);
    } else {
        console.log('Cron job executed successfully. No temporary data to clean.');
    }
});

console.log('Background cron job scheduled (every 1 minute).');
