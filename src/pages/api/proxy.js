import { WebSocket } from 'ws';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { type, content, apiKey } = req.body;

        if (!apiKey) {
            res.status(400).json({ error: 'API key is required' });
            return;
        }

        const ws = new WebSocket(`ws://localhost:9002/?apikey=${apiKey}`);

        ws.on('open', () => {
            ws.send(JSON.stringify({ type, content }));
        });

        ws.on('message', (message) => {
            res.status(200).json(JSON.parse(message));
            ws.close();
        });

        ws.on('error', (error) => {
            res.status(500).json({ error: error.message });
        });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}