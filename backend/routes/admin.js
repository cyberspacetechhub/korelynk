const express = require('express')
const router = express.Router()
const contactService = require('../services/contactService')
const projectController = require('../controllers/projectController')
const settingsController = require('../controllers/settingsController')
const teamController = require('../controllers/teamController')
const uploadService = require('../services/uploadService')
const { getAllFeedback, updateFeedbackStatus } = require('../controllers/feedbackController')
const Newsletter = require('../models/Newsletter')
const Project = require('../models/Project')
const Feedback = require('../models/Feedback')
const APIResponse = require('../utils/APIResponse')
const { adminAuth } = require('../middleware/auth')
const multer = require('multer')

// Apply admin auth to all routes
router.use(adminAuth)

// Configure multer for settings uploads
const upload = multer({
  storage: uploadService.storage,
  limits: { fileSize: 5 * 1024 * 1024 }
}).fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }])

// GET /api/admin/dashboard - Get dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [contacts, newsletter, projects, feedback] = await Promise.all([
      contactService.getContactStats(),
      Newsletter.countDocuments(),
      Project.countDocuments(),
      Feedback.countDocuments()
    ])

    const recentContacts = await contactService.getRecentContacts(5)

    const stats = {
      contacts,
      newsletter,
      projects,
      feedback,
      recentContacts
    }

    APIResponse.success(res, stats, 'Dashboard stats retrieved successfully')
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    APIResponse.error(res, 'Failed to fetch dashboard stats', 500, 'FETCH_ERROR')
  }
})

// GET /api/admin/contacts - Get all contacts with pagination
router.get('/contacts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const result = await contactService.getAllContacts(page, limit)
    APIResponse.success(res, result, 'Contacts retrieved successfully')
  } catch (error) {
    console.error('Error fetching contacts:', error)
    APIResponse.error(res, 'Failed to fetch contacts', 500, 'FETCH_ERROR')
  }
})

// GET /api/admin/newsletter - Get all newsletter subscribers
router.get('/newsletter', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [subscribers, total] = await Promise.all([
      Newsletter.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Newsletter.countDocuments()
    ])

    const pagination = {
      current: page,
      pages: Math.ceil(total / limit),
      total
    }

    APIResponse.success(res, { subscribers, pagination }, 'Newsletter subscribers retrieved successfully')
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    APIResponse.error(res, 'Failed to fetch newsletter subscribers', 500, 'FETCH_ERROR')
  }
})

// PUT /api/admin/contacts/:id/status - Update contact status
router.put('/contacts/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const contact = await contactService.updateContactStatus(req.params.id, status)

    if (!contact) {
      return APIResponse.error(res, 'Contact not found', 404, 'CONTACT_NOT_FOUND')
    }

    APIResponse.success(res, contact, 'Contact status updated successfully')
  } catch (error) {
    console.error('Error updating contact status:', error)
    APIResponse.error(res, 'Failed to update contact status', 500, 'UPDATE_ERROR')
  }
})

// Project routes
router.get('/projects', projectController.getAllProjects)
router.post('/projects', uploadService.getUploadMiddleware(), projectController.createProject)
router.put('/projects/:id', uploadService.getUploadMiddleware(), projectController.updateProject)
router.delete('/projects/:id', projectController.deleteProject)

// Settings routes
router.get('/settings', settingsController.getSettings)
router.put('/settings', settingsController.updateSettings)

// Upload route for immediate image uploads
router.post('/upload', uploadService.getUploadMiddleware(), (req, res) => {
  try {
    if (!req.file) {
      return APIResponse.error(res, 'No file uploaded', 400, 'NO_FILE')
    }
    
    APIResponse.success(res, { url: req.file.path }, 'File uploaded successfully')
  } catch (error) {
    console.error('Upload error:', error)
    APIResponse.error(res, 'Upload failed', 500, 'UPLOAD_ERROR')
  }
})

// Favicon upload route
router.post('/upload-favicon', uploadService.getUploadMiddleware(), (req, res) => {
  try {
    console.log('Favicon upload request received');
    console.log('File:', req.file);
    
    if (!req.file) {
      console.log('No favicon file in request');
      return APIResponse.error(res, 'No favicon uploaded', 400, 'NO_FILE')
    }
    
    console.log('Favicon uploaded successfully:', req.file.path);
    APIResponse.success(res, { url: req.file.path }, 'Favicon uploaded successfully')
  } catch (error) {
    console.error('Favicon upload error:', error)
    APIResponse.error(res, 'Favicon upload failed', 500, 'UPLOAD_ERROR')
  }
})

// Team routes
router.get('/team', teamController.getAllTeamMembers)
router.post('/team', teamController.createTeamMember)
router.put('/team/:id', teamController.updateTeamMember)
router.delete('/team/:id', teamController.deleteTeamMember)

// Feedback routes
router.get('/feedback', getAllFeedback)
router.put('/feedback/:id', updateFeedbackStatus)

module.exports = router