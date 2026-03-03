const express = require('express');
const router = express.Router();
const Expertise = require('../models/Expertise');
const auth = require('../middleware/authMiddleware');

// Public: Get all expertise
router.get('/', async (req, res) => {
    try {
        const expertise = await Expertise.find().sort({ createdAt: 1 });
        res.json(expertise);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expertise' });
    }
});

// Admin: Save/Update all expertise
router.post('/update', auth, async (req, res) => {
    try {
        await Expertise.deleteMany({});
        const expertise = await Expertise.insertMany(req.body);
        res.json(expertise);
    } catch (err) {
        res.status(500).json({ message: 'Error updating expertise' });
    }
});

module.exports = router;
