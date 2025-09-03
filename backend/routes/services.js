const express = require('express')
const router = express.Router()
const servicesController = require('../controllers/servicesController')

// GET /api/services - Get all services
router.get('/', servicesController.getAllServices)

module.exports = router