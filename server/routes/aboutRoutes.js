const express = require('express');
const router = express.Router();
const About = require('../models/About');
const auth = require('../middleware/authMiddleware');

// Public - Get About Info
router.get('/', async (req, res) => {
    try {
        const about = await About.findOne() || { title: "Our Story", team: [] };
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching info', error: err.message });
    }
});

// Admin - Update About/Team Info
router.post('/update', auth, async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = new About(req.body);
        } else {
            Object.assign(about, req.body);
        }
        await about.save();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: 'Update Error', error: err.message });
    }
});

module.exports = router;
