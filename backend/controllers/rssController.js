const Blog = require('../models/Blog');

const generateRSSFeed = async (req, res) => {
    try {
        const baseUrl = 'https://korelynk.vercel.app';
        
        // Get latest published blogs
        const blogs = await Blog.find({ status: 'published' })
            .populate('author', 'fullname')
            .populate('category', 'name')
            .sort({ publishedAt: -1 })
            .limit(20);

        // Generate RSS XML
        let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>KoreLynk Blog</title>
        <description>Latest programming tutorials, web development insights, and technology trends from KoreLynk</description>
        <link>${baseUrl}/blog</link>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <generator>KoreLynk</generator>
        <image>
            <url>${baseUrl}/kore-lynk.png</url>
            <title>KoreLynk</title>
            <link>${baseUrl}</link>
        </image>`;

        blogs.forEach(blog => {
            const pubDate = new Date(blog.publishedAt).toUTCString();
            const content = blog.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            
            rss += `
        <item>
            <title><![CDATA[${blog.title}]]></title>
            <description><![CDATA[${blog.excerpt || blog.content.substring(0, 200)}]]></description>
            <content:encoded><![CDATA[${content}]]></content:encoded>
            <link>${baseUrl}/blog/${blog.slug}</link>
            <guid isPermaLink="true">${baseUrl}/blog/${blog.slug}</guid>
            <pubDate>${pubDate}</pubDate>
            <author>${blog.author?.fullname || 'KoreLynk'}</author>
            ${blog.category ? `<category><![CDATA[${blog.category.name}]]></category>` : ''}
            ${blog.tags ? blog.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('') : ''}
        </item>`;
        });

        rss += `
    </channel>
</rss>`;

        res.set('Content-Type', 'application/rss+xml');
        res.send(rss);

    } catch (error) {
        console.error('RSS generation error:', error);
        res.status(500).send('Error generating RSS feed');
    }
};

module.exports = {
    generateRSSFeed
};