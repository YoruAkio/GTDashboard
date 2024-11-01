import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900 text-white">
      <nav className="flex items-center justify-between w-full p-6 bg-gray-800 shadow-lg">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300">Home</Link>
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow text-center mt-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Service</h1>
        <p className="text-gray-400">
          Please sign in to access the dashboard.
        </p>
      </div>
    </main>
  );
}