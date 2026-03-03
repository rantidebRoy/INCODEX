const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Admin = require('../models/Admin');

const username = process.argv[2] || 'admin';
const password = process.argv[3] || 'incodex2026';

if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in .env file.");
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const existing = await Admin.findOne({ username });
        if (existing) {
            console.log(`Admin user '${username}' already exists.`);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        console.log(`Admin user '${username}' created successfully!`);
        console.log(`Password: ${password}`);
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection Error:", err);
        process.exit(1);
    });
