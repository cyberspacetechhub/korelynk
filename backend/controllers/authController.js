const jwt = require('jsonwebtoken')
const { User, Admin } = require('../models/User')
const APIResponse = require('../utils/APIResponse')

// Generate JWT tokens
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return APIResponse.error(res, 'Email and password are required', 400, 'MISSING_CREDENTIALS')
    }

    // Find user
    const user = await User.findOne({ email, isActive: true })
    if (!user || !(await user.comparePassword(password))) {
      return APIResponse.error(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS')
    }

    // Update last login for admin
    if (user.role === 'admin') {
      await Admin.findByIdAndUpdate(user._id, { lastLogin: new Date() })
    }

    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    APIResponse.success(res, {
      accessToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        permissions: user.permissions || []
      }
    }, 'Login successful')
  } catch (error) {
    console.error('Login error:', error)
    APIResponse.error(res, 'Login failed', 500, 'LOGIN_ERROR')
  }
}

// Register admin (for setup)
const registerAdmin = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body

    if (!fullname || !email || !password) {
      return APIResponse.error(res, 'Full name, email and password are required', 400, 'MISSING_FIELDS')
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return APIResponse.error(res, 'Admin already exists', 400, 'ADMIN_EXISTS')
    }

    const admin = new Admin({
      fullname,
      email,
      phone,
      password,
      role: 'admin',
      permissions: ['contacts', 'projects', 'newsletter', 'settings', 'users']
    })

    await admin.save()

    const accessToken = generateAccessToken(admin._id)
    const refreshToken = generateRefreshToken(admin._id)

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    APIResponse.success(res, {
      accessToken,
      user: {
        id: admin._id,
        fullname: admin.fullname,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      }
    }, 'Admin registered successfully')
  } catch (error) {
    console.error('Register admin error:', error)
    APIResponse.error(res, 'Registration failed', 500, 'REGISTER_ERROR')
  }
}

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return APIResponse.error(res, 'User not found', 404, 'USER_NOT_FOUND')
    }

    APIResponse.success(res, user, 'User retrieved successfully')
  } catch (error) {
    console.error('Get current user error:', error)
    APIResponse.error(res, 'Failed to get user', 500, 'GET_USER_ERROR')
  }
}

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    
    if (!refreshToken) {
      return APIResponse.error(res, 'Refresh token not provided', 401, 'NO_REFRESH_TOKEN')
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user || !user.isActive) {
      return APIResponse.error(res, 'Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN')
    }

    const newAccessToken = generateAccessToken(user._id)
    const newRefreshToken = generateRefreshToken(user._id)

    // Set new refresh token as httpOnly cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    APIResponse.success(res, {
      accessToken: newAccessToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        permissions: user.permissions || []
      }
    }, 'Token refreshed successfully')
  } catch (error) {
    console.error('Refresh token error:', error)
    APIResponse.error(res, 'Invalid refresh token', 401, 'REFRESH_TOKEN_ERROR')
  }
}

// Logout
const logout = async (req, res) => {
  try {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    APIResponse.success(res, null, 'Logged out successfully')
  } catch (error) {
    console.error('Logout error:', error)
    APIResponse.error(res, 'Logout failed', 500, 'LOGOUT_ERROR')
  }
}

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phone, address, currentPassword, newPassword } = req.body
    const userId = req.user.id

    const user = await User.findById(userId)
    if (!user) {
      return APIResponse.error(res, 'User not found', 404, 'USER_NOT_FOUND')
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return APIResponse.error(res, 'Current password is required', 400, 'CURRENT_PASSWORD_REQUIRED')
      }
      
      const isCurrentPasswordValid = await user.comparePassword(currentPassword)
      if (!isCurrentPasswordValid) {
        return APIResponse.error(res, 'Current password is incorrect', 400, 'INVALID_CURRENT_PASSWORD')
      }
      
      user.password = newPassword
    }

    // Update other fields
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phone !== undefined) user.phone = phone
    if (address !== undefined) user.address = address

    await user.save()

    // Return updated user without password
    const updatedUser = await User.findById(userId).select('-password')
    
    APIResponse.success(res, {
      id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      role: updatedUser.role,
      permissions: updatedUser.permissions || []
    }, 'Profile updated successfully')
  } catch (error) {
    console.error('Update profile error:', error)
    if (error.code === 11000) {
      return APIResponse.error(res, 'Email already exists', 400, 'EMAIL_EXISTS')
    }
    APIResponse.error(res, 'Failed to update profile', 500, 'UPDATE_PROFILE_ERROR')
  }
}

module.exports = {
  login,
  registerAdmin,
  getCurrentUser,
  refreshToken,
  logout,
  updateProfile
}