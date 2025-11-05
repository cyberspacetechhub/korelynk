const ChatSession = require('../models/ChatSession')
const ChatMessage = require('../models/ChatMessage')
const Visitor = require('../models/Visitor')

class ChatService {
  async createChatSession(visitorId, visitorName = 'Anonymous', visitorEmail = null) {
    const session = new ChatSession({
      visitor: visitorId,
      visitorName,
      visitorEmail,
      status: 'waiting'
    })
    
    await session.save()
    return await session.populate('visitor')
  }
  
  async getChatSession(sessionId) {
    return await ChatSession.findById(sessionId)
      .populate('visitor')
      .populate('assignedAdmin', 'fullName email')
  }
  
  async getSessionByVisitor(visitorId) {
    // First try to find active/waiting session
    let session = await ChatSession.findOne({
      visitor: visitorId,
      status: { $in: ['active', 'waiting'] }
    }).populate('visitor')
    
    // If no active session, find recent session within 24 hours
    if (!session) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      session = await ChatSession.findOne({
        visitor: visitorId,
        updatedAt: { $gte: twentyFourHoursAgo }
      }).populate('visitor').sort({ updatedAt: -1 })
      
      // Reopen the session for continued conversation
      if (session) {
        session.status = 'waiting'
        session.closedAt = null
        session.closedBy = null
        await session.save()
      }
    }
    
    return session
  }

  async getRecentVisitorByIP(ipAddress) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return await ChatSession.findOne({
      'visitor.ipAddress': ipAddress,
      createdAt: { $gte: twentyFourHoursAgo }
    }).populate('visitor').sort({ createdAt: -1 })
  }
  
  async assignAdminToSession(sessionId, adminId) {
    return await ChatSession.findByIdAndUpdate(
      sessionId,
      {
        assignedAdmin: adminId,
        status: 'active'
      },
      { new: true }
    ).populate('assignedAdmin', 'fullName email')
  }
  
  async sendMessage(sessionId, sender, senderInfo, messageType, content) {
    const message = new ChatMessage({
      session: sessionId,
      sender,
      senderInfo,
      messageType,
      content
    })
    
    await message.save()
    
    // Update session last message time
    await ChatSession.findByIdAndUpdate(sessionId, {
      lastMessageAt: new Date()
    })
    
    return await message.populate('session')
  }
  
  async getSessionMessages(sessionId, limit = 50) {
    return await ChatMessage.find({ session: sessionId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('session')
  }
  
  async markMessagesAsRead(sessionId, sender) {
    await ChatMessage.updateMany(
      {
        session: sessionId,
        sender: { $ne: sender },
        isRead: false
      },
      {
        isRead: true,
        readAt: new Date()
      }
    )
  }
  
  async getActiveSessions() {
    return await ChatSession.find({
      status: { $in: ['active', 'waiting'] }
    })
    .populate('visitor')
    .populate('assignedAdmin', 'fullName email')
    .sort({ lastMessageAt: -1 })
  }

  async cleanupOldSessions() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    
    // Delete old closed sessions and their messages
    const oldSessions = await ChatSession.find({
      status: 'closed',
      updatedAt: { $lt: twentyFourHoursAgo }
    })
    
    for (const session of oldSessions) {
      await ChatMessage.deleteMany({ session: session._id })
      await ChatSession.findByIdAndDelete(session._id)
    }
    
    return oldSessions.length
  }
  
  async closeSession(sessionId, adminId) {
    return await ChatSession.findByIdAndUpdate(
      sessionId,
      {
        status: 'closed',
        closedAt: new Date(),
        closedBy: adminId
      },
      { new: true }
    )
  }
  
  async getUnreadCount(adminId) {
    const sessions = await ChatSession.find({
      $or: [
        { assignedAdmin: adminId },
        { status: 'waiting' }
      ]
    })
    
    let unreadCount = 0
    for (const session of sessions) {
      const count = await ChatMessage.countDocuments({
        session: session._id,
        sender: 'visitor',
        isRead: false
      })
      unreadCount += count
    }
    
    return unreadCount
  }
}

module.exports = new ChatService()