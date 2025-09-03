class ServicesService {
  getServices() {
    return [
      {
        id: 1,
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies",
        icon: "globe",
        features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "Cross-browser Compatibility"],
        technologies: ["React", "Next.js", "Vue.js", "Angular"],
        startingPrice: 2999
      },
      {
        id: 2,
        title: "Mobile Development",
        description: "Native and cross-platform mobile applications for iOS and Android",
        icon: "smartphone",
        features: ["Native Performance", "App Store Optimization", "Push Notifications", "Offline Functionality"],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
        startingPrice: 4999
      },
      {
        id: 3,
        title: "Backend Development",
        description: "Scalable server-side solutions and API development",
        icon: "database",
        features: ["RESTful APIs", "Database Design", "Authentication", "Real-time Features"],
        technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
        startingPrice: 3999
      },
      {
        id: 4,
        title: "Cloud Solutions",
        description: "Cloud deployment, hosting, and infrastructure management",
        icon: "cloud",
        features: ["Auto Scaling", "Load Balancing", "Monitoring", "Backup Solutions"],
        technologies: ["AWS", "Google Cloud", "Azure", "Docker"],
        startingPrice: 1999
      }
    ]
  }
}

module.exports = new ServicesService()