const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/authMiddleware');

// Public: Submit a review
router.post('/submit', async (req, res) => {
    try {
        const { name, email, rating, comment } = req.body;
        const newReview = new Review({ name, email, rating, comment });
        await newReview.save();
        res.status(201).json({ message: 'Review submitted for approval' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Get all reviews (pending + approved)
router.get('/all', auth, async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Approve / Reject a review
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Delete a review
router.delete('/:id', auth, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Public: Get only approved reviews
router.get('/approved', async (req, res) => {
    try {
        const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
