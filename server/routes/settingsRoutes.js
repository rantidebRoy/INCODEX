const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/authMiddleware');

// Public - Get Contact Info
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.findOne() || {
            email: "admin@incodex.com",
            notificationEmail: "admin@incodex.com",
            phone: "+880 1234 567 890",
            address: "123 Tech Avenue, Silicon Colony",
            socials: { facebook: '', twitter: '', linkedin: '', github: '' }
        };
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching info', error: err.message });
    }
});

// Admin - Update Contact Settings
router.post('/update', auth, async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings(req.body);
        } else {
            Object.assign(settings, req.body);
        }
        await settings.save();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Update Error', error: err.message });
    }
});

module.exports = router;
