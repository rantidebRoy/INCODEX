const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Credentials:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'PRESENT' : 'MISSING'
});

cloudinary.api.ping()
    .then(result => {
        console.log('Result:', result);
        process.exit(0);
    })
    .catch(err => {
        console.error('Ping failed:', err);
        process.exit(1);
    });
