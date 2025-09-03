const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    color: {
        type: String,
        default: '#6366f1'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

categorySchema.index({ slug: 1 });

module.exports = mongoose.model('Category', categorySchema);