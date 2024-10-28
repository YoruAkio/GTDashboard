import { useState } from 'react';
import { roles } from '@/data/roles';

export default function Checkout({ id }) {
    const checkout = async () => {
        const role = roles.find(role => role.id === id);

        if (!role) {
            console.error('Invalid role ID');
            return;
        }

        const data = {
            id: role.id,
            name: role.name,
            price: role.price,
            quantity: 1, // Assuming quantity is 1 for simplicity
        };

        const res = await fetch('/api/tokenize', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const response = await res.json();
        console.log(response);

        if (response.token) {
            window.snap.pay(response.token);
        } else {
            console.error('Failed to get payment token');
        }

        console.log('Checkout');
    };

    return (
        <>
            <button onClick={checkout} className="bg-purple-500 text-white px-4 py-2 mt-4 rounded-md">
                Checkout
            </button>
        </>
    );
}