const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const auth = require('../middleware/authMiddleware');

// Public - Submit a Quote
router.post('/submit', async (req, res) => {
    try {
        const newQuote = new Quote(req.body);
        await newQuote.save();
        res.status(201).json({ message: 'Quote submitted successfully', quote: newQuote });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting quote', error: err.message });
    }
});

// Admin - Get All Quotes
router.get('/all', auth, async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quotes', error: err.message });
    }
});

// Admin - Update Quote Status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const updatedQuote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedQuote);
    } catch (err) {
        res.status(500).json({ message: 'Error updating status', error: err.message });
    }
});

// Admin - Delete Quote
router.delete('/:id', auth, async (req, res) => {
    try {
        await Quote.findByIdAndDelete(req.params.id);
        res.json({ message: 'Quote deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting quote', error: err.message });
    }
});

module.exports = router;
