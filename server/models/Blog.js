const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String },
    date: { type: Date, default: Date.now },
    excerpt: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
