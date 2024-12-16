const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

// Use CORS for all routes
app.use(cors());

// Proxy endpoint
app.get('/', (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing "url" query parameter' });
    }

    request(targetUrl)
        .on('error', (error) => {
            console.error('Error fetching target URL:', error);
            res.status(500).json({ error: 'Failed to fetch the target URL' });
        })
        .pipe(res);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`CORS Proxy server running on port ${PORT}`);
});
