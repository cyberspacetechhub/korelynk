import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Users, Clock, Send, X } from 'lucide-react'
import { io } from 'socket.io-client'
import { useAuth } from '../../context/AuthContext'
import baseUrl from '../../config/baseUrl'

const AdminChat = () => {
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [activeSession, setActiveSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [visitors, setVisitors] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadData()
    connectSocket()
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadData = async () => {
    try {
      const [sessionsRes, visitorsRes, unreadRes] = await Promise.all([
        fetch(`${baseUrl}chat/admin/sessions`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        }),
        fetch(`${baseUrl}chat/admin/visitors`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        }),
        fetch(`${baseUrl}chat/admin/unread-count`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        })
      ])

      const sessionsData = await sessionsRes.json()
      const visitorsData = await visitorsRes.json()
      const unreadData = await unreadRes.json()

      setSessions(sessionsData.data || [])
      setVisitors(visitorsData.data || [])
      setUnreadCount(unreadData.data?.count || 0)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const connectSocket = () => {
    socketRef.current = io(baseUrl.replace('/api/', '') + '/chat')
    
    socketRef.current.on('connect', () => {
      // Connected to chat
    })
    
    socketRef.current.on('new-visitor-message', (data) => {
      // Update sessions list and unread count
      loadData()
      
      // If message is for active session, add to messages
      if (activeSession && data.sessionId === activeSession._id) {
        setMessages(prev => [...prev, data.message])
      }
    })
    
    socketRef.current.on('new-message', (data) => {
      // Always add message to active session if it matches
      if (activeSession && data.message.session === activeSession._id) {
        setMessages(prev => [...prev, data.message])
      }
      // Update sessions list to reflect new message
      loadData()
    })
    
    // Listen for own messages confirmation
    socketRef.current.on('message-confirmed', (data) => {
      if (activeSession && data.sessionId === activeSession._id) {
        // Message already added via optimistic update
      }
    })
    
    socketRef.current.on('user-typing', (data) => {
      if (data.userType === 'visitor') {
        setIsTyping(true)
      }
    })
    
    socketRef.current.on('user-stopped-typing', () => {
      setIsTyping(false)
    })
  }

  const selectSession = async (session) => {
    setActiveSession(session)
    
    // Load messages for this session
    try {
      const response = await fetch(`${baseUrl}chat/session/${session._id}/messages`)
      const data = await response.json()
      setMessages(data.data.reverse())
      
      // Join socket room
      socketRef.current.emit('join-session', {
        sessionId: session._id,
        userType: 'admin',
        userId: user.id
      })
      
      // Assign admin if not assigned
      if (!session.assignedAdmin) {
        await assignAdmin(session._id)
      }
      
      // Mark messages as read
      socketRef.current.emit('mark-messages-read', {
        sessionId: session._id
      })
      
    } catch (error) {
      console.error('Error loading session:', error)
    }
  }

  const assignAdmin = async (sessionId) => {
    try {
      await fetch(`${baseUrl}chat/admin/session/${sessionId}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ adminId: user.id })
      })
      
      loadData() // Refresh sessions
    } catch (error) {
      console.error('Error assigning admin:', error)
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !activeSession || !socketRef.current) return
    
    const messageData = {
      sessionId: activeSession._id,
      messageType: 'text',
      content: { text: newMessage },
      senderInfo: {
        name: user.fullName,
        id: user.id
      }
    }
    
    // Optimistic update - add message immediately
    const optimisticMessage = {
      _id: Date.now(),
      session: activeSession._id,
      sender: 'admin',
      messageType: 'text',
      content: { text: newMessage },
      senderInfo: { name: user.fullName, id: user.id },
      createdAt: new Date()
    }
    setMessages(prev => [...prev, optimisticMessage])
    
    socketRef.current.emit('send-message', messageData)
    setNewMessage('')
  }

  const closeSession = async (sessionId) => {
    try {
      await fetch(`${baseUrl}chat/admin/session/${sessionId}/close`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      
      if (activeSession && activeSession._id === sessionId) {
        setActiveSession(null)
        setMessages([])
      }
      
      loadData()
    } catch (error) {
      console.error('Error closing session:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Chat Support</h2>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            </div>
          </div>
        </div>

        {/* Active Visitors */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Active Visitors</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1" />
            {visitors.length} online
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {sessions.map((session) => (
            <div
              key={session._id}
              onClick={() => selectSession(session)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                activeSession?._id === session._id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{session.visitorName}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                  {session.visitorEmail && (
                    <p className="text-sm text-blue-600 mt-1">{session.visitorEmail}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    {session.visitor?.location?.city}, {session.visitor?.location?.country}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock size={12} className="mr-1" />
                    {formatTime(session.lastMessageAt)}
                  </div>
                </div>
                {session.status === 'waiting' && (
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
          
          {sessions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No active chat sessions</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{activeSession.visitorName}</h3>
                  <p className="text-sm text-gray-600">
                    {activeSession.visitor?.device} • {activeSession.visitor?.browser}
                  </p>
                </div>
                <button
                  onClick={() => closeSession(activeSession._id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'admin'
                        ? 'bg-blue-600 text-white'
                        : message.messageType === 'system'
                        ? 'bg-gray-100 text-gray-600 text-center'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.content.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Select a chat session to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminChat