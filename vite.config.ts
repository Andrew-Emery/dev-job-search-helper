import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dev-job-search-helper/', // This should match your GitHub Pages repository name
})
