import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// 动态导入 sass
let sassImplementation;
const importSass = async () => {
  sassImplementation = (await import('sass')).default;
};
await importSass();
// 主配置（JS + CSS 打包）
const config = {
  input: 'src/main.tsx',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },

    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'instant-ui', // 全局变量名
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'react-transition-group', 'lodash', 'axios'], // 外部化依赖
  plugins: [
    nodeResolve(),
    json(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false, // 由 rollup-plugin-dts 单独处理
    }),
    postcss({
      modules: false, // 启用 CSS Modules
      extract: 'styles.css', // 提取全局 CSS
      minimize: true,
      use: {
        sass: {
          implementation: sassImplementation, // 使用 Dart Sass
        },
      },
      sourceMap: true, // 可选：生成 sourcemap
    }),
  ],
};

// 类型声明打包配置
const dtsConfig = {
  input: 'src/main.tsx',
  output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
  plugins: [dts()],
  external: [/\.s?css$/],
};

export default [config, dtsConfig];
