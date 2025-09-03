const Blog = require('../models/Blog');
const Category = require('../models/Category');

class BlogService {
    async getAllBlogs(filters = {}, pagination = {}) {
        const { category, tags, search } = filters;
        const { page = 1, limit = 10 } = pagination;
        
        const query = { status: 'published' };
        
        if (category) {
            query.category = category;
        }
        
        if (tags) {
            query.tags = { $in: tags.split(',') };
        }
        
        if (search) {
            query.$text = { $search: search };
        }
        
        const skip = (page - 1) * limit;
        
        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .populate('author', 'fullname email')
                .populate('category', 'name slug color')
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Blog.countDocuments(query)
        ]);
        
        return {
            blogs,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        };
    }

    async getAllBlogsAdmin(filters = {}, pagination = {}) {
        const { status } = filters;
        const { page = 1, limit = 10 } = pagination;
        
        const query = {};
        
        if (status && status !== 'all') {
            query.status = status;
        }
        
        const skip = (page - 1) * limit;
        
        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .populate('author', 'fullname email')
                .populate('category', 'name slug color')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Blog.countDocuments(query)
        ]);
        
        return {
            blogs,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        };
    }

    async getBlogBySlug(slug) {
        const blog = await Blog.findOne({ slug, status: 'published' })
            .populate('author', 'fullname email')
            .populate('category', 'name slug color');
            
        if (blog) {
            // Increment views
            await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
        }
        
        return blog;
    }

    async createBlog(blogData, authorId) {
        const slug = this.generateSlug(blogData.title);
        
        const blog = new Blog({
            ...blogData,
            author: authorId,
            slug,
            publishedAt: blogData.status === 'published' ? new Date() : null
        });
        
        await blog.save();
        return blog.populate('author', 'fullname email').populate('category', 'name slug color');
    }

    async updateBlog(blogId, updateData) {
        if (updateData.title) {
            updateData.slug = this.generateSlug(updateData.title);
        }
        
        if (updateData.status === 'published' && !updateData.publishedAt) {
            updateData.publishedAt = new Date();
        }
        
        const blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })
            .populate('author', 'fullname email')
            .populate('category', 'name slug color');
            
        return blog;
    }

    async deleteBlog(blogId) {
        return await Blog.findByIdAndDelete(blogId);
    }

    async addComment(blogId, commentData) {
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            return null;
        }
        
        blog.comments.push({
            ...commentData,
            createdAt: new Date()
        });
        
        await blog.save();
        return blog.comments[blog.comments.length - 1];
    }

    async getBlogById(blogId) {
        return await Blog.findById(blogId)
            .populate('author', 'fullname email')
            .populate('category', 'name slug color');
    }

    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-') + '-' + Date.now();
    }
}

module.exports = new BlogService();