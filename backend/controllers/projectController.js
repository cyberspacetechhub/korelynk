const projectService = require('../services/projectService')
const uploadService = require('../services/uploadService')
const APIResponse = require('../utils/APIResponse')

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const { category, featured } = req.query
    let filter = {}
    
    if (category && category !== 'all') {
      filter.category = category
    }
    
    if (featured === 'true') {
      filter.featured = true
    }
    
    const projects = await projectService.getAllProjects(filter)
    APIResponse.success(res, projects, 'Projects retrieved successfully')
  } catch (error) {
    console.error('Error fetching projects:', error)
    APIResponse.error(res, 'Failed to fetch projects', 500, 'FETCH_ERROR')
  }
}

// Get single project
const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id)
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }
    APIResponse.success(res, project, 'Project retrieved successfully')
  } catch (error) {
    console.error('Error fetching project:', error)
    APIResponse.error(res, 'Failed to fetch project', 500, 'FETCH_ERROR')
  }
}

// Create project
const createProject = async (req, res) => {
  try {
    let projectData = req.body
    
    // Handle image upload
    if (req.file) {
      projectData.image = req.file.path
    }
    
    const project = await projectService.createProject(projectData)
    APIResponse.success(res, project, 'Project created successfully')
  } catch (error) {
    console.error('Error creating project:', error)
    APIResponse.error(res, 'Failed to create project', 500, 'CREATE_ERROR')
  }
}

// Update project
const updateProject = async (req, res) => {
  try {
    let updateData = req.body
    
    // Handle image upload
    if (req.file) {
      const existingProject = await projectService.getProjectById(req.params.id)
      
      // Delete old image if exists
      if (existingProject && existingProject.image) {
        const publicId = uploadService.extractPublicId(existingProject.image)
        try {
          await uploadService.deleteImage(publicId)
        } catch (error) {
          console.log('Failed to delete old image:', error.message)
        }
      }
      
      updateData.image = req.file.path
    }
    
    const project = await projectService.updateProject(req.params.id, updateData)
    
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }
    
    APIResponse.success(res, project, 'Project updated successfully')
  } catch (error) {
    console.error('Error updating project:', error)
    APIResponse.error(res, 'Failed to update project', 500, 'UPDATE_ERROR')
  }
}

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id)
    
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }
    
    // Delete image if exists
    if (project.image) {
      const publicId = uploadService.extractPublicId(project.image)
      try {
        await uploadService.deleteImage(publicId)
      } catch (error) {
        console.log('Failed to delete image:', error.message)
      }
    }
    
    await projectService.deleteProject(req.params.id)
    APIResponse.success(res, null, 'Project deleted successfully')
  } catch (error) {
    console.error('Error deleting project:', error)
    APIResponse.error(res, 'Failed to delete project', 500, 'DELETE_ERROR')
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}