const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const uploadService = require('../services/uploadService')
const { adminAuth } = require('../middleware/auth')

const upload = uploadService.getUploadMiddleware()

// Public
router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getProjectById)

// Admin only
router.post('/', adminAuth, upload, projectController.createProject)
router.put('/:id', adminAuth, upload, projectController.updateProject)
router.delete('/:id', adminAuth, projectController.deleteProject)
router.post('/:id/regenerate-thumbnail', adminAuth, projectController.regenerateThumbnail)

module.exports = router
