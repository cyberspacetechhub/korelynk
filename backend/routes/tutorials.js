const express = require('express');
const router = express.Router();
const tutorialController = require('../controllers/tutorialController');
const { auth } = require('../middleware/auth');

// Public routes
router.get('/', tutorialController.getAllTutorials);
router.get('/category/:category', tutorialController.getTutorialsByCategory);
router.get('/stats', tutorialController.getCategoryStats);
router.get('/:slug', tutorialController.getTutorialBySlug);

// Admin routes (protected)
router.post('/', auth, tutorialController.createTutorial);
router.put('/:id', auth, tutorialController.updateTutorial);
router.delete('/:id', auth, tutorialController.deleteTutorial);

module.exports = router;
