import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import { componentTagger } from 'lovable-tagger'

// yarn preview cli for run with PWA
export default defineConfig(({ mode }) => {
  const initialScripts = new Set<string>()
  return {
    server: {
      host: '::',
      port: 5173,
    },
    plugins: [
      react(),
      {
        name: 'collect-initial-scripts',
        generateBundle(_, bundle) {
          const visit = (file: string) => {
            if (initialScripts.has(file)) return
            initialScripts.add(file)
            const chunk = bundle[file]
            if (chunk?.type === 'chunk') chunk.imports.forEach(visit)
          }
          Object.values(bundle).forEach(chunk => {
            if (chunk.type === 'chunk' && chunk.isEntry) visit(chunk.fileName)
          })
        },
      },

      mode === 'development' && componentTagger(),

      // ======= PWA Plugin =======
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt'],
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
          // Precache the shell only; downloading every route competes with startup.
          manifestTransforms: [
            async entries => ({
              manifest: entries.filter(
                entry =>
                  !entry.url.endsWith('.js') || initialScripts.has(entry.url),
              ),
              warnings: [],
            }),
          ],
          runtimeCaching: [
            {
              urlPattern: ({ url, sameOrigin }) =>
                sameOrigin && /^\/assets\/.+\.js$/.test(url.pathname),
              handler: 'CacheFirst',
              options: {
                cacheName: 'fastfactor-route-scripts',
                expiration: {
                  maxEntries: 80,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
                cacheableResponse: { statuses: [200] },
              },
            },
          ],
        },

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
  }
})
