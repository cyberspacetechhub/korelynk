const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Global search
router.get('/', searchController.globalSearch);

// Search suggestions
router.get('/suggestions', searchController.searchSuggestions);

module.exports = router;