import { getRequestContext } from '@cloudflare/next-on-pages'

export const config = {
    runtime: 'edge',
}

// NOTE: CHANGE WSS AUTH HANDLER INTO QUERY PARAMS

export default async function handler(req) {
    try {
        const response = await fetch('http://localhost:9002', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'greeting', content: 'Hello World' }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return new Response('Message sent successfully')
    } catch (err) {
        return new Response(`Error: ${err.message}`, { status: 500 })
    }
}