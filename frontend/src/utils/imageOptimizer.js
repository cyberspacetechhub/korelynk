/**
 * Optimize Cloudinary image URLs with automatic format, quality, and sizing
 * @param {string} url - Original Cloudinary URL
 * @param {number} width - Desired width in pixels
 * @param {number} height - Desired height in pixels (optional)
 * @returns {string} Optimized Cloudinary URL
 */
export const optimizeCloudinaryUrl = (url, width = 400, height = null) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Build transformation string
  let transformations = `f_auto,q_auto,w_${width}`;
  
  if (height) {
    transformations += `,h_${height},c_fit`;
  } else {
    transformations += ',c_scale';
  }
  
  // Insert transformations after /upload/
  return url.replace('/upload/', `/upload/${transformations}/`);
};

/**
 * Generate responsive image srcset for Cloudinary images
 * @param {string} url - Original Cloudinary URL
 * @param {array} sizes - Array of widths [400, 800, 1200]
 * @returns {string} srcset string
 */
export const generateSrcSet = (url, sizes = [400, 800, 1200]) => {
  if (!url || !url.includes('cloudinary.com')) return '';
  
  return sizes
    .map(size => `${optimizeCloudinaryUrl(url, size)} ${size}w`)
    .join(', ');
};
