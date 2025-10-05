const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  experience: {
    type: String,
    enum: ['None', 'Basic', 'Intermediate', 'Advanced'],
    required: true
  },
  motivation: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  approvedDate: {
    type: Date
  },
  completedDate: {
    type: Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Enrollment', enrollmentSchema)