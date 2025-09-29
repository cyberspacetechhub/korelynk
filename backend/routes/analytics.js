const express = require('express');
const { getDashboardAnalytics } = require('../controllers/analyticsController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, adminAuth, getDashboardAnalytics);

module.exports = router;