import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// GitHub Pages repo name - change this to match your repo name
// For username.github.io/repo-name/, use '/repo-name/'
// For custom domain, use '/'
const BASE_URL = '/sigtrip-dashboard/'

export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
