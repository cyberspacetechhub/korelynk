const mongoose = require('mongoose')

const chatSessionSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true
  },
  visitorName: {
    type: String,
    default: 'Anonymous'
  },
  visitorEmail: String,
  status: {
    type: String,
    enum: ['active', 'closed', 'waiting'],
    default: 'waiting'
  },
  assignedAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [String],
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  responseTime: Number, // seconds
  satisfaction: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String
  },
  closedAt: Date,
  closedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

chatSessionSchema.index({ visitor: 1 })
chatSessionSchema.index({ status: 1 })
chatSessionSchema.index({ assignedAdmin: 1 })

module.exports = mongoose.model('ChatSession', chatSessionSchema)