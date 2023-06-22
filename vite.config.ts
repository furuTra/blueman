import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
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
