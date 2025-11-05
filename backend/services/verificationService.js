const EmailVerification = require('../models/EmailVerification')
const PasswordReset = require('../models/PasswordReset')
const Student = require('../models/Student')
const Instructor = require('../models/Instructor')
const emailService = require('./emailService')

class VerificationService {
  generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  async sendVerificationCode(email, userData, userType) {
    const code = this.generateCode()
    
    // Remove existing verification for this email
    await EmailVerification.deleteMany({ email, userType })
    
    // Create new verification
    await EmailVerification.create({
      email,
      code,
      userType,
      userData
    })

    // Send email with error handling
    try {
      await emailService.sendVerificationCode(email, code, userType)
    } catch (emailError) {
      console.error('Email service error:', emailError)
      // Continue without failing - verification code is still saved
      // In production, you might want to use a queue system for retries
    }
    
    return { success: true, code: process.env.NODE_ENV === 'development' ? code : undefined }
  }

  async verifyCode(email, code, userType) {
    const verification = await EmailVerification.findOne({
      email,
      code,
      userType,
      verified: false,
      expiresAt: { $gt: new Date() }
    })

    if (!verification) {
      throw new Error('Invalid or expired verification code')
    }

    // Create the actual user account
    let user
    if (userType === 'student') {
      user = new Student(verification.userData)
      await user.save()
    } else if (userType === 'instructor') {
      user = new Instructor(verification.userData)
      await user.save()
    }

    // Mark verification as used
    verification.verified = true
    await verification.save()

    return user
  }

  async sendPasswordResetCode(email, userType) {
    const code = this.generateCode()
    
    // Check if user exists
    let user
    if (userType === 'student') {
      user = await Student.findOne({ email, isActive: true })
    } else if (userType === 'instructor') {
      user = await Instructor.findOne({ email, isActive: true })
    }

    if (!user) {
      throw new Error('User not found')
    }

    // Remove existing reset codes
    await PasswordReset.deleteMany({ email })
    
    // Create new reset code
    await PasswordReset.create({ email, code })

    // Send email
    await emailService.sendPasswordResetCode(email, code, userType)
    
    return { success: true }
  }

  async verifyResetCode(email, code) {
    const resetRecord = await PasswordReset.findOne({
      email,
      code,
      used: false,
      expiresAt: { $gt: new Date() }
    })

    if (!resetRecord) {
      throw new Error('Invalid or expired reset code')
    }

    return { valid: true }
  }

  async resetPassword(email, code, newPassword, userType) {
    const resetRecord = await PasswordReset.findOne({
      email,
      code,
      used: false,
      expiresAt: { $gt: new Date() }
    })

    if (!resetRecord) {
      throw new Error('Invalid or expired reset code')
    }

    // Update password
    let user
    if (userType === 'student') {
      user = await Student.findOne({ email, isActive: true })
    } else if (userType === 'instructor') {
      user = await Instructor.findOne({ email, isActive: true })
    }

    if (!user) {
      throw new Error('User not found')
    }

    user.password = newPassword
    await user.save()

    // Mark reset code as used
    resetRecord.used = true
    await resetRecord.save()

    return { success: true }
  }
}

module.exports = new VerificationService()