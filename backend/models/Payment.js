const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  enrollment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enrollment',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['paystack', 'bank_transfer'],
    required: true
  },
  paymentReference: {
    type: String,
    trim: true
  },
  paymentProof: {
    type: String, // Cloudinary URL
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  },
  confirmedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Admin who confirmed
  },
  confirmedAt: {
    type: Date
  },
  rejectionReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Payment', paymentSchema)