import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ensure .env variables are loaded
import { config as loadEnv } from 'dotenv';
loadEnv();

console.log('CONFIG LOADING', process.env.VITE_EXPRESS_BACKEND_URL);

// Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // This proxy is only used during development
        target: process.env.VITE_EXPRESS_BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
  // In production, the API base URL should be embedded at build time
  define: {
    'import.meta.env.VITE_EXPRESS_BACKEND_URL': JSON.stringify('http://a12f5b931ed614cfd9c569b5c71fbbff-1547954327.us-west-2.elb.amazonaws.com:3030'),

    // 'import.meta.env.VITE_EXPRESS_BACKEND_URL': JSON.stringify(process.env.VITE_EXPRESS_BACKEND_URL),
  },
});