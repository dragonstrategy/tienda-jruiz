// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tienda-jr/',     // 👈 muy importante: /<NOMBRE_DEL_REPO>/
  build: { outDir: 'dist' }
})
