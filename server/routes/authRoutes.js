const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Login Attempt: [${username}]`);
        const admin = await Admin.findOne({ username });
        if (!admin) {
            console.log(`Login Failed: User [${username}] not found`);
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log(`Login Failed: Password mismatch for [${username}]`);
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        console.log(`Login Success: [${username}] authorized`);
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Initial setup route removed for security after account creation.

// Change Password
router.post('/change-password', require('../middleware/authMiddleware'), async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const admin = await Admin.findById(req.adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Current password incorrect' });

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;
