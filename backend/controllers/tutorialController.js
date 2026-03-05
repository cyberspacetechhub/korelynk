const tutorialService = require('../services/tutorialService');
const APIResponse = require('../utils/APIResponse');

const getAllTutorials = async (req, res) => {
  try {
    const { category } = req.query;
    const filters = {};
    
    if (category) filters.category = category;
    
    const tutorials = await tutorialService.getAllTutorials(filters);
    APIResponse.success(res, tutorials, 'Tutorials retrieved successfully');
  } catch (error) {
    console.error('Get tutorials error:', error);
    APIResponse.error(res, 'Failed to retrieve tutorials', 500, 'GET_TUTORIALS_ERROR');
  }
};

const getTutorialsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const tutorials = await tutorialService.getTutorialsByCategory(category);
    APIResponse.success(res, tutorials, 'Tutorials retrieved successfully');
  } catch (error) {
    console.error('Get tutorials by category error:', error);
    APIResponse.error(res, 'Failed to retrieve tutorials', 500, 'GET_TUTORIALS_ERROR');
  }
};

const getTutorialBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const tutorial = await tutorialService.getTutorialBySlug(slug);
    
    if (!tutorial) {
      return APIResponse.error(res, 'Tutorial not found', 404, 'TUTORIAL_NOT_FOUND');
    }
    
    APIResponse.success(res, tutorial, 'Tutorial retrieved successfully');
  } catch (error) {
    console.error('Get tutorial error:', error);
    APIResponse.error(res, 'Failed to retrieve tutorial', 500, 'GET_TUTORIAL_ERROR');
  }
};

const createTutorial = async (req, res) => {
  try {
    const tutorial = await tutorialService.createTutorial(req.body);
    APIResponse.success(res, tutorial, 'Tutorial created successfully', 201);
  } catch (error) {
    console.error('Create tutorial error:', error);
    APIResponse.error(res, 'Failed to create tutorial', 500, 'CREATE_TUTORIAL_ERROR');
  }
};

const updateTutorial = async (req, res) => {
  try {
    const tutorial = await tutorialService.updateTutorial(req.params.id, req.body);
    
    if (!tutorial) {
      return APIResponse.error(res, 'Tutorial not found', 404, 'TUTORIAL_NOT_FOUND');
    }
    
    APIResponse.success(res, tutorial, 'Tutorial updated successfully');
  } catch (error) {
    console.error('Update tutorial error:', error);
    APIResponse.error(res, 'Failed to update tutorial', 500, 'UPDATE_TUTORIAL_ERROR');
  }
};

const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await tutorialService.deleteTutorial(req.params.id);
    
    if (!tutorial) {
      return APIResponse.error(res, 'Tutorial not found', 404, 'TUTORIAL_NOT_FOUND');
    }
    
    APIResponse.success(res, null, 'Tutorial deleted successfully');
  } catch (error) {
    console.error('Delete tutorial error:', error);
    APIResponse.error(res, 'Failed to delete tutorial', 500, 'DELETE_TUTORIAL_ERROR');
  }
};

const getCategoryStats = async (req, res) => {
  try {
    const stats = await tutorialService.getCategoryStats();
    APIResponse.success(res, stats, 'Category stats retrieved successfully');
  } catch (error) {
    console.error('Get category stats error:', error);
    APIResponse.error(res, 'Failed to retrieve stats', 500, 'GET_STATS_ERROR');
  }
};

module.exports = {
  getAllTutorials,
  getTutorialsByCategory,
  getTutorialBySlug,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getCategoryStats
};
