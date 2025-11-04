import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../context/SettingsContext';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  article = null,
  noindex = false 
}) => {
  const { settings } = useSettings();
  
  const siteUrl = 'https://korelynk.vercel.app';
  const defaultImage = `${siteUrl}/kore-lynk.png`;
  
  const seoTitle = title 
    ? `${title} | ${settings.siteName}` 
    : settings.seoSettings?.metaTitle || `${settings.siteName} - Professional Web & Mobile Development`;
    
  const seoDescription = description || settings.seoSettings?.metaDescription || 
    'KoreLynk Tech provides professional web development, mobile app development, UI/UX design, and digital solutions globally. Transform your business with cutting-edge technology and remote development services.';
    
  const seoKeywords = [
    ...keywords,
    ...(settings.seoSettings?.keywords || []),
    'web development',
    'mobile app development',
    'UI/UX design',
    'React development',
    'Node.js development',
    'digital solutions',
    'tech consulting',
    'software development',
    'responsive design',
    'e-commerce development',
    'remote development team',
    'offshore development',
    'global tech solutions',
    'international web development',
    'diaspora tech services'
  ].join(', ');
  
  const seoImage = image ? 
    (image.startsWith('http') ? image : `${siteUrl}${image}`) : 
    (settings.logo || defaultImage);
  
  // Ensure image has proper dimensions for social sharing
  const processedImage = seoImage.includes('cloudinary.com') && !seoImage.includes('w_') ? 
    seoImage.replace('/upload/', '/upload/w_1200,h_630,c_fill/') : 
    seoImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={settings.siteName} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6366f1" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={processedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={settings.siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={processedImage} />
      <meta name="twitter:site" content="@korelynk" />
      <meta name="twitter:creator" content="@korelynk" />
      
      {/* Article specific tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedAt} />
          <meta property="article:modified_time" content={article.updatedAt} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.category} />
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Google News Tags */}
      {type === 'article' && (
        <>
          <meta name="news_keywords" content={seoKeywords} />
          <meta name="standout" content={seoUrl} />
          <meta name="syndication-source" content={siteUrl} />
          <meta name="original-source" content={seoUrl} />
        </>
      )}
      
      {/* Additional SEO Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'Organization',
          ...(type === 'article' ? {
            headline: title,
            description: seoDescription,
            image: processedImage,
            author: {
              "@type": "Person",
              name: article?.author || settings.siteName
            },
            publisher: {
              "@type": "Organization",
              name: settings.siteName,
              logo: {
                "@type": "ImageObject",
                url: settings.logo || defaultImage
              }
            },
            datePublished: article?.publishedAt,
            dateModified: article?.updatedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": seoUrl
            },
            "@type": "NewsArticle",
            "isAccessibleForFree": true,
            "hasPart": {
              "@type": "WebPageElement",
              "isAccessibleForFree": true
            }
          } : {
            name: settings.siteName,
            description: seoDescription,
            url: siteUrl,
            logo: settings.logo || defaultImage,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: settings.contactPhone,
              contactType: "customer service",
              email: settings.contactEmail
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Global",
              addressCountry: "Worldwide"
            },
            sameAs: [
              settings.socialLinks?.facebook,
              settings.socialLinks?.twitter,
              settings.socialLinks?.linkedin,
              settings.socialLinks?.github
            ].filter(Boolean)
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEO;