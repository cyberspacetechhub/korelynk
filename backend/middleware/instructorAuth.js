const jwt = require('jsonwebtoken')
const Instructor = require('../models/Instructor')
const APIResponse = require('../utils/APIResponse')

const instructorAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return APIResponse.error(res, 'Access denied. No token provided.', 401, 'NO_TOKEN')
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    if (decoded.type !== 'instructor') {
      return APIResponse.error(res, 'Invalid token type', 401, 'INVALID_TOKEN_TYPE')
    }

    const instructor = await Instructor.findById(decoded.id).select('-password')
    if (!instructor || !instructor.isActive) {
      return APIResponse.error(res, 'Instructor not found or inactive', 401, 'INSTRUCTOR_NOT_FOUND')
    }

    req.instructor = instructor
    next()
  } catch (error) {
    console.error('Instructor auth error:', error)
    APIResponse.error(res, 'Invalid token', 401, 'INVALID_TOKEN')
  }
}

module.exports = { instructorAuth }