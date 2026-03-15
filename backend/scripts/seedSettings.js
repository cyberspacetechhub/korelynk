const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const AppSettings = require('../models/AppSettings');

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI);
  console.log('MongoDB connected');
};

const seedSettings = async () => {
  await connectDB();

  // Drop ALL existing settings documents
  const deleted = await AppSettings.deleteMany({});
  console.log(`Deleted ${deleted.deletedCount} existing settings document(s)`);

  // Create fresh document with all fields explicitly set
  const settings = await AppSettings.create({
    siteName: 'InnTechLab',
    siteDescription: 'Professional web and mobile development services',
    logo: '',
    favicon: '',
    darkIcon: '',
    contactEmail: 'inntechlab@gmail.com',
    contactPhone: '+234-916-140-3450',
    address: 'Abakaliki, Ebonyi State, Nigeria',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      github: '',
      instagram: ''
    },
    seoSettings: {
      metaTitle: 'InnTechLab - Professional Development Services',
      metaDescription: 'We create innovative web and mobile solutions that drive business growth',
      keywords: ['web development', 'mobile apps', 'tech solutions']
    },
    isActive: true
  });

  console.log('Settings seeded successfully. Document ID:', settings._id);
  console.log('Fields:', Object.keys(settings.toObject()));

  await mongoose.disconnect();
  console.log('Done.');
  process.exit(0);
};

seedSettings().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
