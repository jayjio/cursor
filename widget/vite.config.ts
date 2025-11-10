import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all elements with '-' as custom elements
          isCustomElement: (tag) => false
        }
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'jeremy-chat-widget.ts'),
      name: 'JeremyChatWidget',
      fileName: (format) => `jeremy-chat-widget.${format}.js`,
      formats: ['iife']
    },
    rollupOptions: {
      // Don't externalize anything - bundle everything
      output: {
        // Provide global variable name
        name: 'JeremyChatWidget',
        // Inline all dependencies
        inlineDynamicImports: true,
        // Format as IIFE for direct browser use
        format: 'iife',
        // Don't minify class names to avoid issues
        compact: false
      }
    },
    outDir: resolve(__dirname, '../dist/widget'),
    emptyOutDir: true,
    minify: false, // Disable minification for now - can enable later with terser
    sourcemap: true,
    target: 'es2015',
    cssCodeSplit: false, // Include all CSS in the JS bundle
    // Inject CSS into the JS bundle
    css: {
      inject: true
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../')
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})
