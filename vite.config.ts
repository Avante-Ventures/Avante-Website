import { defineConfig } from 'vite'
import path from 'path'
import { existsSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


// Resolves Figma Make's `figma:asset/<hash>.png` virtual imports to files in
// src/assets/. Phase 4 enhancement: when a `.webp` sibling exists for the
// requested PNG (created by scripts/optimize-images.mjs), serve that
// instead, gives a 60-95% size reduction with no component-side changes.
// The browser's Content-Type comes from the resolved file path so MIME
// stays correct (image/webp).
function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (!id.startsWith('figma:asset/')) return
      const filename = id.replace('figma:asset/', '')
      const pngPath = path.resolve(__dirname, 'src/assets', filename)
      if (filename.endsWith('.png')) {
        const webpPath = pngPath.replace(/\.png$/, '.webp')
        if (existsSync(webpPath)) return webpPath
      }
      return pngPath
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
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
  build: {
    // Optimizations for production build
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          // NOTE: three/R3F/drei are intentionally NOT manually chunked. The
          // React.lazy(() => import('./Stage3D')) dynamic import already makes
          // Vite emit them as a separate ASYNC chunk loaded only when the 3D
          // stage mounts (Tier-1 desktop, in-band). Forcing a manual 'three'
          // chunk turned it into an entry-referenced chunk that got preloaded
          // on first paint — defeating the lazy split (and a circular-chunk
          // warning). Leave it to the dynamic import.
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false,
    },
  },
})