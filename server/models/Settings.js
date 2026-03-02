const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    email: { type: String, default: "admin@incodex.com" },
    notificationEmail: { type: String, default: "admin@incodex.com" },
    phone: { type: String, default: "+880 1234 567 890" },
    address: { type: String, default: "Dhaka, Bangladesh" },
    socials: {
        facebook: String,
        twitter: String,
        linkedin: String,
        github: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
