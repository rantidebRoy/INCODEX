const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/authMiddleware');

// Public - Get All Blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blogs', error: err.message });
    }
});

// Public - Get Single Blog by Slug
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blog', error: err.message });
    }
});

// Admin - Create Blog
router.post('/add', auth, async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ message: 'Error adding blog', error: err.message });
    }
});

// Admin - Update Blog
router.patch('/:id', auth, async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: 'Error updating blog', error: err.message });
    }
});

// Admin - Delete Blog
router.delete('/:id', auth, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting blog', error: err.message });
    }
});

module.exports = router;
