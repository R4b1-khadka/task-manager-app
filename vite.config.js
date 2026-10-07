import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://task-manager-icur5l6pz-rabi9.vercel.app',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
