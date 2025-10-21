// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Project Page en GitHub Pages → base obligatoria con el nombre del repo
  base: '/tienda-jruiz/',
  // Publicamos el build en /docs para que Pages lo sirva
  build: { outDir: 'docs' }
})
