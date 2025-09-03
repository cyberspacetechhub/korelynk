const Project = require('../models/Project')

class ProjectService {
  async getAllProjects(filter = {}) {
    return await Project.find(filter).sort({ createdAt: -1 })
  }

  async getProjectById(id) {
    return await Project.findById(id)
  }

  async createProject(projectData) {
    const project = new Project(projectData)
    return await project.save()
  }

  async updateProject(id, updateData) {
    return await Project.findByIdAndUpdate(id, updateData, { new: true })
  }

  async deleteProject(id) {
    return await Project.findByIdAndDelete(id)
  }

  async getFeaturedProjects() {
    return await Project.find({ featured: true }).sort({ createdAt: -1 })
  }

  async getProjectsByCategory(category) {
    return await Project.find({ category }).sort({ createdAt: -1 })
  }
}

module.exports = new ProjectService()