import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 一般vite项目中需要设置type.node的类型定义吗？
import path from 'path';
// import dts from 'vite-plugin-dts'
// import typescript from '@rollup/plugin-typescript'
// import postcss from 'rollup-plugin-postcss'
export default defineConfig({
  plugins: [
    react(),
    //   dts({
    //   // 插件配置选项
    //   include: ['src/**/*.{ts,tsx}'], // 指定包含的文件
    //   exclude: ['**/*.test.ts', '**/*.stories.tsx'], // 排除测试文件
    //   outDir: 'dist/types', // 输出目录
    //   insertTypesEntry: true, // 生成类型入口文件
    //   rollupTypes: true // 使用Rollup打包类型
    // })
  ],
  build: {},
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/styles/variables" as var;`, // 全局注入变量
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
