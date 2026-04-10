import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const SubscriptionCard = ({ sub, onDelete }) => {
    const formattedDate = new Date(sub.nextPayment).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });

    return (
        <motion.div 
            whileHover={{ scale: 1.02, translateY: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex justify-between items-center"
        >
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                    {sub.name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{sub.name}</h3>
                    <p className="text-sm text-gray-500">Next payment: {formattedDate}</p>
                </div>
            </div>
            
            <div className="flex items-center space-x-6">
                <div className="text-right">
                   
                    <p className="font-bold text-xl text-gray-900">₹{sub.cost}</p>
                    <p className="text-xs text-gray-400">/{sub.billingCycle}</p>
                </div>
                <button 
                    onClick={() => onDelete(sub._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default SubscriptionCard;