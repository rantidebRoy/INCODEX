const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function testLogin(username, password) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const admin = await Admin.findOne({ username });
        if (!admin) {
            console.log('Admin not found!');
        } else {
            const isMatch = await bcrypt.compare(password, admin.password);
            console.log(`Password match for ${username} with "${password}": ${isMatch}`);
        }
        mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

testLogin('admin', 'incodex_2026');
