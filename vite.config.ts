import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
// 一般vite项目中需要设置type.node的类型定义吗？
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      // 生成类型声明文件（适用于库）
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['**/*.stories.tsx'], // 排除测试文件
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true, // 生成 sourcema
    lib: {
      entry: 'src/main.tsx', // 库模式入口（如果是应用项目，删除此配置）
      name: 'instant-ui',
      fileName: 'instant-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // 外部依赖（不打包进库）
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  // 可能需要设置的css配置项 ：
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as var;`, // 全局注入变量
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

/* {

  }
}*/
