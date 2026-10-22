import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // O conteúdo do curso inteiro (textos e exercícios) vai junto no bundle principal,
    // por isso o limite padrão de 500 kB é pequeno demais para nós.
    chunkSizeWarningLimit: 800,
  },
})
