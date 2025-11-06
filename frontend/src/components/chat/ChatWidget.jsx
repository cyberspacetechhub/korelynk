import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Mic, MicOff, Maximize2, Minimize2 } from 'lucide-react'
import { io } from 'socket.io-client'
import baseUrl from '../../config/baseUrl'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [visitorInfo, setVisitorInfo] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [showInfoForm, setShowInfoForm] = useState(false)
  const [visitorName, setVisitorName] = useState('')
  const [visitorEmail, setVisitorEmail] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    if (isOpen && !socketRef.current) {
      initializeChat()
    }
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeChat = async () => {
    try {
      // Check if visitor has recent session (within 24 hours)
      const recentCheckResponse = await fetch(`${baseUrl}chat/visitor/check-recent`)
      const recentCheck = await recentCheckResponse.json()
      
      // Track visitor
      const visitorResponse = await fetch(`${baseUrl}chat/visitor/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: window.location.pathname,
          referrer: document.referrer
        })
      })
      
      const visitor = await visitorResponse.json()
      setVisitorInfo(visitor.data)
      
      // Create or get chat session
      let session
      const existingSessionResponse = await fetch(`${baseUrl}chat/session/visitor/${visitor.data._id}`)
      const existingSession = await existingSessionResponse.json()
      
      if (existingSession.data) {
        session = existingSession.data
        // Set visitor name from existing session
        if (session.visitorName && session.visitorName !== 'Anonymous Visitor') {
          setVisitorName(session.visitorName)
        }
        if (session.visitorEmail) {
          setVisitorEmail(session.visitorEmail)
        }
      } else if (recentCheck.data?.hasRecentSession) {
        // Skip form for recent visitors, use previous session data
        const recentSession = recentCheck.data.session
        const newSessionResponse = await fetch(`${baseUrl}chat/session/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId: visitor.data._id,
            visitorName: recentSession.visitorName || 'Returning Visitor',
            visitorEmail: recentSession.visitorEmail
          })
        })
        session = (await newSessionResponse.json()).data
      } else {
        // Show info form for new visitors
        setShowInfoForm(true)
        return
      }
      
      setSessionId(session._id)
      
      // Load existing messages
      const messagesResponse = await fetch(`${baseUrl}chat/session/${session._id}/messages`)
      const messagesData = await messagesResponse.json()
      setMessages(messagesData.data.reverse())
      
      // Connect to socket
      connectSocket(session._id, visitor.data._id)
      
    } catch (error) {
      console.error('Error initializing chat:', error)
    }
  }

  const handleInfoSubmit = async (e) => {
    e.preventDefault()
    if (!visitorName.trim()) return
    
    try {
      const newSessionResponse = await fetch(`${baseUrl}chat/session/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: visitorInfo._id,
          visitorName: visitorName || 'Anonymous Visitor',
          visitorEmail: visitorEmail
        })
      })
      const session = (await newSessionResponse.json()).data
      setSessionId(session._id)
      
      // Load existing messages
      const messagesResponse = await fetch(`${baseUrl}chat/session/${session._id}/messages`)
      const messagesData = await messagesResponse.json()
      setMessages(messagesData.data.reverse())
      
      // Connect to socket
      connectSocket(session._id, visitorInfo._id)
      
      setShowInfoForm(false)
    } catch (error) {
      console.error('Error creating session:', error)
    }
  }

  const connectSocket = (sessionId, visitorId) => {
    socketRef.current = io(baseUrl.replace('/api/', '') + '/chat')
    
    socketRef.current.on('connect', () => {
      setIsConnected(true)
      socketRef.current.emit('join-session', {
        sessionId,
        userType: 'visitor',
        userId: visitorId
      })
    })
    
    socketRef.current.on('disconnect', () => {
      setIsConnected(false)
    })
    
    socketRef.current.on('new-message', (data) => {
      setMessages(prev => [...prev, data.message])
    })
    
    socketRef.current.on('user-typing', (data) => {
      if (data.userType === 'admin') {
        setIsTyping(true)
      }
    })
    
    socketRef.current.on('user-stopped-typing', (data) => {
      if (data.userType === 'admin') {
        setIsTyping(false)
      }
    })
    
    socketRef.current.on('admin-assigned', (data) => {
      const systemMessage = {
        _id: Date.now(),
        messageType: 'system',
        content: { text: `${data.session.assignedAdmin.fullName} joined the chat` },
        createdAt: new Date()
      }
      setMessages(prev => [...prev, systemMessage])
    })
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current || !sessionId) return
    
    const messageData = {
      sessionId,
      messageType: 'text',
      content: { text: newMessage },
      senderInfo: {
        name: 'Visitor',
        id: visitorInfo?._id
      }
    }
    
    socketRef.current.emit('send-message', messageData)
    setNewMessage('')
    
    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    socketRef.current.emit('typing-stop', { sessionId })
  }

  const handleTyping = (e) => {
    setNewMessage(e.target.value)
    
    if (!socketRef.current || !sessionId) return
    
    // Start typing indicator
    socketRef.current.emit('typing-start', {
      sessionId,
      senderInfo: { name: 'Visitor' }
    })
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('typing-stop', { sessionId })
    }, 2000)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          data-chat-trigger
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ${
          isExpanded 
            ? 'fixed inset-4 z-50 w-auto h-auto' 
            : 'w-80 h-96'
        }`}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Chat Support</h3>
              <p className="text-xs opacity-90">
                {isConnected ? 'Connected' : 'Connecting...'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-blue-700 p-1 rounded"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-1 rounded"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages or Info Form */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {showInfoForm ? (
              <form onSubmit={handleInfoSubmit} className="space-y-4">
                <div className="text-center text-gray-700 text-sm mb-4">
                  <p>👋 Welcome! Please tell us a bit about yourself to get started.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                  <input
                    type="email"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Chat
                </button>
              </form>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm">
                    <p>👋 Welcome! How can we help you today?</p>
                  </div>
                )}
            
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'visitor'
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
                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {!showInfoForm && (
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleTyping}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              
              {/* Powered by KoreLynk */}
              <div className="text-center mt-2">
                <p className="text-xs text-gray-400">
                  Powered by <span className="font-semibold text-blue-600">KoreLynk Tech</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatWidget