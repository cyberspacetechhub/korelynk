const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const verificationService = require('../services/verificationService')
const APIResponse = require('../utils/APIResponse')

const generateToken = (id) => {
  return jwt.sign({ id, type: 'Student' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

const register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body

    if (!fullName || !email || !password || !phone) {
      return APIResponse.error(res, 'All fields are required', 400, 'MISSING_FIELDS')
    }

    const existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return APIResponse.error(res, 'Email already registered', 400, 'EMAIL_EXISTS')
    }

    // Send verification code instead of creating account immediately
    await verificationService.sendVerificationCode(email, { fullName, email, password, phone }, 'student')

    APIResponse.success(res, { email }, 'Verification code sent to your email', 201)
  } catch (error) {
    console.error('Student registration error:', error)
    APIResponse.error(res, 'Registration failed', 500, 'REGISTRATION_ERROR')
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body

    if (!email || !code) {
      return APIResponse.error(res, 'Email and code are required', 400, 'MISSING_FIELDS')
    }

    const student = await verificationService.verifyCode(email, code, 'student')
    const token = generateToken(student._id)

    APIResponse.success(res, {
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        phone: student.phone
      }
    }, 'Email verified and account created successfully')
  } catch (error) {
    console.error('Email verification error:', error)
    APIResponse.error(res, error.message || 'Verification failed', 400, 'VERIFICATION_ERROR')
  }
}

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return APIResponse.error(res, 'Email is required', 400, 'EMAIL_REQUIRED')
    }

    await verificationService.sendPasswordResetCode(email, 'student')
    APIResponse.success(res, null, 'Reset code sent to your email')
  } catch (error) {
    console.error('Password reset request error:', error)
    if (error.message === 'User not found') {
      return APIResponse.error(res, 'Email not found', 404, 'EMAIL_NOT_FOUND')
    }
    APIResponse.error(res, 'Failed to send reset code', 500, 'RESET_REQUEST_ERROR')
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body

    if (!email || !code || !newPassword) {
      return APIResponse.error(res, 'All fields are required', 400, 'MISSING_FIELDS')
    }

    await verificationService.resetPassword(email, code, newPassword, 'student')
    APIResponse.success(res, null, 'Password reset successfully')
  } catch (error) {
    console.error('Password reset error:', error)
    APIResponse.error(res, error.message || 'Password reset failed', 400, 'RESET_ERROR')
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return APIResponse.error(res, 'Email and password are required', 400, 'MISSING_CREDENTIALS')
    }

    const student = await Student.findOne({ email, isActive: true })
    if (!student || !(await student.comparePassword(password))) {
      return APIResponse.error(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS')
    }

    const token = generateToken(student._id)

    APIResponse.success(res, {
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        phone: student.phone,
        enrolledCourses: student.enrolledCourses
      }
    }, 'Login successful')
  } catch (error) {
    console.error('Student login error:', error)
    APIResponse.error(res, 'Login failed', 500, 'LOGIN_ERROR')
  }
}

const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id)
      .populate('enrolledCourses.course', 'title category instructor startDate endDate')
      .select('-password')
    
    if (!student) {
      return APIResponse.error(res, 'Student not found', 404, 'STUDENT_NOT_FOUND')
    }

    APIResponse.success(res, student, 'Profile retrieved successfully')
  } catch (error) {
    console.error('Get profile error:', error)
    APIResponse.error(res, 'Failed to get profile', 500, 'GET_PROFILE_ERROR')
  }
}

module.exports = {
  register,
  verifyEmail,
  login,
  getProfile,
  requestPasswordReset,
  resetPassword
}