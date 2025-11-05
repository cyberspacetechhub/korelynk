const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  location: {
    country: String,
    city: String,
    region: String
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  browser: String,
  os: String,
  referrer: String,
  currentPage: String,
  pagesVisited: [{
    page: String,
    timestamp: { type: Date, default: Date.now },
    timeSpent: Number // seconds
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  totalTimeSpent: {
    type: Number,
    default: 0 // seconds
  }
}, {
  timestamps: true
})

visitorSchema.index({ sessionId: 1 })
visitorSchema.index({ ipAddress: 1 })
visitorSchema.index({ isActive: 1 })

module.exports = mongoose.model('Visitor', visitorSchema)