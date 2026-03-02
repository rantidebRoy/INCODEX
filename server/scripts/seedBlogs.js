const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Blog = require('../models/Blog');

const blogs = [
    {
        title: "The Importance of Website Maintenance",
        slug: "website-maintenance",
        image: "/blogs/blog1.jpg",
        date: new Date("October 1, 2024"),
        excerpt: "Launching a website is just the beginning; ongoing maintenance is crucial to ensure its continued success. Regular website maintenance involves updating content, monitoring performance, and addressing technical issues to provide…"
    },
    {
        title: "Harnessing the Power of Cloud Computing",
        slug: "cloud-computing",
        image: "/blogs/blog2.jpg",
        date: new Date("September 28, 2024"),
        excerpt: "Cloud computing has revolutionized the way we store, manage, and access data. By providing on-demand computing resources over the internet, it offers numerous benefits that cater to the needs of modern businesses."
    },
    {
        title: "The Importance of Machine Learning in Today's World",
        slug: "machine-learning",
        image: "/blogs/blog3.jpg",
        date: new Date("August 2, 2024"),
        excerpt: "Machine learning, a subset of artificial intelligence, has become a game-changer in various industries. It involves training algorithms to learn from data, enabling systems to make predictions and decisions without…"
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB for seeding...");

        for (const blogData of blogs) {
            const filePath = path.join(__dirname, `../../public/blogs/${blogData.slug}.txt`);
            let content = "";
            if (fs.existsSync(filePath)) {
                content = fs.readFileSync(filePath, 'utf-8');
            } else {
                content = blogData.excerpt; // fallback
            }

            const existing = await Blog.findOne({ slug: blogData.slug });
            if (!existing) {
                const newBlog = new Blog({ ...blogData, content });
                await newBlog.save();
                console.log(`Seeded blog: ${blogData.title}`);
            } else {
                console.log(`Blog already exists: ${blogData.title}`);
            }
        }

        console.log("Seeding complete!");
        process.exit(0);
    })
    .catch(err => {
        console.error("Seeding Error:", err);
        process.exit(1);
    });
