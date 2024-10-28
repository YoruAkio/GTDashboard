export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await fetch('https://www.gtsetplanner.com/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
                },
                body: JSON.stringify(req.body)
            });

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}