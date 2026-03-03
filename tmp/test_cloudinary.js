const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../server/.env') });

console.log('Testing Cloudinary Connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.api.ping()
    .then(result => {
        console.log('Cloudinary Connection Successful:', result);
    })
    .catch(err => {
        console.error('Cloudinary Connection Failed:');
        console.error(err);
    });
