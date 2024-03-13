import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  server: {
    host: true,
    strictPort: true,
    port: 8080,
    proxy: {
      "/api": "http://host.docker.internal:8011",
    }  
  } ,
  plugins: [react()],
})
