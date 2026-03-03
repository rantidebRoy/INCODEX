const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function checkAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const admins = await Admin.find({});
        console.log('Admins in database:', admins.map(a => ({ username: a.username })));
        mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkAdmin();
