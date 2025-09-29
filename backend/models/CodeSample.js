const mongoose = require('mongoose');

const codeSampleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000
    },
    language: {
        type: String,
        required: true,
        enum: ['html', 'css', 'javascript', 'react', 'nodejs', 'python', 'php']
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    code: {
        html: {
            type: String,
            default: ''
        },
        css: {
            type: String,
            default: ''
        },
        js: {
            type: String,
            default: ''
        }
    },
    tags: [{
        type: String,
        trim: true
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        content: {
            type: String,
            required: true,
            maxlength: 1000
        },
        author: {
            name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            }
        },
        replies: [{
            content: {
                type: String,
                required: true,
                maxlength: 500
            },
            author: {
                name: {
                    type: String,
                    required: true,
                    trim: true
                },
                email: {
                    type: String,
                    required: true,
                    trim: true,
                    lowercase: true
                }
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

codeSampleSchema.index({ slug: 1 });
codeSampleSchema.index({ language: 1 });
codeSampleSchema.index({ status: 1, createdAt: -1 });
codeSampleSchema.index({ tags: 1 });
codeSampleSchema.index({ difficulty: 1 });

module.exports = mongoose.model('CodeSample', codeSampleSchema);