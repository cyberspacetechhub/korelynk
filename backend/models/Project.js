const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  // Legacy field — kept for backward compatibility with existing documents
  image: {
    type: String,
    trim: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'ecommerce', 'saas'],
    default: 'web',
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  // ── Thumbnail system ──────────────────────────────────────────────────────
  thumbnail: {
    source: {
      type: String,
      enum: ['automatic', 'custom'],
      default: 'automatic',
    },
    url: {
      type: String,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'generating', 'ready', 'failed'],
      default: 'pending',
    },
    generatedAt: Date,
    error: String,
  },
}, {
  timestamps: true,
})

// Virtual: resolve the best available image URL
// Priority: custom thumbnail > auto thumbnail > legacy image field
projectSchema.virtual('resolvedImage').get(function () {
  if (this.thumbnail?.url) return this.thumbnail.url
  if (this.image) return this.image
  return null
})

projectSchema.set('toJSON', { virtuals: true })
projectSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Project', projectSchema)
