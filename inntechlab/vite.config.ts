import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor'
          }
          if (id.includes('@tanstack/react-query') || id.includes('node_modules/axios/')) {
            return 'query-vendor'
          }
          if (id.includes('react-helmet-async') || id.includes('lucide-react')) {
            return 'ui-vendor'
          }
        },
      },
    },
  },
})
