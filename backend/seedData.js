require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Service = require('./models/Service');

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database for Seeding.');

    // 1. Seed Admin
    const email = process.env.ADMIN_EMAIL || 'saathwikmailapalli@gmail.com';
    const password = process.env.ADMIN_PASSWORD || 'admin12345';
    
    const adminExists = await User.findOne({ email });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({ email, password: hashedPassword });
      console.log('Admin user seeded.');
    } else {
      console.log('Admin user already exists.');
    }

    // 2. Seed Categories
    const sampleCategories = ['Weddings', 'Portraits', 'Corporate', 'Birthdays'];
    const categoryDocs = [];
    
    for (const catName of sampleCategories) {
      let cat = await Category.findOne({ name: catName });
      if (!cat) {
        cat = await Category.create({ name: catName });
        console.log(`Category "${catName}" seeded.`);
      }
      categoryDocs.push(cat);
    }

    // 3. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const sampleServices = [
        {
          name: 'Luxe Wedding Cinematic',
          description: 'Full-day premium wedding coverage including high-end cinematic highlight film, multi-angle documentary edit, and a masterfully retouched digital photo archive.',
          price: 75000,
          features: [
            '10 Hours Coverage by 2 Principal Photographers',
            'Full Frame 4K Raw Video Recordings',
            '350+ Ultra High Resolution Edited Images',
            'Luxury Hardcover Physical Album (40 Pages)',
            'Online Digital Gallery Access for 1 Year'
          ],
          category: 'Weddings'
        },
        {
          name: 'Premium Studio Portraiture',
          description: 'Sophisticated individual or couple portrait sessions designed for professional portfolios, editorial features, or personal keepsakes.',
          price: 15000,
          features: [
            '2 Hours Creative Studio Session',
            'Multiple Wardrobe Changes (Up to 3)',
            'Professional Hair & Makeup Assistant',
            '25 High-End Retouched Editorial Photos',
            'Raw Images Provided via Secure Drive Link'
          ],
          category: 'Portraits'
        },
        {
          name: 'Corporate Brand Portfolio',
          description: 'Comprehensive business branding photography including executive headshots, office workspace dynamics, and event storytelling.',
          price: 35000,
          features: [
            '4 Hours On-site Corporate Photography',
            'Professional Headshots for Up to 15 Staff Members',
            'Action Shots of Workspace & Collaborative Meetings',
            'Commercial Usage Rights for Website & Press',
            '24-Hour Express Delivery'
          ],
          category: 'Corporate'
        },
        {
          name: 'Elite Event Celebration',
          description: 'High-energy storytelling coverage of birthdays, anniversaries, or community gatherings capturing all authentic emotions and details.',
          price: 20000,
          features: [
            '4 Hours Continuous Event Coverage',
            'Candid Moments and Setup Photography',
            '120+ Fully Color-Corrected High Resolution Images',
            'Next-Day Social Media Highlight Teaser Grid',
            'Standard Print Package (4x6 Prints)'
          ],
          category: 'Birthdays'
        }
      ];

      await Service.insertMany(sampleServices);
      console.log('Sample Services seeded successfully.');
    } else {
      console.log('Services already seeded.');
    }

    console.log('Seeding complete. Exiting.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedAll();
