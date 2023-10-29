import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    hmr: false,
    port: 3000,
    proxy: {
      '/api/v9/': {
        target: 'https://discord.com/',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
