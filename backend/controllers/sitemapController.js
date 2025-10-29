const Blog = require('../models/Blog');
const Project = require('../models/Project');

const generateSitemap = async (req, res) => {
    try {
        const baseUrl = 'https://korelynk.vercel.app';
        
        // Static pages
        const staticPages = [
            { url: '/', priority: '1.0', changefreq: 'weekly' },
            { url: '/about', priority: '0.8', changefreq: 'monthly' },
            { url: '/services', priority: '0.9', changefreq: 'monthly' },
            { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
            { url: '/blog', priority: '0.9', changefreq: 'daily' },
            { url: '/contact', priority: '0.7', changefreq: 'monthly' },
            { url: '/careers', priority: '0.6', changefreq: 'monthly' }
        ];

        // Get published blogs
        const blogs = await Blog.find({ status: 'published' })
            .select('slug updatedAt')
            .sort({ publishedAt: -1 });

        // Generate XML
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add static pages
        staticPages.forEach(page => {
            sitemap += `
    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
        });

        // Add blog posts
        blogs.forEach(blog => {
            sitemap += `
    <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <lastmod>${blog.updatedAt.toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`;
        });

        sitemap += `
</urlset>`;

        res.set('Content-Type', 'application/xml');
        res.send(sitemap);

    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).send('Error generating sitemap');
    }
};

module.exports = {
    generateSitemap
};