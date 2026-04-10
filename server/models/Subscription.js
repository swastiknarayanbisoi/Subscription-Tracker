const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Firebase UID
    name: { type: String, required: true }, // e.g., Netflix, GitHub
    cost: { type: Number, required: true },
    billingCycle: { type: String, enum: ['Monthly', 'Yearly'], default: 'Monthly' },
    nextPayment: { type: Date, required: true },
    logoUrl: { type: String }, // Optional: URL to a logo image
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);