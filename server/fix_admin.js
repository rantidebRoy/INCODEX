const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function fixAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // Remove all current admins
        await Admin.deleteMany({});

        // Create the specific account the user mentioned
        const hashedPassword = await bcrypt.hash('incodex_2026', 10);

        await new Admin({ username: 'incodex_admin', password: hashedPassword }).save();
        await new Admin({ username: 'incoodex_admin', password: hashedPassword }).save();

        console.log('Admin accounts created (incodex_admin & incoodex_admin) / incodex_2026');

        mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

fixAdmin();
