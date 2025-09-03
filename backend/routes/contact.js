const express = require('express')
const router = express.Router()
const { createContact, getAllContacts, updateContactStatus } = require('../controllers/contactController')

// POST /api/contact - Submit contact form
router.post('/', createContact)

// GET /api/contact - Get all contacts (admin only)
router.get('/', getAllContacts)

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', updateContactStatus)

module.exports = router