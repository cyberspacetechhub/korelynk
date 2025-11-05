const Payment = require('../models/Payment')
const Enrollment = require('../models/Enrollment')
const emailService = require('./emailService')

class PaymentService {
  async createPayment(paymentData) {
    const payment = new Payment(paymentData)
    await payment.save()
    return await Payment.findById(payment._id)
      .populate('student', 'firstName lastName email')
      .populate('course', 'title')
      .populate('enrollment')
  }

  async getAllPayments() {
    return await Payment.find()
      .populate('student', 'firstName lastName email')
      .populate('course', 'title')
      .populate('enrollment')
      .sort({ createdAt: -1 })
  }

  async confirmPayment(paymentId, adminId) {
    const payment = await Payment.findById(paymentId)
      .populate('student', 'firstName lastName email')
      .populate('course', 'title')
      .populate('enrollment')

    if (!payment) {
      throw new Error('Payment not found')
    }

    payment.status = 'confirmed'
    payment.confirmedBy = adminId
    payment.confirmedAt = new Date()
    await payment.save()

    // Update enrollment status
    const enrollment = await Enrollment.findById(payment.enrollment._id)
    enrollment.status = 'active'
    enrollment.paymentStatus = 'confirmed'
    await enrollment.save()

    // Send confirmation email
    await emailService.sendPaymentConfirmation(payment.student.email, {
      studentName: `${payment.student.firstName} ${payment.student.lastName}`,
      courseName: payment.course.title,
      amount: payment.amount
    })

    return payment
  }

  async rejectPayment(paymentId, adminId, reason = '') {
    const payment = await Payment.findById(paymentId)
      .populate('student', 'firstName lastName email')
      .populate('course', 'title')

    if (!payment) {
      throw new Error('Payment not found')
    }

    payment.status = 'rejected'
    payment.confirmedBy = adminId
    payment.confirmedAt = new Date()
    payment.rejectionReason = reason
    await payment.save()

    // Update enrollment status
    const enrollment = await Enrollment.findById(payment.enrollment._id)
    enrollment.status = 'rejected'
    enrollment.paymentStatus = 'rejected'
    await enrollment.save()

    // Send rejection email
    await emailService.sendPaymentRejection(payment.student.email, {
      studentName: `${payment.student.firstName} ${payment.student.lastName}`,
      courseName: payment.course.title
    })

    return payment
  }
}

module.exports = new PaymentService()