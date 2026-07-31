import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import { componentTagger } from 'lovable-tagger'

// yarn preview cli for run with PWA
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 5173,
  },
  plugins: [
    react(),

    mode === 'development' && componentTagger(),

    // ======= PWA Plugin =======
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],

      manifest: {
        name: 'FastFactor',
        short_name: 'FastFactor',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-192.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
