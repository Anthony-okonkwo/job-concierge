import { defineConfig } from 'vite'

// @ts-ignore
import path from 'path'
// @ts-ignore
import url from 'url' 

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // --- ADDED THIS BLOCK TO FIX THE WEBSOCKET WAHALA ---
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  }
})