import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 一般vite项目中需要设置type.node的类型定义吗？
import path from 'path';
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {},
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
  // 路径别名设置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 路径别名
    },
  },
});
