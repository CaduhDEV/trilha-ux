import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // App instalável (PWA): ícone na tela inicial, tela cheia e funciona com internet ruim.
    VitePWA({
      // "prompt": a pessoa decide quando atualizar, para não recarregar no meio de uma lição
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Trilha UX',
        short_name: 'Trilha UX',
        description: 'Do zero a UX designer profissional em 6 meses — teoria, prática no Figma, exames e repetição espaçada.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#7C4DFF',
        theme_color: '#7C4DFF',
        categories: ['education'],
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Revisar cartões', url: '/revisar', icons: [{ src: 'pwa-192.png', sizes: '192x192' }] },
          { name: 'Plano de estudos', url: '/plano', icons: [{ src: 'pwa-192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        // guarda o app inteiro (o conteúdo do curso vem no bundle) para abrir mesmo offline
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // fontes do Google: mudam raramente
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Supabase (login e progresso) não entra em nenhuma regra: sempre vai direto à rede
        ],
      },
    }),
  ],
  build: {
    // O conteúdo do curso inteiro (textos e exercícios) vai junto no bundle principal,
    // por isso o limite padrão de 500 kB é pequeno demais para nós.
    chunkSizeWarningLimit: 800,
  },
})
