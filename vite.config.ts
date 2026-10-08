import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// In Docker the backend is reachable at http://backend:8000 over the compose
// network; for plain `npm run dev` on the host it stays http://localhost:8000.
const proxyTarget = process.env.VITE_PROXY_TARGET || 'http://localhost:8000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,  // 🔑 important
        secure: false,       // HTTPS nu e folosit în dev
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
