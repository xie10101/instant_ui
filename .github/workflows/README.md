# GitHub Actions 工作流说明

## 📋 工作流概述

本项目配置了三个自动化工作流，用于持续集成和发布流程。

### 🔄 工作流列表

#### 1. **CI/CD 流程** (`ci.yml`)

- **触发条件**: Push 到 main/develop/master 分支，或提交 PR
- **执行步骤**:
  - ✅ Node.js 环境设置（18.x 和 20.x 版本）
  - 📥 安装项目依赖
  - 🔍 **ESLint 代码检查** - 确保代码规范
  - 🎨 **Stylelint 样式检查** - 检查 CSS/SCSS 规范
  - ✅ **Jest 单元测试** - 运行所有测试
  - 🔨 **项目构建** - 生成生产代码
  - 📝 测试覆盖率报告
  - ✨ Prettier 格式检查

**重要**: ESLint 和 Jest 失败会中断流程，其他检查失败会继续执行但标记为通过。

---

#### 2. **发布到 NPM** (`publish.yml`)

- **触发条件**:
  - 创建/发布 Release 标签
  - 手动触发（在 Actions 选项卡中）
- **执行步骤**:
  - 🔍 代码规范检查（严格模式）
  - ✅ 单元测试
  - 🔨 项目构建
  - 📤 **发布到 NPM** 公开包
  - 🎉 发布完成

**前置条件**:

- 需要配置 `NPM_TOKEN` Secret（必需）
- 需要在 package.json 中更新版本号
- 所有 CI/CD 检查必须通过

---

#### 3. **TypeScript 类型检查** (`typescript-check.yml`)

- **触发条件**: Push 到 main/develop/master 分支，或提交 PR
- **执行步骤**:
  - 📥 安装依赖
  - ✅ **TypeScript 编译检查** - 验证类型定义的正确性

---

## 🔐 必需的 GitHub Secrets 配置

### NPM 发布需要

1. **NPM_TOKEN** (必需)
   - 从 npm.com 账户生成
   - 步骤:
     1. 登录 [npm.com](https://www.npmjs.com/)
     2. 进入 Account Settings → Access Tokens
     3. 生成新的 Automation token
     4. 复制 token
     5. 在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加
     6. 名称: `NPM_TOKEN`，值: 粘贴 token

---

## 🚀 使用指南

### 自动触发工作流

1. **代码规范检查和测试**

   ```bash
   git push origin main
   # 自动触发 CI/CD 和 TypeScript 检查
   ```

2. **发布新版本到 NPM**
   - 方式 1: 创建 Release
     ```bash
     git tag v1.2.1
     git push origin v1.2.1
     # GitHub 会自动创建 Release 并触发发布
     ```
   - 方式 2: 手动触发
     1. 在 GitHub 仓库中点击 Actions 选项卡
     2. 选择 "📦 发布到 NPM" 工作流
     3. 点击 "Run workflow"
     4. 选择分支和发布类型

### 查看工作流执行情况

1. 进入仓库的 **Actions** 选项卡
2. 查看最近的工作流执行记录
3. 点击具体工作流查看详细日志
4. 查看每个 Step 的执行结果和输出

---

## ✅ 本地验证

在推送前可以本地验证：

```bash
# 代码规范检查
pnpm lint
pnpm lint:css

# 运行测试
pnpm test:nowatch

# 类型检查
pnpm build-ts

# 项目构建
pnpm build

# 或者一键执行所有预发布检查
pnpm prepublish
```

---

## 🐛 故障排查

| 问题         | 解决方案                                       |
| ------------ | ---------------------------------------------- |
| ESLint 失败  | 运行 `pnpm lint:fix` 修复问题                  |
| 测试失败     | 运行 `pnpm test` 查看失败详情                  |
| 类型错误     | 检查 TypeScript 类型定义，运行 `pnpm build-ts` |
| NPM 发布失败 | 确保 NPM_TOKEN 已正确配置，检查包名和版本      |
| 依赖安装失败 | 清除缓存后重试，或手动检查 pnpm-lock.yaml      |

---

## 📚 工作流更新

如需修改工作流配置（如添加新的检查步骤），编辑 `.github/workflows/` 目录下的相应 `.yml` 文件即可。

更新会在下一次推送时生效。

---

## 🔗 参考资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Node.js 在 GitHub Actions 中的使用](https://github.com/actions/setup-node)
- [pnpm 在 GitHub Actions 中的使用](https://github.com/pnpm/action-setup)
