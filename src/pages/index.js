import Link from 'next/link';

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white-600">Simple Growtopia Dashboard Message</h1>
        <p className='text-gray-500'>
          Buy roles at <Link legacyBehavior href="/roles"><a className='text-blue-500 underline'>/roles</a></Link>
        </p>
      </div>
    </main>
  );
}
