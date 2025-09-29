const CodeSample = require('../models/CodeSample');

class CodeSampleService {
    async getAllCodeSamples(filters = {}, pagination = {}) {
        const { language, difficulty, tags } = filters;
        const { page = 1, limit = 12 } = pagination;
        
        const query = { status: 'published' };
        
        if (language) query.language = language;
        if (difficulty) query.difficulty = difficulty;
        if (tags) query.tags = { $in: tags.split(',') };
        
        const skip = (page - 1) * limit;
        
        const [codeSamples, total] = await Promise.all([
            CodeSample.find(query)
                .populate('author', 'fullname')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            CodeSample.countDocuments(query)
        ]);
        
        return {
            codeSamples,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        };
    }

    async getAllCodeSamplesAdmin(filters = {}, pagination = {}) {
        const { status, language } = filters;
        const { page = 1, limit = 12 } = pagination;
        
        const query = {};
        if (status && status !== 'all') query.status = status;
        if (language) query.language = language;
        
        const skip = (page - 1) * limit;
        
        const [codeSamples, total] = await Promise.all([
            CodeSample.find(query)
                .populate('author', 'fullname')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            CodeSample.countDocuments(query)
        ]);
        
        return {
            codeSamples,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        };
    }

    async getCodeSampleBySlug(slug) {
        const codeSample = await CodeSample.findOne({ slug, status: 'published' })
            .populate('author', 'fullname');
            
        if (codeSample) {
            await CodeSample.findByIdAndUpdate(codeSample._id, { $inc: { views: 1 } });
        }
        
        return codeSample;
    }

    async getCodeSampleById(id) {
        return await CodeSample.findById(id).populate('author', 'fullname');
    }

    async createCodeSample(data, authorId) {
        const slug = this.generateSlug(data.title);
        
        const codeSample = new CodeSample({
            ...data,
            author: authorId,
            slug
        });
        
        await codeSample.save();
        return codeSample.populate('author', 'fullname');
    }

    async updateCodeSample(id, data) {
        if (data.title) {
            data.slug = this.generateSlug(data.title);
        }
        
        return await CodeSample.findByIdAndUpdate(id, data, { new: true })
            .populate('author', 'fullname');
    }

    async deleteCodeSample(id) {
        return await CodeSample.findByIdAndDelete(id);
    }

    async addComment(id, commentData) {
        const codeSample = await CodeSample.findById(id);
        if (!codeSample) return null;
        
        codeSample.comments.push({
            ...commentData,
            createdAt: new Date()
        });
        
        await codeSample.save();
        return codeSample.comments[codeSample.comments.length - 1];
    }

    async addReply(id, commentId, replyData) {
        const codeSample = await CodeSample.findById(id);
        if (!codeSample) return null;
        
        const comment = codeSample.comments.id(commentId);
        if (!comment) return null;
        
        comment.replies.push({
            ...replyData,
            createdAt: new Date()
        });
        
        await codeSample.save();
        return comment.replies[comment.replies.length - 1];
    }

    async toggleLike(id) {
        const codeSample = await CodeSample.findById(id);
        if (!codeSample) return null;
        
        codeSample.likes = (codeSample.likes || 0) + 1;
        await codeSample.save();
        return codeSample;
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

module.exports = new CodeSampleService();