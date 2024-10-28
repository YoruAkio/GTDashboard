import { useState } from "react";

export default function WebSocketComponent() {
    const [messageType, setMessageType] = useState('greeting');
    const [messageContent, setMessageContent] = useState('Hello World');
    const apiKey = 'your_auth_token'

    const sendMessage = async () => {
        const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: messageType, content: messageContent, }),
        });

        const data = await response.json();
        console.log('Response from server:', data);
    };

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
            <a>Hello, world!</a>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={messageType}
                    placeholder="Message Type"
                    onChange={(e) => setMessageType(e.target.value)}
                    style={{
                        color: '#333',
                        padding: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '200px'
                    }}
                />
                <input
                    type="text"
                    value={messageContent}
                    placeholder="Message Content"
                    onChange={(e) => setMessageContent(e.target.value)}
                    style={{
                        color: '#333',
                        padding: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '200px'
                    }}
                />
            </div>
            <button onClick={sendMessage} style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>
                Send JSON
            </button>
        </main>
    );
}