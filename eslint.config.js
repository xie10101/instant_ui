import js from "@eslint/js"; // 配置 eslint 插件
import globals from "globals"; // 配置 eslint 插件
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    //继承预设的规则集
    extends: [js.configs.recommended, ...tseslint.configs.recommended], //扩展 设置 对于js。、ts的推荐校验规则
    files: ["**/*.{ts,tsx}"], //检查文件范围
    languageOptions: {
      ecmaVersion: 2020, //js语法版本
      globals: globals.browser, // 声明 window 等浏览器环境中所有内置全局变量
    },
    plugins: {
      "react-hooks": reactHooks, // 对于 react hooks 的校验
      "react-refresh": reactRefresh, // 对于 react 热更新的校验 --强制每个文件只能导出 React 组件
    },
    // 对于 extends 相比 优先级较高
    rules: {
      // 规则设置
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
