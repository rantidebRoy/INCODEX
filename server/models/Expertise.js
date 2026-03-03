const mongoose = require('mongoose');

const expertiseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Layout' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expertise', expertiseSchema);
