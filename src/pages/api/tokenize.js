import Midtrans from "midtrans-client";

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const role = JSON.parse(req.body);

        const transaction = {
            item_details: [{
                id: role.id,
                name: role.name,
                price: role.price,
                quantity: 1,
            }],
            transaction_details: {
                order_id: `Role-${role.id}-Order-${Date.now()}`,
                gross_amount: role.price,
            },
        };

        try {
            const token = await snap.createTransactionToken(transaction);
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error creating transaction:', error);
            res.status(500).json({ error: 'Transaction creation failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}