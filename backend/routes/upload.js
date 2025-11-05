const express = require('express')
const router = express.Router()
const uploadService = require('../services/uploadService')
const APIResponse = require('../utils/APIResponse')

// Payment proof upload route (public access for students)
router.post('/payment-proof', uploadService.getFileUploadMiddleware(), (req, res) => {
  try {
    if (!req.file) {
      return APIResponse.error(res, 'No payment proof uploaded', 400, 'NO_FILE')
    }
    
    APIResponse.success(res, { url: req.file.path }, 'Payment proof uploaded successfully')
  } catch (error) {
    console.error('Payment proof upload error:', error)
    APIResponse.error(res, 'Payment proof upload failed', 500, 'UPLOAD_ERROR')
  }
})

module.exports = router