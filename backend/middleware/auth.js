const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const Student = require('../models/Student')
const Instructor = require('../models/Instructor')
const APIResponse = require('../utils/APIResponse')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return APIResponse.error(res, 'Access denied. No token provided', 401, 'NO_TOKEN')
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user || !user.isActive) {
      return APIResponse.error(res, 'Invalid token', 401, 'INVALID_TOKEN')
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return APIResponse.error(res, 'Token expired', 401, 'TOKEN_EXPIRED')
    }
    console.error('Auth middleware error:', error)
    APIResponse.error(res, 'Invalid token', 401, 'TOKEN_ERROR')
  }
}

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return APIResponse.error(res, 'Access denied. Admin required', 403, 'ADMIN_REQUIRED')
      }
      next()
    })
  } catch (error) {
    console.error('Admin auth error:', error)
    APIResponse.error(res, 'Access denied', 403, 'ACCESS_DENIED')
  }
}

const studentAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return APIResponse.error(res, 'Access denied. No token provided', 401, 'NO_TOKEN')
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    if (decoded.type !== 'Student') {
      return APIResponse.error(res, 'Invalid token type', 401, 'INVALID_TOKEN_TYPE')
    }
    
    const student = await Student.findById(decoded.id).select('-password')
    
    if (!student || !student.isActive) {
      return APIResponse.error(res, 'Invalid token', 401, 'INVALID_TOKEN')
    }

    req.student = student
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return APIResponse.error(res, 'Token expired', 401, 'TOKEN_EXPIRED')
    }
    console.error('Student auth error:', error)
    APIResponse.error(res, 'Invalid token', 401, 'TOKEN_ERROR')
  }
}

const instructorAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    // console.log('Instructor Auth - Token received:', token ? 'YES' : 'NO')
    
    if (!token) {
      // console.log('Instructor Auth - No token provided')
      return APIResponse.error(res, 'Access denied. No token provided', 401, 'NO_TOKEN')
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // console.log('Instructor Auth - Decoded token:', { id: decoded.id, type: decoded.type })
    
    // Check if token is for instructor
    if (decoded.type !== 'Instructor') {
      // console.log('Instructor Auth - Invalid token type:', decoded.type)
      return APIResponse.error(res, 'Invalid token type', 401, 'INVALID_TOKEN_TYPE')
    }
    
    const instructor = await Instructor.findById(decoded.id).select('-password')
    // console.log('Instructor Auth - Instructor found:', instructor ? 'YES' : 'NO')
    // console.log('Instructor Auth - Instructor active:', instructor?.isActive)
    
    if (!instructor || !instructor.isActive) {
      // console.log('Instructor Auth - Instructor not found or inactive')
      return APIResponse.error(res, 'Invalid token', 401, 'INVALID_TOKEN')
    }

    req.instructor = instructor
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // console.log('Instructor Auth - Token expired')
      return APIResponse.error(res, 'Token expired', 401, 'TOKEN_EXPIRED')
    }
    console.error('Instructor auth error:', error)
    APIResponse.error(res, 'Invalid token', 401, 'TOKEN_ERROR')
  }
}

module.exports = { auth, adminAuth, studentAuth, instructorAuth }