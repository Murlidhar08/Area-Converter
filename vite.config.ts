import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      devOptions: { enabled: true },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,png,svg,ico,jpg,json,woff2}"],
        clientsClaim: true,
        skipWaiting: true,

        // Define runtime caching rules
        runtimeCaching: [
          {
            // Cache Google Fonts Stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            // Cache Google Fonts Webfonts
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache static assets (images, etc.)
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico|json)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // For everything else, use StaleWhileRevalidate to ensure offline works but stays updated
            urlPattern: /^https:\/\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "external-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
        ],
      },

      includeAssets: [
        "favicon.ico",
        "images/favicon-16x16.png",
        "images/favicon-32x32.png",
        "images/apple-touch-icon.png",
        "images/maskable_icon_x192.png",
        "images/maskable_icon_x512.png"
      ],
      manifest: {
        name: "Unit Converter",
        short_name: "UnitConverter",
        description: "Easily convert units with our intuitive tool.",
        theme_color: "#6b21a8",
        background_color: "#6b21a8",
        display: "standalone",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "/images/maskable_icon_x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/maskable_icon_x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/maskable_icon_x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/maskable_icon_x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/maskable_icon_x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
