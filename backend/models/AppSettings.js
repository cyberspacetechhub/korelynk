const mongoose = require('mongoose')

const appSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Cyberspace Tech Hub'
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
  contactEmail: {
    type: String,
    default: 'hello@cyberspacetechhub.com'
  },
  contactPhone: {
    type: String,
    default: '+1 (555) 123-4567'
  },
  address: {
    type: String,
    default: '123 Tech Street, Digital City, DC 12345'
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
  timestamps: true
})

module.exports = mongoose.model('AppSettings', appSettingsSchema)