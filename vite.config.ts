import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages: use '/admin-panel-test/'
  // For InfinityFree or domain root: use '/' or './'
  base: process.env.DEPLOY_TARGET === 'infinity-free' ? '/' : '/admin-panel-test/',
  plugins: [react()],
})
