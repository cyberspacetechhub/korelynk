const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/:id/comments', blogController.addComment);

// Admin routes
router.get('/admin/all', adminAuth, blogController.getAllBlogsAdmin);
router.get('/admin/:id', adminAuth, blogController.getBlogById);
router.post('/admin', adminAuth, blogController.createBlog);
router.put('/admin/:id', adminAuth, blogController.updateBlog);
router.delete('/admin/:id', adminAuth, blogController.deleteBlog);

module.exports = router;