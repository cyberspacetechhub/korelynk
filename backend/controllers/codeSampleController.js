const codeSampleService = require('../services/codeSampleService');
const APIResponse = require('../utils/APIResponse');

// Get all published code samples
const getAllCodeSamples = async (req, res) => {
    try {
        const { page, limit, language, difficulty, tags } = req.query;
        const result = await codeSampleService.getAllCodeSamples(
            { language, difficulty, tags },
            { page, limit }
        );
        APIResponse.success(res, result);
    } catch (error) {
        console.error('Error fetching code samples:', error);
        APIResponse.error(res, 'Failed to fetch code samples', 500);
    }
};

// Get single code sample by slug
const getCodeSampleBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const codeSample = await codeSampleService.getCodeSampleBySlug(slug);
        
        if (!codeSample) {
            return APIResponse.error(res, 'Code sample not found', 404);
        }

        APIResponse.success(res, codeSample);
    } catch (error) {
        console.error('Error fetching code sample:', error);
        APIResponse.error(res, 'Failed to fetch code sample', 500);
    }
};

// Create new code sample (admin)
const createCodeSample = async (req, res) => {
    try {
        const codeSample = await codeSampleService.createCodeSample(req.body, req.user._id);
        APIResponse.success(res, codeSample, 'Code sample created successfully', 201);
    } catch (error) {
        console.error('Error creating code sample:', error);
        APIResponse.error(res, 'Failed to create code sample', 500);
    }
};

// Update code sample (admin)
const updateCodeSample = async (req, res) => {
    try {
        const codeSample = await codeSampleService.updateCodeSample(req.params.id, req.body);
        
        if (!codeSample) {
            return APIResponse.error(res, 'Code sample not found', 404);
        }

        APIResponse.success(res, codeSample, 'Code sample updated successfully');
    } catch (error) {
        console.error('Error updating code sample:', error);
        APIResponse.error(res, 'Failed to update code sample', 500);
    }
};

// Delete code sample (admin)
const deleteCodeSample = async (req, res) => {
    try {
        const result = await codeSampleService.deleteCodeSample(req.params.id);
        
        if (!result) {
            return APIResponse.error(res, 'Code sample not found', 404);
        }

        APIResponse.success(res, null, 'Code sample deleted successfully');
    } catch (error) {
        console.error('Error deleting code sample:', error);
        APIResponse.error(res, 'Failed to delete code sample', 500);
    }
};

// Add comment
const addComment = async (req, res) => {
    try {
        const comment = await codeSampleService.addComment(req.params.id, req.body);
        
        if (!comment) {
            return APIResponse.error(res, 'Code sample not found', 404);
        }

        APIResponse.success(res, comment, 'Comment added successfully');
    } catch (error) {
        console.error('Error adding comment:', error);
        APIResponse.error(res, 'Failed to add comment', 500);
    }
};

// Add reply to comment
const addReply = async (req, res) => {
    try {
        const reply = await codeSampleService.addReply(req.params.id, req.params.commentId, req.body);
        
        if (!reply) {
            return APIResponse.error(res, 'Code sample or comment not found', 404);
        }

        APIResponse.success(res, reply, 'Reply added successfully');
    } catch (error) {
        console.error('Error adding reply:', error);
        APIResponse.error(res, 'Failed to add reply', 500);
    }
};

// Toggle like
const toggleLike = async (req, res) => {
    try {
        const codeSample = await codeSampleService.toggleLike(req.params.id);
        
        if (!codeSample) {
            return APIResponse.error(res, 'Code sample not found', 404);
        }

        APIResponse.success(res, { likes: codeSample.likes }, 'Like toggled successfully');
    } catch (error) {
        console.error('Error toggling like:', error);
        APIResponse.error(res, 'Failed to toggle like', 500);
    }
};

// Get admin code samples
const getAllCodeSamplesAdmin = async (req, res) => {
    try {
        const { page, limit, status, language } = req.query;
        const result = await codeSampleService.getAllCodeSamplesAdmin(
            { status, language },
            { page, limit }
        );
        APIResponse.success(res, result);
    } catch (error) {
        console.error('Error fetching admin code samples:', error);
        APIResponse.error(res, 'Failed to fetch code samples', 500);
    }
};

// Get single code sample by ID (admin)
const getCodeSampleById = async (req, res) => {
    try {
        const codeSample = await codeSampleService.getCodeSampleById(req.params.id);
        
        if (!codeSample) {
            return APIResponse.error(res, 'Code sample not found', 404);
        }

        APIResponse.success(res, codeSample);
    } catch (error) {
        console.error('Error fetching code sample:', error);
        APIResponse.error(res, 'Failed to fetch code sample', 500);
    }
};

module.exports = {
    getAllCodeSamples,
    getAllCodeSamplesAdmin,
    getCodeSampleBySlug,
    getCodeSampleById,
    createCodeSample,
    updateCodeSample,
    deleteCodeSample,
    addComment,
    addReply,
    toggleLike
};