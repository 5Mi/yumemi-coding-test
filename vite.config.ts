import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import postcssNest from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), visualizer({ filename: './visualizer/index.html' }) as PluginOption],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  esbuild: {
    legalComments: 'none',
  },
  build: {
    emptyOutDir: true,
    target: browserslistToEsbuild(),
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['axios', 'swr'],
        },
      },
    },
  },
  css: {
    modules: {
      generateScopedName: '[local]-[hash:base64:5]',
      localsConvention: 'dashes',
    },
    postcss: {
      plugins: [
        postcssNest(),
        postcssPresetEnv({
          stage: 3,
          autoprefixer: {
            flexbox: 'no-2009',
          },
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use '@/styles/variables.scss' as *;`,
      },
    },
  },
});
