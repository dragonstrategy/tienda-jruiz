import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tienda-jruiz/',   // nombre de TU repo
  build: { outDir: 'dist' }
})
