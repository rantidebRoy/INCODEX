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
    team: [memberSchema],
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
