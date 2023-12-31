import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
    assetsDir: 'assets',
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '~/': `${__dirname}/src/`,
      '@assets/': `${__dirname}/src/assets/`,
    },
  },
});
