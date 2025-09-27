import { defineConfig } from 'vite'

export default defineConfig({
  base: '/apprs/',  
  build: {
    sourcemap: true,
    minify: false,
    outDir: 'dist',
  }
})