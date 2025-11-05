const chatService = require('../services/chatService')
const visitorService = require('../services/visitorService')

const setupChatSocket = (io) => {
  const chatNamespace = io.of('/chat')
  
  chatNamespace.on('connection', (socket) => {
    
    // Join visitor to their session room
    socket.on('join-session', async (data) => {
      const { sessionId, userType, userId } = data
      
      socket.join(sessionId)
      socket.sessionId = sessionId
      socket.userType = userType
      socket.userId = userId
      

      
      // Notify admin if visitor joins
      if (userType === 'visitor') {
        socket.to(sessionId).emit('visitor-joined', {
          sessionId,
          timestamp: new Date()
        })
      }
    })
    
    // Handle new message
    socket.on('send-message', async (data) => {
      try {
        const { sessionId, messageType, content, senderInfo } = data
        
        const message = await chatService.sendMessage(
          sessionId,
          socket.userType,
          senderInfo,
          messageType,
          content
        )
        
        // Broadcast message to all users in session
        chatNamespace.to(sessionId).emit('new-message', {
          message,
          timestamp: new Date()
        })
        
        // Send confirmation back to sender
        socket.emit('message-confirmed', {
          sessionId,
          messageId: message._id,
          timestamp: new Date()
        })
        
        // Notify admins of new visitor message
        if (socket.userType === 'visitor') {
          socket.broadcast.emit('new-visitor-message', {
            sessionId,
            message,
            timestamp: new Date()
          })
        }
        
      } catch (error) {
        socket.emit('message-error', { error: error.message })
      }
    })
    
    // Handle typing indicators
    socket.on('typing-start', (data) => {
      socket.to(data.sessionId).emit('user-typing', {
        userType: socket.userType,
        senderInfo: data.senderInfo
      })
    })
    
    socket.on('typing-stop', (data) => {
      socket.to(data.sessionId).emit('user-stopped-typing', {
        userType: socket.userType
      })
    })
    
    // Handle message read status
    socket.on('mark-messages-read', async (data) => {
      try {
        await chatService.markMessagesAsRead(data.sessionId, socket.userType)
        socket.to(data.sessionId).emit('messages-read', {
          readBy: socket.userType,
          timestamp: new Date()
        })
      } catch (error) {
        console.error('Error marking messages as read:', error)
      }
    })
    
    // Handle admin assignment
    socket.on('assign-admin', async (data) => {
      try {
        const { sessionId, adminId } = data
        const session = await chatService.assignAdminToSession(sessionId, adminId)
        
        chatNamespace.to(sessionId).emit('admin-assigned', {
          session,
          timestamp: new Date()
        })
        
      } catch (error) {
        socket.emit('assignment-error', { error: error.message })
      }
    })
    
    // Handle session close
    socket.on('close-session', async (data) => {
      try {
        const { sessionId } = data
        const session = await chatService.closeSession(sessionId, socket.userId)
        
        chatNamespace.to(sessionId).emit('session-closed', {
          session,
          timestamp: new Date()
        })
        
      } catch (error) {
        socket.emit('close-error', { error: error.message })
      }
    })
    
    // Handle disconnect
    socket.on('disconnect', () => {
      
      if (socket.sessionId && socket.userType === 'visitor') {
        socket.to(socket.sessionId).emit('visitor-left', {
          sessionId: socket.sessionId,
          timestamp: new Date()
        })
      }
    })
  })
  
  return chatNamespace
}

module.exports = setupChatSocket