const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Langflow API endpoint from your example
const LANGFLOW_API_URL = 'http://127.0.0.1:7860/api/v1/run/b26e522d-ff12-4a37-ac84-c1b6edc4f7e9';

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to interact with Langflow
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const payload = {
        input_value: message,
        output_type: 'chat',
        input_type: 'chat',
        stream: true
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    try {
        console.log(`Forwarding to Langflow for streaming: ${LANGFLOW_API_URL}`);
        const langflowResponse = await fetch(LANGFLOW_API_URL, options);

        if (langflowResponse.ok && langflowResponse.headers.get('content-type')?.includes('text/event-stream')) {
            console.log('Langflow is streaming. Piping to client.');
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            langflowResponse.body.pipe(res);
            
            langflowResponse.body.on('error', (err) => {
                console.error('Error in Langflow stream pipe:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Stream error from Langflow' });
                }
                res.end();
            });

        } else {
            console.log(`Langflow responded with status: ${langflowResponse.status}. Not streaming or error.`);
            const langflowData = await langflowResponse.json();
            if (!langflowResponse.ok) {
                console.error('Langflow API error (non-stream):', langflowData);
            }
            res.status(langflowResponse.status).json(langflowData);
        }
    } catch (error) {
        console.error('Error calling Langflow API:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to connect to Langflow API' });
        } else {
            res.end();
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}); 