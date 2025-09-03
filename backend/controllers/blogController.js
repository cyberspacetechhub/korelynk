const blogService = require('../services/blogService');
const APIResponse = require('../utils/APIResponse');

// Get all published blogs
const getAllBlogs = async (req, res) => {
    try {
        const { page, limit, category, tags, search } = req.query;
        const result = await blogService.getAllBlogs(
            { category, tags, search },
            { page, limit }
        );
        APIResponse.success(res, result);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        APIResponse.error(res, 'Failed to fetch blogs', 500);
    }
};

// Get single blog by slug
const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await blogService.getBlogBySlug(slug);
        
        if (!blog) {
            return APIResponse.error(res, 'Blog not found', 404);
        }

        APIResponse.success(res, blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        APIResponse.error(res, 'Failed to fetch blog', 500);
    }
};

// Create new blog (admin)
const createBlog = async (req, res) => {
    try {
        const blog = await blogService.createBlog(req.body, req.user._id);
        APIResponse.success(res, blog, 'Blog created successfully', 201);
    } catch (error) {
        console.error('Error creating blog:', error);
        APIResponse.error(res, 'Failed to create blog', 500);
    }
};

// Update blog (admin)
const updateBlog = async (req, res) => {
    try {
        const blog = await blogService.updateBlog(req.params.id, req.body);
        
        if (!blog) {
            return APIResponse.error(res, 'Blog not found', 404);
        }

        APIResponse.success(res, blog, 'Blog updated successfully');
    } catch (error) {
        console.error('Error updating blog:', error);
        APIResponse.error(res, 'Failed to update blog', 500);
    }
};

// Delete blog (admin)
const deleteBlog = async (req, res) => {
    try {
        const result = await blogService.deleteBlog(req.params.id);
        
        if (!result) {
            return APIResponse.error(res, 'Blog not found', 404);
        }

        APIResponse.success(res, null, 'Blog deleted successfully');
    } catch (error) {
        console.error('Error deleting blog:', error);
        APIResponse.error(res, 'Failed to delete blog', 500);
    }
};

// Add comment
const addComment = async (req, res) => {
    try {
        const comment = await blogService.addComment(req.params.id, req.body);
        
        if (!comment) {
            return APIResponse.error(res, 'Blog not found', 404);
        }

        APIResponse.success(res, comment, 'Comment added successfully');
    } catch (error) {
        console.error('Error adding comment:', error);
        APIResponse.error(res, 'Failed to add comment', 500);
    }
};

// Get admin blogs
const getAllBlogsAdmin = async (req, res) => {
    try {
        const { page, limit, status } = req.query;
        const result = await blogService.getAllBlogsAdmin(
            { status },
            { page, limit }
        );
        APIResponse.success(res, result);
    } catch (error) {
        console.error('Error fetching admin blogs:', error);
        APIResponse.error(res, 'Failed to fetch blogs', 500);
    }
};

// Get single blog by ID (admin)
const getBlogById = async (req, res) => {
    try {
        const blog = await blogService.getBlogById(req.params.id);
        
        if (!blog) {
            return APIResponse.error(res, 'Blog not found', 404);
        }

        APIResponse.success(res, blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        APIResponse.error(res, 'Failed to fetch blog', 500);
    }
};

module.exports = {
    getAllBlogs,
    getAllBlogsAdmin,
    getBlogBySlug,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment
};