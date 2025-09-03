const express = require('express')
const router = express.Router()
const teamController = require('../controllers/teamController')

// GET /api/team - Get all team members
router.get('/', teamController.getAllTeamMembers)

module.exports = router