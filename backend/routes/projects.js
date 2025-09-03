const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const uploadService = require('../services/uploadService')

// GET /api/projects - Get all projects
router.get('/', projectController.getAllProjects)

// GET /api/projects/:id - Get single project
router.get('/:id', projectController.getProjectById)

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }
    APIResponse.success(res, project, 'Project retrieved successfully')
  } catch (error) {
    console.error('Error fetching project:', error)
    APIResponse.error(res, 'Failed to fetch project', 500, 'FETCH_ERROR')
  }
})

module.exports = router