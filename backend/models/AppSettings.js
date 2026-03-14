const mongoose = require('mongoose')

const appSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'InnTechLabs'
  },
  siteDescription: {
    type: String,
    default: 'Professional web and mobile development services'
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  darkIcon: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    default: 'inntechlabs@gmail.com'
  },
  contactPhone: {
    type: String,
    default: '+234-916-140-3450'
  },
  address: {
    type: String,
    default: 'Abakaliki, Ebonyi State, Nigeria'
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    github: String,
    instagram: String
  },
  seoSettings: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  strict: false
})

module.exports = mongoose.model('AppSettings', appSettingsSchema)