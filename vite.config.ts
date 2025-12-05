import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages: use '/admin-panel-test/'
  // For InfinityFree or domain root: use '/'
  base: process.env.DEPLOY_TARGET === 'infinity-free' ? '/' : '/admin-panel-test/',
  plugins: [
    react(),
    {
      name: 'inject-base-href',
      transformIndexHtml(html) {
        const baseHref = process.env.DEPLOY_TARGET === 'infinity-free' ? '/' : '/admin-panel-test/'
        return html.replace(
          '    <!-- For GitHub Pages: /admin-panel-test/ | For InfinityFree: / -->',
          `    <base href="${baseHref}">`
        )
      }
    }
  ],
})
