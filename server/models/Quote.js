const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    selectedServices: [String],
    totalCost: { type: Number, default: 0 },
    status: { type: String, default: 'pending', enum: ['pending', 'reviewed', 'contacted', 'completed'] }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
