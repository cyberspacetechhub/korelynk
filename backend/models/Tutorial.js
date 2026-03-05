const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['html', 'css', 'javascript', 'react', 'nodejs', 'python', 'mongodb', 'git']
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  codeExample: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: '5 min'
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }],
  nextLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  },
  previousLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

tutorialSchema.index({ category: 1, order: 1 });
tutorialSchema.index({ slug: 1 });

module.exports = mongoose.model('Tutorial', tutorialSchema);
