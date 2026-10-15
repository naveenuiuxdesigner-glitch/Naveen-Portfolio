import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // manifest: lets scripts/prerender.js find the CSS each page needs and put it inside that page's HTML
  build: { manifest: true },
})
