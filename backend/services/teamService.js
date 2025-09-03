const Team = require('../models/Team')

class TeamService {
  async getAllTeamMembers() {
    return await Team.find({ isActive: true }).sort({ order: 1, createdAt: -1 })
  }

  async getTeamMemberById(id) {
    return await Team.findById(id)
  }

  async createTeamMember(memberData) {
    const member = new Team(memberData)
    return await member.save()
  }

  async updateTeamMember(id, updateData) {
    return await Team.findByIdAndUpdate(id, updateData, { new: true })
  }

  async deleteTeamMember(id) {
    return await Team.findByIdAndDelete(id)
  }

  async updateMemberOrder(memberId, newOrder) {
    return await Team.findByIdAndUpdate(memberId, { order: newOrder }, { new: true })
  }
}

module.exports = new TeamService()