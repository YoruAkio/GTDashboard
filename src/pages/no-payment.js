export default function NoPayment() {
    return (
        <main className="flex min-h-screen items-center justify-center p-24">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">Error: No payment has proceeded</h1>
                <p className="mt-4">It seems there was an issue with your Midtrans payment. Please try again or contact support if the issue persists.</p>
            </div>
        </main>
    );
}