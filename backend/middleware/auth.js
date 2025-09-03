const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
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

module.exports = { auth, adminAuth }