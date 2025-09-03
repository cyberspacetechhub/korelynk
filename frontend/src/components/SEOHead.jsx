import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'article',
  author,
  publishedTime,
  tags = []
}) => {
  const siteUrl = window.location.origin;
  const fullUrl = url ? `${siteUrl}${url}` : window.location.href;
  const fullImageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/default-og-image.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Cyberspace Tech Hub" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Article specific */}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && tags.length > 0 && 
        tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))
      }
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEOHead;