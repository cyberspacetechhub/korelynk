const express = require('express')
const router = express.Router()
const chatService = require('../services/chatService')
const visitorService = require('../services/visitorService')
const APIResponse = require('../utils/APIResponse')
const { auth } = require('../middleware/auth')

// Visitor routes (public)
router.post('/visitor/track', async (req, res) => {
  try {
    const visitor = await visitorService.trackVisitor(req)
    APIResponse.success(res, visitor, 'Visitor tracked successfully')
  } catch (error) {
    console.error('Error tracking visitor:', error)
    APIResponse.error(res, 'Failed to track visitor', 500, 'TRACKING_ERROR')
  }
})

router.post('/visitor/page', async (req, res) => {
  try {
    const { sessionId, page } = req.body
    const visitor = await visitorService.updateVisitorPage(sessionId, page)
    APIResponse.success(res, visitor, 'Page updated successfully')
  } catch (error) {
    console.error('Error updating page:', error)
    APIResponse.error(res, 'Failed to update page', 500, 'UPDATE_ERROR')
  }
})

router.post('/session/create', async (req, res) => {
  try {
    const { visitorId, visitorName, visitorEmail } = req.body
    const session = await chatService.createChatSession(visitorId, visitorName, visitorEmail)
    APIResponse.success(res, session, 'Chat session created successfully')
  } catch (error) {
    console.error('Error creating chat session:', error)
    APIResponse.error(res, 'Failed to create chat session', 500, 'SESSION_ERROR')
  }
})

router.get('/session/visitor/:visitorId', async (req, res) => {
  try {
    const session = await chatService.getSessionByVisitor(req.params.visitorId)
    APIResponse.success(res, session, 'Session retrieved successfully')
  } catch (error) {
    console.error('Error getting session:', error)
    APIResponse.error(res, 'Failed to get session', 500, 'SESSION_ERROR')
  }
})

router.get('/session/:sessionId/messages', async (req, res) => {
  try {
    const messages = await chatService.getSessionMessages(req.params.sessionId)
    APIResponse.success(res, messages, 'Messages retrieved successfully')
  } catch (error) {
    console.error('Error getting messages:', error)
    APIResponse.error(res, 'Failed to get messages', 500, 'MESSAGE_ERROR')
  }
})

router.get('/visitor/check-recent', async (req, res) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress
    const recentSession = await chatService.getRecentVisitorByIP(ipAddress)
    APIResponse.success(res, { hasRecentSession: !!recentSession, session: recentSession }, 'Recent visitor check completed')
  } catch (error) {
    console.error('Error checking recent visitor:', error)
    APIResponse.error(res, 'Failed to check recent visitor', 500, 'CHECK_ERROR')
  }
})

// Admin routes (protected)
router.get('/admin/sessions', auth, async (req, res) => {
  try {
    const sessions = await chatService.getActiveSessions()
    APIResponse.success(res, sessions, 'Sessions retrieved successfully')
  } catch (error) {
    console.error('Error getting sessions:', error)
    APIResponse.error(res, 'Failed to get sessions', 500, 'SESSION_ERROR')
  }
})

router.get('/admin/visitors', auth, async (req, res) => {
  try {
    const visitors = await visitorService.getActiveVisitors()
    APIResponse.success(res, visitors, 'Visitors retrieved successfully')
  } catch (error) {
    console.error('Error getting visitors:', error)
    APIResponse.error(res, 'Failed to get visitors', 500, 'VISITOR_ERROR')
  }
})

router.put('/admin/session/:sessionId/assign', auth, async (req, res) => {
  try {
    const { adminId } = req.body
    const session = await chatService.assignAdminToSession(req.params.sessionId, adminId)
    APIResponse.success(res, session, 'Admin assigned successfully')
  } catch (error) {
    console.error('Error assigning admin:', error)
    APIResponse.error(res, 'Failed to assign admin', 500, 'ASSIGNMENT_ERROR')
  }
})

router.put('/admin/session/:sessionId/close', auth, async (req, res) => {
  try {
    const session = await chatService.closeSession(req.params.sessionId, req.user.id)
    APIResponse.success(res, session, 'Session closed successfully')
  } catch (error) {
    console.error('Error closing session:', error)
    APIResponse.error(res, 'Failed to close session', 500, 'CLOSE_ERROR')
  }
})

router.get('/admin/unread-count', auth, async (req, res) => {
  try {
    const count = await chatService.getUnreadCount(req.user.id)
    APIResponse.success(res, { count }, 'Unread count retrieved successfully')
  } catch (error) {
    console.error('Error getting unread count:', error)
    APIResponse.error(res, 'Failed to get unread count', 500, 'COUNT_ERROR')
  }
})

module.exports = router