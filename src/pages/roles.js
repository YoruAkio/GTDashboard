import { roles } from "@/data/roles";
import Checkout from "@/components/Checkout";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        // injecting snap.js script from midtrans
        const snapJS = "https://app.sandbox.midtrans.com/snap/snap.js"
        const snapScript = document.createElement('script');
        const clientKey = process.env.MIDTRANS_CLIENT_KEY

        snapScript.src = snapJS;
        snapScript.setAttribute('data-client-key', clientKey);
        snapScript.async = true;

        document.body.appendChild(snapScript);

        return () => {
            document.body.removeChild(snapScript);
        }
        
    }, [])
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24`}
        >
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-600">Simple transaction website</h1>
                <p className="mt-4">This is sample website for transaction..</p>

                {/* Card section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            className="bg-gray-600 p-4 rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <h2 className="text-xl font-bold text-white-600">{role.name}</h2>
                            <p className="text-white-500 mt-2">{role.description}</p>
                            <p className="text-white-600 mt-2">Price: {role.price}</p>
                            <Checkout id={role.id} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
