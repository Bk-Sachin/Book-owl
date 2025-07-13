import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cart': 'http://localhost:5000',
      '/books': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    }
  }
})
