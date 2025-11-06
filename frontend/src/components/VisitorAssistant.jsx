import { useState, useEffect } from 'react'
import { X, ArrowRight, MessageCircle, Code, Briefcase, GraduationCap } from 'lucide-react'

const VisitorAssistant = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [userBehavior, setUserBehavior] = useState({
    timeOnSite: 0,
    scrollDepth: 0,
    pageViews: 0,
    inactiveTime: 0
  })

  const suggestions = [
    {
      icon: Code,
      title: "Web Development Services",
      description: "Custom websites and web applications",
      link: "/services",
      color: "bg-blue-500"
    },
    {
      icon: Briefcase,
      title: "View Our Portfolio",
      description: "See our latest projects and case studies",
      link: "/portfolio",
      color: "bg-green-500"
    },
    {
      icon: GraduationCap,
      title: "Tech Courses",
      description: "Learn programming and development skills",
      link: "/courses",
      color: "bg-purple-500"
    },
    {
      icon: MessageCircle,
      title: "Get In Touch",
      description: "Discuss your project requirements",
      link: "/contact",
      color: "bg-orange-500"
    }
  ]

  useEffect(() => {
    let startTime = Date.now()
    let inactivityTimer
    let scrollTimer
    
    // Track time on site
    const timeTracker = setInterval(() => {
      setUserBehavior(prev => ({
        ...prev,
        timeOnSite: Math.floor((Date.now() - startTime) / 1000)
      }))
    }, 1000)

    // Track scroll behavior
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.floor((scrollTop / docHeight) * 100)
      
      setUserBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
      }))

      // Reset inactivity timer on scroll
      clearTimeout(inactivityTimer)
      setUserBehavior(prev => ({ ...prev, inactiveTime: 0 }))
      
      inactivityTimer = setTimeout(() => {
        setUserBehavior(prev => ({
          ...prev,
          inactiveTime: prev.inactiveTime + 1
        }))
      }, 5000)
    }

    // Track mouse movement and clicks
    const handleActivity = () => {
      clearTimeout(inactivityTimer)
      setUserBehavior(prev => ({ ...prev, inactiveTime: 0 }))
      
      inactivityTimer = setTimeout(() => {
        setUserBehavior(prev => ({
          ...prev,
          inactiveTime: prev.inactiveTime + 1
        }))
      }, 5000)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('click', handleActivity)
    window.addEventListener('keypress', handleActivity)

    return () => {
      clearInterval(timeTracker)
      clearTimeout(inactivityTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('keypress', handleActivity)
    }
  }, [])

  useEffect(() => {
    // Show popup if user seems confused (multiple indicators)
    const shouldShowPopup = (
      userBehavior.timeOnSite > 30 && // More than 30 seconds on site
      userBehavior.scrollDepth < 20 && // Haven't scrolled much
      userBehavior.inactiveTime > 2 // Been inactive for a while
    ) || (
      userBehavior.timeOnSite > 60 && // More than 1 minute
      userBehavior.scrollDepth < 50 // Haven't explored much
    )

    if (shouldShowPopup && !showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 2000) // Small delay before showing

      return () => clearTimeout(timer)
    }
  }, [userBehavior, showPopup])

  const handleSuggestionClick = (link) => {
    setShowPopup(false)
    window.location.href = link
  }

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform animate-pulse">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                👋 Need help finding something?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Here are some popular options to get you started
              </p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="p-6 space-y-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.link)}
              className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className={`p-2 rounded-lg ${suggestion.color} text-white mr-3`}>
                <suggestion.icon size={16} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-700">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {suggestion.description}
                </p>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-3">
              Still can't find what you're looking for?
            </p>
            <button
              onClick={() => {
                setShowPopup(false)
                // Trigger chat widget
                const chatButton = document.querySelector('[data-chat-trigger]')
                if (chatButton) chatButton.click()
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle size={16} />
              <span>Chat with us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitorAssistant