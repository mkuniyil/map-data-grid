import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "inline",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Map DataGrid App",
        short_name: "MapGrid",
        description: "Map DataGrid App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      // devOptions: {
      //   enabled: true,
      // },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\/.*\/tiles\/.*$/,
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-tiles",
              expiration: {
                maxEntries: 500, // Adjust as needed
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\/.*\/geocode\/.*$/,
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-geocode-search",
              expiration: {
                maxEntries: 500, // Adjust as needed
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Add other caching rules as needed
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
