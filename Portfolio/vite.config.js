import { defineConfig } from 'vite'

export default defineConfig({
  base: '/apprs/Portfolio/',  
  build: {
    sourcemap: true,
    minify: false,
    outDir: 'dist',
  }
})