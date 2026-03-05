import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'chart-vendor': ['recharts'],
          'form-vendor': ['react-hook-form', 'react-toastify'],
          'editor-vendor': ['react-simplemde-editor', 'simplemde'],
          'utils-vendor': ['axios', 'lucide-react', 'swiper']
        }
      }
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },
    cssMinify: true,
    reportCompressedSize: false,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'lucide-react']
  }
})
