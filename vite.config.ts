import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 一般vite项目中需要设置type.node的类型定义吗？
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
      "@": path.resolve(__dirname, "./src"), // 路径别名
    },
  },
});
