const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const APIResponse = require('../utils/APIResponse');
const { adminAuth } = require('../middleware/auth');

// Get all categories (public)
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({ name: 1 });
        APIResponse.success(res, categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        APIResponse.error(res, 'Failed to fetch categories', 500);
    }
});

// Create category (admin)
router.post('/', adminAuth, async (req, res) => {
    try {
        const { name, description, color } = req.body;
        const slug = name.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
        
        const category = new Category({ name, slug, description, color });
        await category.save();
        
        APIResponse.success(res, category, 'Category created successfully', 201);
    } catch (error) {
        console.error('Error creating category:', error);
        if (error.code === 11000) {
            APIResponse.error(res, 'Category name already exists', 400);
        } else {
            APIResponse.error(res, error.message || 'Failed to create category', 500);
        }
    }
});

// Update category (admin)
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!category) {
            return APIResponse.error(res, 'Category not found', 404);
        }
        
        APIResponse.success(res, category, 'Category updated successfully');
    } catch (error) {
        console.error('Error updating category:', error);
        APIResponse.error(res, 'Failed to update category', 500);
    }
});

// Delete category (admin)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        
        if (!category) {
            return APIResponse.error(res, 'Category not found', 404);
        }
        
        APIResponse.success(res, null, 'Category deleted successfully');
    } catch (error) {
        console.error('Error deleting category:', error);
        APIResponse.error(res, 'Failed to delete category', 500);
    }
});

module.exports = router;