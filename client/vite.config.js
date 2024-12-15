import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: process.env.PORT || 5173,
    proxy: {
      // string shorthand
      // with options
      "/api": {
        // target: "https://behind.onrender.com",
        // target: "http://localhost:5252",
        target: "https://runningback.onrender.com/api/v1", 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
