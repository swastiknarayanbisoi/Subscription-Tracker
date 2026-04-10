import { useState, useEffect, useMemo } from 'react';
import { getSubscriptions, deleteSubscription } from '../services/api';
import SubscriptionCard from './SubscriptionCard';
import AddSubscriptionModal from './AddSubscriptionModal';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';

const Dashboard = ({ userId }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // New State for Search and Sort
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date'); // 'date', 'cost-high', 'cost-low', 'name'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSubscriptions(userId);
                setSubscriptions(data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchData();
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            await deleteSubscription(id);
            setSubscriptions(subscriptions.filter(sub => sub._id !== id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const handleAdd = (newSub) => {
        setSubscriptions([...subscriptions, newSub]);
    };

    const totalSpend = subscriptions.reduce((acc, sub) => {
        return acc + (sub.billingCycle === 'Yearly' ? sub.cost / 12 : sub.cost);
    }, 0);

    // --- SEARCH AND FILTER LOGIC ---
    // useMemo ensures this heavy calculation only runs when the data, search, or sort changes
    const processedSubscriptions = useMemo(() => {
        return subscriptions
            .filter(sub => 
                sub.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === 'date') return new Date(a.nextPayment) - new Date(b.nextPayment);
                if (sortBy === 'cost-high') return b.cost - a.cost;
                if (sortBy === 'cost-low') return a.cost - b.cost;
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                return 0;
            });
    }, [subscriptions, searchTerm, sortBy]);

    return (
        <div className="max-w-4xl mx-auto p-6 pt-12 pb-24">
            <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Subscriptions</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all"
                    >
                        + Add Subscription
                    </button>
                </div>
                <div className="text-left sm:text-right bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full sm:w-auto">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Monthly Spend</p>
                    <p className="text-4xl font-black text-indigo-600">₹{totalSpend.toFixed(2)}</p>
                </div>
            </header>

            {/* SEARCH AND FILTER BAR */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Search size={20} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search subscriptions..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all shadow-sm font-medium"
                    />
                </div>
                
                <div className="relative min-w-[200px]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <SlidersHorizontal size={18} />
                    </div>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all shadow-sm font-medium text-gray-700 cursor-pointer"
                    >
                        <option value="date">Upcoming First</option>
                        <option value="cost-high">Highest Cost</option>
                        <option value="cost-low">Lowest Cost</option>
                        <option value="name">Alphabetical</option>
                    </select>
                </div>
            </div>

            {/* SUBSCRIPTION LIST */}
            {loading ? (
                <div className="flex justify-center py-20 text-gray-400 font-medium animate-pulse">Loading your tracker...</div>
            ) : (
                <div className="space-y-4">
                    {processedSubscriptions.map((sub, index) => (
                        <motion.div 
                            key={sub._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <SubscriptionCard sub={sub} onDelete={handleDelete} />
                        </motion.div>
                    ))}
                    
                    {/* Empty States */}
                    {subscriptions.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
                            <p className="text-gray-500 font-medium text-lg">No subscriptions tracked yet.</p>
                            <p className="text-gray-400 mt-2">Click "Add Subscription" to get started!</p>
                        </div>
                    ) : processedSubscriptions.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 font-medium">No subscriptions match your search.</p>
                        </div>
                    ) : null}
                </div>
            )}

            <AddSubscriptionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAdd={handleAdd}
                userId={userId}
            />
        </div>
    );
};

export default Dashboard;