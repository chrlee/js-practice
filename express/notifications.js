const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

let clients = [];

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.push(res);

    req.on('close', () => {
        clients = clients.filter(c => c !== res);
    });
})

setInterval(() => {
    const notification = {
        id: Date.now(),
        message: 'New alert at ' + new Date().toLocaleTimeString()
    };
    const data = `event: notification\ndata: ${JSON.stringify(notification)}\n\n`;
    clients.forEach(client => client.write(data));
}, 5000);

app.listen(PORT, () => {
    console.log(`Notifications server listening on http://localhost:${PORT}`);
})