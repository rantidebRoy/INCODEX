const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '.env') });

const Review = require('./models/Review');
const About = require('./models/About');
const Settings = require('./models/Settings');
const Service = require('./models/Service');
const Expertise = require('./models/Expertise');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Initial Reviews (Approved)
        const reviews = [
            { name: 'Alex Rivera', email: 'alex@example.com', rating: 5, comment: 'INCODEX transformed our digital presence. Their attention to detail in the UI is unmatched.', status: 'approved' },
            { name: 'Sarah Chen', email: 'sarah@example.com', rating: 5, comment: 'The optimization they did for our platform reduced load times by 60%. Absolute game changer.', status: 'approved' },
            { name: 'Marcus Knight', email: 'marcus@example.com', rating: 4, comment: 'Sleek, modern, and professional. One of the few agencies that actually understands aesthetic scalability.', status: 'approved' }
        ];
        await Review.deleteMany({ status: 'approved' });
        await Review.insertMany(reviews);
        console.log('Seed: Reviews added');

        // 2. Initial Services
        const services = [
            { title: 'FIFTY SHADES OF WEBSITE', priceRange: '$157 – $900', items: ['E-commerce', 'Portfolio', 'Personal Blogs', 'News Portal', 'Organisations', 'Travel Agency', 'Fundraising'] },
            { title: 'INNOVATIVE GRAPHICS & SEO', priceRange: '$17 – $500', items: ['Logo Design', 'Banner Design', 'Vector Illustrations', 'UI/UX Design', 'On-Page SEO', 'Off-Page SEO'] }
        ];
        await Service.deleteMany({});
        await Service.insertMany(services);
        console.log('Seed: Services added');

        // 3. Initial Expertise
        const expertise = [
            { icon: 'Layout', title: 'WEB DESIGN AND DEVELOPMENT', description: 'Crafting immersive digital experiences with cutting-edge technologies. From responsive interfaces to complex backend systems, we build for performance and scale.' },
            { icon: 'Globe', title: 'SEO OPTIMISATION & MARKETING', description: 'Driving growth through data-backed strategies. We optimize your digital presence to ensure your brand reaches the right audience at the perfect moment.' },
            { icon: 'Zap', title: 'GRAPHICS DESIGN', description: 'Visual storytelling that resonates. Our design philosophy combines minimalist aesthetics with powerful brand identity to make your vision unforgettable.' },
            { icon: 'LinkIcon', title: 'BACKLINK BUILDING', description: 'Strengthening your domain authority through high-quality backlink strategies. We focus on ethical, high-impact link acquisition to boost your search rankings.' },
            { icon: 'ShoppingCart', title: 'E-COMMERCE SOLUTION', description: 'Building scalable online stores that convert. From seamless checkout experiences to inventory management, we create shops that drive revenue.' }
        ];
        await Expertise.deleteMany({});
        await Expertise.insertMany(expertise);
        console.log('Seed: Expertise added');

        // 4. Initial About Info
        const about = {
            title: 'INCODEX SYSTEMS',
            mission: 'To redefine digital elegance through high-frequency engineering.',
            description: 'We are a collective of digital architects focused on bridging the gap between raw code and human experience.',
            heroLine1: 'Beautiful things',
            heroLine2: 'come together',
            heroLine3: 'ONE BYTE at a time.',
            heroDescription: 'You have no idea how RAPIDLY YOU CAN GROW. Let\'s find out together.',
            team: [
                { name: 'Rantideb Roy', role: 'Chief Architect', image: '' }
            ]
        };
        await About.deleteMany({});
        await new About(about).save();
        console.log('Seed: About info added');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
