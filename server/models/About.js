const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    socials: {
        linkedin: String,
        twitter: String
    }
});

const aboutSchema = new mongoose.Schema({
    title: { type: String, default: "Our Story" },
    mission: { type: String },
    description: { type: String },
    heroLine1: { type: String, default: "Beautiful things" },
    heroLine2: { type: String, default: "come together" },
    heroLine3: { type: String, default: "ONE BYTE at a time." },
    heroDescription: { type: String, default: "You have no idea how RAPIDLY YOU CAN GROW. Let's find out together." },
    team: [memberSchema],
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
