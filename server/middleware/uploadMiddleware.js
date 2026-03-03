const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Cloudinary Ready:', {
    cloud: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY ? 'PRESENT' : 'MISSING',
    secret: process.env.CLOUDINARY_API_SECRET ? 'PRESENT' : 'MISSING'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'incodex_blogs',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif'],
    },
});

const upload = multer({ storage: storage });

module.exports = {
    cloudinary,
    upload
};
