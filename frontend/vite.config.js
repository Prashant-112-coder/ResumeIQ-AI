import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-icons/fi': fileURLToPath(new URL('./src/feather-icons-compat.js', import.meta.url)),
    },
  },
})
