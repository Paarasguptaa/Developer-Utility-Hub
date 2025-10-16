import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom'
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react')) return 'react'
          if (id.includes('react-router')) return 'router'
          if (id.includes('firebase')) return 'firebase'
          if (id.match(/crypto-js|dayjs|jose|diff|js-beautify|color-convert/)) return 'utils'
          return 'vendor'
        }
      }
    }
  }
})
