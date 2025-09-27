require('dotenv').config()
const mongoose = require('mongoose')
const { Admin } = require('../models/User')
const connectDb = require('../config/dbConn')

const seedAdmin = async () => {
  try {
    await connectDb()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@cyberspacetechhub.vercel.app' })
    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit(0)
    }

    // Create admin user
    const admin = new Admin({
      fullname: 'System Administrator',
      email: 'admin@cyberspacetechhub.vercel.app',
      phone: '+1234567890',
      password: 'admin123',
      role: 'admin',
      permissions: ['contacts', 'projects', 'newsletter', 'settings', 'users']
    })

    await admin.save()
    console.log('Admin user created successfully')
    console.log('Email: admin@cyberspacetechhub.vercel.app')
    console.log('Password: admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding admin:', error)
    process.exit(1)
  }
}

seedAdmin()