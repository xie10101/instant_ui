import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
// import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config([
  { ignores: ['dist', 'storybook-static', 'node_modules'] },

  // 2. 基础 JS 推荐规则 (作用于所有文件)
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. React 推荐规则 (直接平铺数组，不要在对象里展开)
  reactRecommended,
  // 3. 基础 TS 推荐规则 (仅作用于 TS 文件)
  // {
  //   files: ['**/*.{ts,tsx}'],
  //   ...tseslint.configs.recommendedTypeChecked,
  //   languageOptions: {
  //     parserOptions: {
  //       projectService: true,
  //       tsconfigRootDir: import.meta.dirname,
  //     },
  //   },
  // },

  // // 4. React 推荐规则 (仅作用于 TS 文件)
  // {
  //   files: ['**/*.{ts,tsx}'],
  //   ...reactRecommended,
  //   settings: {
  //     react: {
  //       version: 'detect', // 自动检测 React 版本
  //     },
  //   },
  // },

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
      'react/react-in-jsx-scope': 'off', // 关闭 React 17+ 不再需要的规则
      'react/jsx-uses-react': 'off', // 关闭 React 17+ 不再需要的规则
      'react/prop-types': 'off', // 关闭 TypeScript 项目中冗余的 prop-types 检查
      'react/display-name': 'off', // 关闭 display-name 检查
    },
  },

  // // 5. 可访问性 (a11y) 插件 - 对UI库至关重要
  // {
  //   files: ['**/*.{ts,tsx}'],
  //   plugins: { 'jsx-a11y': jsxA11y },
  //   rules: jsxA11y.configs.recommended.rules,
  // },

  // 6. 全局语言选项和自定义规则
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {},
    },
    rules: {
      // 将 'off' 改为 'warn'，提醒开发者修复 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
      // 对未使用的变量进行更精细的控制
      // : [
      //   'off',
      //   // { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      // ],
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // 7. Prettier 集成，必须放在最后，以覆盖其他格式规则
  prettierConfig,
]);
