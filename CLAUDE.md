# Ant Design 项目开发指南

> 本文件为 Claude Code 提供项目上下文，在每次会话开始时自动加载。
>
> 完整的开发规范请查阅 [AGENTS.md](./AGENTS.md)

## 快速参考

### 项目信息

- React 组件库，发布为 npm 包 `antd`
- 使用 TypeScript 和 React 开发
- 采用 CSS-in-JS 架构（基于 `@ant-design/cssinjs`）
- 支持 Design Token 主题系统

### 常用命令

```bash
npm start              # 启动开发服务器（http://127.0.0.1:8001）
npm run build          # 完整构建
npm test               # 运行测试
npm run lint           # 代码检查
npm run format         # 代码格式化
```

### 核心规范

- 使用函数式组件和 Hooks，避免类组件
- 组件名使用大驼峰（PascalCase）
- 属性名使用小驼峰（camelCase）
- 面板开启状态使用 `open`，避免使用 `visible`
- 测试覆盖率要求 100%

### PR 规范

- 提交 PR 时使用模板：`.github/PULL_REQUEST_TEMPLATE.md`（英文）或 `.github/PULL_REQUEST_TEMPLATE_CN.md`（中文）
- 新特性提交至 `feature` 分支，其余提交至 `master` 分支

### Changelog 规范

- 需同时提供中英文两个版本
- 每条必须包含组件名和 Emoji 前缀
- 中文：`Emoji 组件名 描述`
- 英文：`Emoji 动词 组件名 描述`

---

**详细规范请查阅 [AGENTS.md](./AGENTS.md)**