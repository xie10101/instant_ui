import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // 1. 全局忽略
  { ignores: ['dist', 'storybook-static', 'node_modules'] },

  // 2. 基础 JS 和 TS 推荐规则 (使用更严格的类型检查)
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // 3. React 核心规则
  {
    files: ['**/*.{ts,tsx}'],
    ...reactRecommended,
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
  },

  // 4. React Hooks 和 Refresh 插件
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // 5. 可访问性 (a11y) 插件 - 对UI库至关重要
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: jsxA11y.configs.recommended.rules,
  },

  // 6. 全局语言选项和自定义规则
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: true, // 启用类型检查规则
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // 将 'off' 改为 'warn'，提醒开发者修复 any 类型
      '@typescript-eslint/no-explicit-any': 'warn',
      // 对未使用的变量进行更精细的控制
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // 7. Prettier 集成，必须放在最后，以覆盖其他格式规则
  prettierConfig
);
