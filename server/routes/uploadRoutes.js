const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');

// Post a single image and get back the secure Cloudinary URL
router.post('/image', auth, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({ url: req.file.path, public_id: req.file.filename });
    } catch (err) {
        res.status(500).json({ message: 'Upload Error', error: err.message });
    }
});

module.exports = router;
