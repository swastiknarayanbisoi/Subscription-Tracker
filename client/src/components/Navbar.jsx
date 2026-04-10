import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const user = auth.currentUser;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // React Router's auth listener in App.jsx will automatically 
            // detect the logout and redirect the user back to the login page.
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm top-0 z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="font-black text-xl text-gray-900 tracking-tight hidden sm:block">SubsTrack</span>
                </div>

                {/* User Info & Logout Section */}
                {user && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-7 h-7 rounded-full border border-gray-300" />
                            ) : (
                                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <User size={14} className="text-indigo-600" />
                                </div>
                            )}
                            <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                                {user.displayName || user.email.split('@')[0]}
                            </span>
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-bold text-sm rounded-xl hover:bg-red-100 transition-colors"
                        >
                            <LogOut size={16} strokeWidth={2.5} />
                            <span className="hidden sm:inline">Logout</span>
                        </motion.button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;