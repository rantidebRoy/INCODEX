const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/authMiddleware');

// Public: Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});

// Admin: Save/Update all services
router.post('/update', auth, async (req, res) => {
    try {
        await Service.deleteMany({});
        const services = await Service.insertMany(req.body);
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error updating services' });
    }
});

module.exports = router;
