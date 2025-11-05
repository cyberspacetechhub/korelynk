const mongoose = require('mongoose')

const chatMessageSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatSession',
    required: true
  },
  sender: {
    type: String,
    enum: ['visitor', 'admin'],
    required: true
  },
  senderInfo: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    avatar: String
  },
  messageType: {
    type: String,
    enum: ['text', 'voice', 'file', 'system'],
    default: 'text'
  },
  content: {
    text: String,
    voiceUrl: String,
    voiceTranscription: String,
    fileUrl: String,
    fileName: String,
    fileSize: Number
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  metadata: {
    duration: Number, // for voice messages
    language: String,
    confidence: Number // transcription confidence
  }
}, {
  timestamps: true
})

chatMessageSchema.index({ session: 1 })
chatMessageSchema.index({ createdAt: -1 })
chatMessageSchema.index({ isRead: 1 })

module.exports = mongoose.model('ChatMessage', chatMessageSchema)