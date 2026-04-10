import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addSubscription } from '../services/api';

const AddSubscriptionModal = ({ isOpen, onClose, onAdd, userId }) => {
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        billingCycle: 'Monthly',
        nextPayment: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newSub = { ...formData, userId, cost: Number(formData.cost) };
            const addedSub = await addSubscription(newSub);
            onAdd(addedSub); // Update dashboard state
            onClose(); // Close modal
            // Reset form
            setFormData({ name: '', cost: '', billingCycle: 'Monthly', nextPayment: '' });
        } catch (error) {
            console.error("Failed to add subscription", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Add Subscription</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Name</label>
                                <input type="text" name="name" required placeholder="e.g., Netflix, Spotify" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" />
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Cost (₹)</label>
                                    <input type="number" name="cost" required placeholder="199" min="0" value={formData.cost} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Billing Cycle</label>
                                    <select name="billingCycle" value={formData.billingCycle} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none bg-white">
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Next Payment Date</label>
                                <input type="date" name="nextPayment" required value={formData.nextPayment} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" />
                            </div>

                            <button type="submit" disabled={loading} className="w-full py-3.5 mt-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 disabled:opacity-50">
                                {loading ? 'Adding...' : 'Save Subscription'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddSubscriptionModal;