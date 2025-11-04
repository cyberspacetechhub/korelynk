import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'ui-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            if (id.includes('recharts')) {
              return 'chart-vendor';
            }
            if (id.includes('react-hook-form') || id.includes('react-toastify')) {
              return 'form-vendor';
            }
            if (id.includes('simplemde') || id.includes('codemirror')) {
              return 'editor-vendor';
            }
            if (id.includes('axios') || id.includes('lucide') || id.includes('swiper')) {
              return 'utils-vendor';
            }
            return 'vendor';
          }
          
          // Admin pages
          if (id.includes('/pages/admin/')) {
            if (id.includes('Analytics') || id.includes('Chart')) {
              return 'admin-analytics';
            }
            if (id.includes('Blog') || id.includes('CodeSample') || id.includes('Categories')) {
              return 'admin-content';
            }
            if (id.includes('Student') || id.includes('Instructor') || id.includes('Course') || id.includes('Class')) {
              return 'admin-education';
            }
            return 'admin-core';
          }
          
          // Student/Instructor pages
          if (id.includes('/pages/student/') || id.includes('/pages/instructor/')) {
            return 'education-pages';
          }
          
          // Public pages
          if (id.includes('/pages/') && !id.includes('/admin/')) {
            return 'public-pages';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'esbuild'
  }
})
