const express = require('express');
const router = express.Router();
const codeSampleController = require('../controllers/codeSampleController');
const { adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', codeSampleController.getAllCodeSamples);
router.get('/:slug', codeSampleController.getCodeSampleBySlug);
router.post('/:id/like', codeSampleController.toggleLike);
router.post('/:id/comments', codeSampleController.addComment);
router.post('/:id/comments/:commentId/replies', codeSampleController.addReply);

// Admin routes
router.get('/admin/all', adminAuth, codeSampleController.getAllCodeSamplesAdmin);
router.get('/admin/:id', adminAuth, codeSampleController.getCodeSampleById);
router.post('/admin', adminAuth, codeSampleController.createCodeSample);
router.put('/admin/:id', adminAuth, codeSampleController.updateCodeSample);
router.delete('/admin/:id', adminAuth, codeSampleController.deleteCodeSample);

module.exports = router;