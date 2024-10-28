import { WebSocketServer } from 'ws';

let wsServer;

export default function handler(req, res) {
    if (!wsServer) {
        wsServer = new WebSocketServer({ noServer: true });

        wsServer.on('connection', (socket) => {
            socket.on('message', (message) => {
                console.log('Received:', message);
                // Handle the message and send a response if needed
                socket.send(JSON.stringify({ type: 'response', content: 'Message received' }));
            });
        });

        req.socket.server.on('upgrade', (request, socket, head) => {
            wsServer.handleUpgrade(request, socket, head, (ws) => {
                wsServer.emit('connection', ws, request);
            });
        });
    }

    res.status(200).end();
}