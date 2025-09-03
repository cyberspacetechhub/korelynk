const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  source: {
    type: String,
    enum: ['website', 'admin', 'import'],
    default: 'website'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Newsletter', newsletterSchema)