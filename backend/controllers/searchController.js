const Blog = require('../models/Blog');
const Project = require('../models/Project');
const Team = require('../models/Team');
const APIResponse = require('../utils/APIResponse');

const globalSearch = async (req, res) => {
    try {
        const { q, type, limit = 10 } = req.query;
        
        if (!q || q.trim().length < 2) {
            return APIResponse.error(res, 'Search query must be at least 2 characters', 400);
        }

        const searchQuery = q.trim();
        const searchRegex = new RegExp(searchQuery, 'i');
        const results = {};

        // Search blogs
        if (!type || type === 'blog') {
            const blogs = await Blog.find({
                status: 'published',
                $or: [
                    { title: searchRegex },
                    { content: searchRegex },
                    { excerpt: searchRegex },
                    { tags: { $in: [searchRegex] } }
                ]
            })
            .populate('author', 'fullname')
            .populate('category', 'name color')
            .select('title excerpt slug featuredImage publishedAt views author category tags')
            .limit(parseInt(limit))
            .sort({ publishedAt: -1 });

            results.blogs = blogs.map(blog => ({
                ...blog.toObject(),
                type: 'blog',
                url: `/blog/${blog.slug}`
            }));
        }

        // Search projects
        if (!type || type === 'project') {
            const projects = await Project.find({
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                    { technologies: { $in: [searchRegex] } }
                ]
            })
            .select('title description image technologies createdAt')
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

            results.projects = projects.map(project => ({
                ...project.toObject(),
                type: 'project',
                url: `/portfolio`
            }));
        }

        // Search team members
        if (!type || type === 'team') {
            const teamMembers = await Team.find({
                $or: [
                    { name: searchRegex },
                    { role: searchRegex },
                    { bio: searchRegex },
                    { skills: { $in: [searchRegex] } }
                ]
            })
            .select('name role bio avatar skills')
            .limit(parseInt(limit))
            .sort({ order: 1 });

            results.team = teamMembers.map(member => ({
                ...member.toObject(),
                type: 'team',
                url: `/about`
            }));
        }

        // Calculate total results
        const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

        APIResponse.success(res, {
            query: searchQuery,
            totalResults,
            results
        });

    } catch (error) {
        console.error('Search error:', error);
        APIResponse.error(res, 'Search failed', 500);
    }
};

const searchSuggestions = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || q.trim().length < 2) {
            return APIResponse.success(res, { suggestions: [] });
        }

        const searchQuery = q.trim();
        const searchRegex = new RegExp(searchQuery, 'i');
        
        // Get blog titles and tags
        const blogs = await Blog.find({
            status: 'published',
            $or: [
                { title: searchRegex },
                { tags: { $in: [searchRegex] } }
            ]
        })
        .select('title tags')
        .limit(5);

        const suggestions = new Set();
        
        blogs.forEach(blog => {
            if (blog.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                suggestions.add(blog.title);
            }
            blog.tags.forEach(tag => {
                if (tag.toLowerCase().includes(searchQuery.toLowerCase())) {
                    suggestions.add(tag);
                }
            });
        });

        // Add common tech terms if they match
        const techTerms = [
            'React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'MongoDB',
            'Web Development', 'Mobile App', 'UI/UX Design', 'API Development'
        ];
        
        techTerms.forEach(term => {
            if (term.toLowerCase().includes(searchQuery.toLowerCase())) {
                suggestions.add(term);
            }
        });

        APIResponse.success(res, {
            suggestions: Array.from(suggestions).slice(0, 8)
        });

    } catch (error) {
        console.error('Search suggestions error:', error);
        APIResponse.error(res, 'Failed to get suggestions', 500);
    }
};

module.exports = {
    globalSearch,
    searchSuggestions
};