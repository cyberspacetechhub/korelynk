const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile Development', 'Backend Development', 'Database', 'DevOps', 'UI/UX Design']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  duration: {
    type: String,
    required: true // e.g., "8 weeks", "3 months"
  },
  price: {
    type: Number,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  curriculum: [{
    week: Number,
    title: String,
    topics: [String]
  }],
  prerequisites: [String],
  learningOutcomes: [String],
  maxStudents: {
    type: Number,
    default: 50
  },
  currentEnrollments: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  meetingLink: {
    type: String,
    default: ''
  },
  meetingSchedule: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Course', courseSchema)