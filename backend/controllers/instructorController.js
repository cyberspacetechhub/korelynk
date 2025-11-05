const jwt = require('jsonwebtoken')
const Instructor = require('../models/Instructor')
const instructorService = require('../services/instructorService')
const verificationService = require('../services/verificationService')
const APIResponse = require('../utils/APIResponse')

const generateToken = (id) => {
  return jwt.sign({ id, type: 'Instructor' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, bio, expertise } = req.body

    if (!fullName || !email || !password || !phone) {
      return APIResponse.error(res, 'Required fields missing', 400, 'MISSING_FIELDS')
    }

    const existingInstructor = await Instructor.findOne({ email })
    if (existingInstructor) {
      return APIResponse.error(res, 'Email already registered', 400, 'EMAIL_EXISTS')
    }

    // Send verification code instead of creating account immediately
    const result = await verificationService.sendVerificationCode(email, {
      fullName, email, password, phone, bio, expertise: expertise || []
    }, 'instructor')

    APIResponse.success(res, { 
      email,
      ...(result.code && { devCode: result.code }) // Include code in dev mode
    }, 'Verification code sent to your email', 201)
  } catch (error) {
    console.error('Instructor registration error:', error)
    APIResponse.error(res, 'Registration failed', 500, 'REGISTRATION_ERROR')
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body

    if (!email || !code) {
      return APIResponse.error(res, 'Email and code are required', 400, 'MISSING_FIELDS')
    }

    const instructor = await verificationService.verifyCode(email, code, 'instructor')
    const token = generateToken(instructor._id)

    APIResponse.success(res, {
      token,
      instructor: {
        id: instructor._id,
        fullName: instructor.fullName,
        email: instructor.email,
        phone: instructor.phone,
        bio: instructor.bio,
        expertise: instructor.expertise
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

    await verificationService.sendPasswordResetCode(email, 'instructor')
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

    await verificationService.resetPassword(email, code, newPassword, 'instructor')
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
      return APIResponse.error(res, 'Email and password required', 400, 'MISSING_CREDENTIALS')
    }

    const instructor = await Instructor.findOne({ email, isActive: true })
    if (!instructor || !(await instructor.comparePassword(password))) {
      return APIResponse.error(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS')
    }

    const token = generateToken(instructor._id)

    APIResponse.success(res, {
      token,
      instructor: {
        id: instructor._id,
        fullName: instructor.fullName,
        email: instructor.email,
        phone: instructor.phone,
        bio: instructor.bio,
        expertise: instructor.expertise
      }
    }, 'Login successful')
  } catch (error) {
    console.error('Instructor login error:', error)
    APIResponse.error(res, 'Login failed', 500, 'LOGIN_ERROR')
  }
}

const getDashboard = async (req, res) => {
  try {
    const instructorId = req.instructor._id
    const [classes, stats] = await Promise.all([
      instructorService.getInstructorClasses(instructorId),
      instructorService.getInstructorStats(instructorId)
    ])

    APIResponse.success(res, { classes, stats }, 'Dashboard data retrieved')
  } catch (error) {
    console.error('Get dashboard error:', error)
    APIResponse.error(res, 'Failed to get dashboard', 500, 'DASHBOARD_ERROR')
  }
}

const getClassDetails = async (req, res) => {
  try {
    const classData = await instructorService.getClassById(req.params.classId)
    if (!classData) {
      return APIResponse.error(res, 'Class not found', 404, 'CLASS_NOT_FOUND')
    }

    // Verify instructor owns this class
    if (classData.instructor._id.toString() !== req.instructor._id.toString()) {
      return APIResponse.error(res, 'Access denied', 403, 'ACCESS_DENIED')
    }

    APIResponse.success(res, classData, 'Class details retrieved')
  } catch (error) {
    console.error('Get class details error:', error)
    APIResponse.error(res, 'Failed to get class details', 500, 'CLASS_DETAILS_ERROR')
  }
}

module.exports = {
  register,
  verifyEmail,
  login,
  getDashboard,
  getClassDetails,
  requestPasswordReset,
  resetPassword
}