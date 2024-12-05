import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'favicon-16x16.png', 'favicon-32x32.png', 'safari-pinned-tab.svg', 'site.webmanifest', 'android-chrome-192x192.png', 'android-chrome-512x512.png', 'maskable_icon.png'],
    manifest: {
      name: 'Wargi',
      short_name: 'Wargi',
      description: 'Aplikasi pengelolaan iuran warga',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/apple-touch-icon.png',
          sizes:'180x180',
          type:'image/png',
          purpose:'any',
        },
        {
          src: '/maskable_icon.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'maskable',
        }
      ],
      theme_color: '#8c52ff',
      background_color: '#18181b',
      display:"standalone",
      scope:'/',
      start_url:"/",
      orientation:'portrait'
    },
  })],
  server: {
    host: true
  }
})
