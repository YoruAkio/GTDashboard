import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useUser();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'valentine' : 'dark');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-base-200 text-base-content">
      <nav className="flex items-center justify-between w-full p-6 bg-base-300 shadow-lg">
        <Link href="/" className="text-2xl font-bold hover:text-primary">Homepage</Link>
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
          <Link href="/roles" className="hover:text-primary">Roles</Link>
          <button onClick={toggleTheme} className="btn btn-ghost">
            {theme === 'dark' ? <FaSun className='w-5 h-5' /> : <FaMoon className='w-5 h-5' />}
          </button>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-primary">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow text-center mt-12">
        <SignedIn>
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Service</h1>
          <div className='account-information'>
            <p className="text-xl"><strong>Your email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
            <p className="text-xl"><strong>Your username:</strong> {user?.fullName}</p>
          </div>
        </SignedIn>
        <SignedOut>
          <p className="text-4xl font-bold mb-4">You are not signed in!</p>
          <p className="text-xl">Please sign in to access this page and other.</p>
        </SignedOut>
      </div>
      <footer className="w-full p-4 bg-base-300 text-center">
        <p>&copy; 2024 Vertion Labs Made with ❤ by Yoru Akio</p>
      </footer>
    </main>
  );
}