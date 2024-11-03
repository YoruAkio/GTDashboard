import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { FaBars, FaTimes, FaUser, FaServer, FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserRole } from '@/actions/user';

export default function Dashboard() {
    const { user } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedSection, setSelectedSection] = useState('account-info');
    const [roles, setRoles] = useState([]);
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'valentine' : 'dark');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setIsSidebarOpen(false); // Auto-close the sidebar
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getUserRole(user?.id);
                setRoles(data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        if (user) {
            fetchRoles();
        }
    }, [user]);

    return (
        <main className="flex flex-col min-h-screen bg-base-200 text-base-content relative">
            <SignedIn>
                <nav className="bg-base-300 p-3 flex justify-between items-center rounded shadow-lg fixed w-full overflow-hidden z-10">
                    <h1 className="text-2xl font-bold ml-4 md:ml-20">Dashboard</h1>
                    <div className="flex items-center justify-end w-full">
                        <ul className="flex items-center">
                            <li className="mr-2">
                                <a href="/roles" className="btn btn-ghost">Roles</a>
                            </li>
                            <li>
                                <a href="/" className="btn btn-ghost">Home</a>
                            </li>
                        </ul>
                        <button onClick={toggleTheme} className="btn btn-ghost">
                            {theme === 'dark' ? <FaSun className='w-5 h-5' /> : <FaMoon className='w-5 h-5' />}
                        </button>
                        <UserButton />
                    </div>
                </nav>
                <motion.aside
                    initial={{ width: '4rem' }}
                    animate={{ width: isSidebarOpen ? '16rem' : '4rem' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`bg-base-300 p-1 pt-2 overflow-hidden shadow-lg fixed h-full z-20 top-0`}
                >
                    <div className="flex items-center p-1">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleSidebar}
                            className="btn btn-ghost"
                        >
                            {isSidebarOpen ? <FaTimes /> : <FaBars />}
                        </motion.button>
                    </div>
                    <ul className="menu p-1 pt-4 w-full text-md">
                        <li>
                            <a href="#account-info" className={`flex items-center mb-3 ${selectedSection === 'account-info' ? 'active' : ''}`} onClick={() => handleSectionClick('account-info')}>
                                <FaUser />
                                {isSidebarOpen && <span className="ml-2">Account Information</span>}
                            </a>
                        </li>
                        <li>
                            <a href="#server-info" className={`flex items-center mb-3 ${selectedSection === 'server-info' ? 'active' : ''}`} onClick={() => handleSectionClick('server-info')}>
                                <FaServer />
                                {isSidebarOpen && <span className="ml-2">Server Information</span>}
                            </a>
                        </li>
                    </ul>
                </motion.aside>
                <section className={`flex-grow p-6 pt-24 ${isSidebarOpen ? 'ml-64 md:ml-64' : 'ml-16'}`}>
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg h-full">
                        {selectedSection === 'account-info' && (
                            <div id="account-info" className="mb-8">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-2xl md:text-4xl font-bold mb-4">Account Information</h2>
                                    <div className='image-preview'>
                                        <div className="avatar">
                                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-4">
                                                <img src={user?.imageUrl} alt={user?.fullName} className="w-40 h-28 rounded-full mb-8" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-2xl"><strong>Name:</strong> {user?.fullName}</p>
                                    <p className="text-sm md:text-2xl"><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
                                    <p className="text-sm md:text-2xl"><strong>Connection(s):</strong> {user?.externalAccounts?.map(account =>
                                        account.provider.charAt(0).toUpperCase() + account.provider.slice(1)
                                    ).join(', ')}</p>
                                </div>
                                <div className="divider"></div>
                                <div className="flex flex-col">
                                    <h2 className="text-lg md:text-2xl font-bold mb-4">In-Game Information ( <a className='underline'>EthernityPS</a> )</h2>
                                    <p className="text-sm md:text-2xl"><strong>Role:</strong> {roles.length > 0 ? roles[0].roles : 'Loading...'}</p>
                                    <p className="text-sm md:text-2xl"><strong>Networth:</strong> ...Not a num</p>
                                    <p className="text-sm md:text-2xl"><strong>World Owned:</strong> ...[Object object]</p>
                                </div>
                            </div>
                        )}
                        {selectedSection === 'server-info' && (
                            <div id="server-info">
                                <h2 className="text-lg md:text-2xl font-bold mb-2">Server Information</h2>
                                <p className="text-sm md:text-2xl">Placeholder for server information...</p>
                            </div>
                        )}
                    </div>
                </section>
                <footer className="bg-base-300 p-4 text-center">
                    <p className="text-base-content">© 2024 Vertion Labs - Made by ❤️ Yoru Akio</p>
                </footer>
            </SignedIn>
            <SignedOut>
                <div className="flex flex-col items-center justify-center flex-grow text-center bg-base-200">
                    <h1 className="text-4xl font-bold mb-4 underline">Access Denied</h1>
                    <p className="mb-4">You must be signed in to view this page.</p>
                    <SignInButton mode="modal">
                        <button className="btn btn-primary">Sign In</button>
                    </SignInButton>
                </div>
            </SignedOut>
        </main>
    );
}