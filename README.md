# Instant UI

> 🎨 一个基于 React 的现代化 UI 组件库，用于构建高性能的 Web 应用

## 📦 特性

- ✨ **8+ 高质量组件** - Button、Input、Menu、Card、Progress、Upload 等
- 🎯 **完整的 TypeScript 支持** - 提供完整的类型定义
- 📖 **Storybook 文档** - 交互式组件文档和示例
- 🧪 **全面的测试覆盖** - 单元测试和集成测试
- 🛠️ **开发友好** - 支持热重载、ESLint、Prettier
- 📦 **Tree-shaking 支持** - 构建时自动删除未使用的代码
- 🎨 **SCSS 预处理** - 灵活的样式定制能力
- 📋 **Commit 规范** - 使用 Commitlint 保证提交规范

## 🚀 快速开始

### 安装

```bash
npm install @xiex11/instant-ui
# 或
pnpm install @xiex11/instant-ui
# 或
yarn add @xiex11/instant-ui
```

### 基础使用

```tsx
import React from 'react';
import { Button, Input, Card } from '@xiex11/instant-ui';

function App() {
  return (
    <Card title="Welcome">
      <div>
        <Input placeholder="输入内容" />
        <Button type="primary">提交</Button>
      </div>
    </Card>
  );
}

export default App;
```

## 📚 组件列表

| 组件             | 说明                          |
| ---------------- | ----------------------------- |
| **Button**       | 按钮组件 - 支持多种类型和大小 |
| **Input**        | 输入框 - 文本输入和事件处理   |
| **Menu**         | 菜单 - 导航菜单和子菜单       |
| **Card**         | 卡片 - 内容容器               |
| **Progress**     | 进度条 - 进度显示             |
| **Upload**       | 文件上传 - 支持多文件上传     |
| **Icon**         | 图标 - 基于 FontAwesome       |
| **AutoComplete** | 自动完成 - 输入建议           |
| **Form**         | 表单 - 表单容器和验证         |

## 🔧 开发指南

### 环境要求

- Node.js >= 16
- pnpm >= 8（推荐）或 npm >= 8

### 开发集群

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动 Storybook 文档
pnpm storybook

# 运行单元测试
pnpm test

# 运行所有测试（无监听模式）
pnpm test:nowatch

# 代码构建
pnpm build

# 生成 Storybook 静态文件
pnpm build-storybook
```

## 📝 可用命令

| 命令                   | 说明                 |
| ---------------------- | -------------------- |
| `pnpm dev`             | 启动开发服务器       |
| `pnpm build`           | 构建生产包           |
| `pnpm test`            | 运行测试（监听模式） |
| `pnpm test:nowatch`    | 运行测试（一次性）   |
| `pnpm storybook`       | 启动 Storybook       |
| `pnpm build-storybook` | 构建 Storybook       |
| `pnpm lint`            | 检查代码规范         |
| `pnpm lint:fix`        | 修复代码规范         |
| `pnpm lint:css`        | 检查样式规范         |
| `pnpm format`          | 格式化代码           |

## 🤝 参与贡献

欢迎贡献代码！请遵循以下步骤：

1. **Fork** 本仓库
2. **创建特性分支** - `git checkout -b feat/your-feature`
3. **提交代码** - `git commit -m "feat: add your feature"`
4. **推送分支** - `git push origin feat/your-feature`
5. **提交 Pull Request**

### 提交规范

本项目使用 Commitlint 规范提交信息。请使用以下格式：

```
feat: 新增功能
fix: 修复问题
docs: 文档更新
style: 代码格式
refactor: 代码重构
test: 测试相关
chore: 构建/依赖更新
```

快速提交: `pnpm commit`

## 📄 许可证

MIT License © 2024 ZiXuan

## 🔗 相关资源

- **仓库**: [Gitee](https://gitee.com/nie-li-xie-zi/instant-ui_project)
- **NPM**: [@xiex11/instant-ui](https://www.npmjs.com/package/@xiex11/instant-ui)

## 👨‍💻 作者

**ZiXuan**

---

有任何问题或建议？欢迎提出 Issue 或 PR！
