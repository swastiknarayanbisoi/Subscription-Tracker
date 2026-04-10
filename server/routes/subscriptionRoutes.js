const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Get all subscriptions for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const subs = await Subscription.find({ userId: req.params.userId }).sort({ nextPayment: 1 });
        res.json(subs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new subscription
router.post('/', async (req, res) => {
    try {
        const newSub = new Subscription(req.body);
        const savedSub = await newSub.save();
        res.status(201).json(savedSub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a subscription
router.delete('/:id', async (req, res) => {
    try {
        await Subscription.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subscription deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;