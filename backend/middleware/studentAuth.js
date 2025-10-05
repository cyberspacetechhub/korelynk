const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const APIResponse = require('../utils/APIResponse')

const studentAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return APIResponse.error(res, 'Access denied. No token provided.', 401, 'NO_TOKEN')
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    if (decoded.type !== 'student') {
      return APIResponse.error(res, 'Invalid token type', 401, 'INVALID_TOKEN_TYPE')
    }

    const student = await Student.findById(decoded.id).select('-password')
    if (!student || !student.isActive) {
      return APIResponse.error(res, 'Student not found or inactive', 401, 'STUDENT_NOT_FOUND')
    }

    req.student = student
    next()
  } catch (error) {
    console.error('Student auth error:', error)
    APIResponse.error(res, 'Invalid token', 401, 'INVALID_TOKEN')
  }
}

module.exports = { studentAuth }