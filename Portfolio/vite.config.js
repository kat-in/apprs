import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,   // включаем source maps
    minify: false,     // отключаем минификацию
    outDir: 'dist',    // папка сборки
  }
})