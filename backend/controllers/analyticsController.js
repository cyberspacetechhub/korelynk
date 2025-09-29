const Blog = require('../models/Blog');
const CodeSample = require('../models/CodeSample');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');
const Project = require('../models/Project');

const getDashboardAnalytics = async (req, res) => {
  try {
    // console.log('Analytics endpoint hit');
    const currentYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();

    // Fetch all data
    const [blogs, codeSamples, contacts, newsletters, projects] = await Promise.all([
      Blog.find().select('createdAt views category'),
      CodeSample.find().select('createdAt views likes category language comments'),
      Contact.find().select('createdAt name email status').sort({ createdAt: -1 }).limit(5),
      Newsletter.find().select('createdAt'),
      Project.find().select('createdAt')
    ]);

    // console.log('Projects found:', projects.length);

    // Calculate totals
    const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0) + 
                      codeSamples.reduce((sum, c) => sum + (c.views || 0), 0);
    const totalLikes = codeSamples.reduce((sum, c) => sum + (c.likes || 0), 0);
    const totalComments = codeSamples.reduce((sum, c) => sum + (c.comments?.length || 0), 0);

    // Calculate growth rate
    const recentContent = [...blogs, ...codeSamples, ...projects].filter(item => 
      new Date(item.createdAt).getMonth() === thisMonth
    );
    const growthRate = Math.min(Math.round((recentContent.length / Math.max([...blogs, ...codeSamples, ...projects].length, 1)) * 100), 100);

    // Generate monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map((month, index) => {
      const blogCount = blogs.filter(blog => 
        new Date(blog.createdAt).getMonth() === index && 
        new Date(blog.createdAt).getFullYear() === currentYear
      ).length;
      
      const codeCount = codeSamples.filter(code => 
        new Date(code.createdAt).getMonth() === index && 
        new Date(code.createdAt).getFullYear() === currentYear
      ).length;
      
      const projectCount = projects.filter(project => 
        new Date(project.createdAt).getMonth() === index && 
        new Date(project.createdAt).getFullYear() === currentYear
      ).length;
      
      return { month, blogs: blogCount, codeSamples: codeCount, projects: projectCount };
    });

    // Generate category data
    const categories = {};
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];
    
    codeSamples.forEach(sample => {
      const category = sample.category || sample.language || 'Others';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    const categoryData = Object.entries(categories)
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    // Performance data
    const performanceData = [
      { metric: 'Blogs', current: blogs.length, target: 50 },
      { metric: 'Projects', current: projects.length, target: 30 },
      { metric: 'Code Samples', current: codeSamples.length, target: 80 },
      { metric: 'Feedback', current: totalLikes, target: 100 }
    ];

    // console.log('Analytics data:', {
    //   blogs: blogs.length,
    //   codeSamples: codeSamples.length,
    //   projects: projects.length,
    //   contacts: contacts.length
    // });

    res.json({
      success: true,
      data: {
        stats: {
          contacts: contacts.length,
          newsletter: newsletters.length,
          projects: projects.length,
          blogs: blogs.length,
          codeSamples: codeSamples.length,
          totalViews,
          totalLikes,
          totalComments,
          growthRate,
          recentContacts: contacts
        },
        charts: {
          monthlyData,
          categoryData,
          performanceData
        }
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics data'
    });
  }
};

module.exports = { getDashboardAnalytics };