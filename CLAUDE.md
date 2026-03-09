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
- 使用 `forwardRef` 实现组件 ref 传递
- 使用 `clsx` 处理类名拼接
- 使用 `displayName` 设置组件调试名称
- 支持 Semantic 样式系统（`classNames` 和 `styles` 属性）
- 组件名使用大驼峰（PascalCase）
- 属性名使用小驼峰（camelCase）
- 面板开启状态使用 `open`，避免使用 `visible`
- 测试覆盖率要求 100%
- **所有文件必须以换行符结尾**，避免 `final-newline` lint 警告

---

## PR 规范

### 标题与内容

- PR 标题始终使用英文，格式：`类型: 简短描述`
- PR 内容默认使用英文
- 示例：`fix: fix button style issues in Safari browser`

### PR 模板（必须使用）

- 英文模板：`.github/PULL_REQUEST_TEMPLATE.md`
- 中文模板：`.github/PULL_REQUEST_TEMPLATE_CN.md`
- 使用 `gh pr create` 创建 PR 时，必须手动填充模板内容

### 分支策略

- 新特性开发需基于 `feature` 分支，PR 目标分支也需为 `feature`
- 其余提交至 `master` 分支
- 分支命名规范：
  - 功能开发：`feat/description-of-feature`
  - 问题修复：`fix/issue-number-or-description`
  - 文档更新：`docs/what-is-changed`
  - 代码重构：`refactor/what-is-changed`

### PR 改动类型

- 🆕 新特性提交
- 🐞 Bug 修复
- 📝 文档改进
- 📽️ 演示代码改进
- 💄 样式/交互改进
- 🤖 TypeScript 更新
- 📦 包体积优化
- ⚡️ 性能优化
- 🌐 国际化改进

---

## Changelog 规范

### 核心原则

- 文件位置：`CHANGELOG.en-US.md` 和 `CHANGELOG.zh-CN.md`
- 必须同时提供中英文两个版本
- 忽略用户无感知的改动（内部重构、纯测试更新、工具链优化等）
- 描述"对开发者的影响"，而非"具体的实现细节"
- 尽量给出 PR 链接，社区 PR 加贡献者链接

### 格式规范

#### 条目格式

- **Emoji 置顶**：每条以 Emoji 开头
- **不加冒号**：组件名后不使用英文冒号
- **每条必含组件名**：正文必须出现对应组件名
- **组件名不用反引号**：Modal、Button 等；属性名/API 用反引号
- **中英空格**：中文与英文、数字、链接之间保留一个空格

#### 句式

| 语言 | 格式 | 示例 |
| --- | --- | --- |
| 中文 | `Emoji 组件名 动词/描述` | `🐞 Button 修复暗色主题下 \`color\` 的问题。` |
| 英文 | `Emoji 动词 组件名 描述`（动词在前） | `🐞 Fix Button reversed \`hover\` colors in dark theme.` |

#### 分组逻辑

- 同一组件有 2 条以上改动时，使用 `- 组件名` 作为分类标题
- 单项改动直接写单行条目

### Emoji 规范

| Emoji  | 用途                   |
| ------ | ---------------------- |
| 🐞     | 修复 Bug               |
| 💄     | 样式更新或 token 更新  |
| 🆕     | 新增特性 / 新增属性    |
| 🔥     | 极其值得关注的新增特性 |
| 🇺🇸🇨🇳🇬🇧 | 国际化改动             |
| 📖 📝  | 文档或网站改进         |
| ✅     | 新增或更新测试用例     |
| 🛎     | 更新警告/提示信息      |
| ⌨️ ♿  | 可访问性增强           |
| 🗑     | 废弃或移除             |
| 🛠     | 重构或工具链优化       |
| ⚡️     | 性能提升               |

### 示例

**中文**：

```markdown
- Button
  - 🐞 Button 修复暗色主题下 `color` 的 `hover` 与 `active` 状态颜色相反的问题。[#56872](链接) [@zombieJ](链接)
- 💄 Modal 默认关闭蒙层 blur 效果。[#56781](链接) [@aojunhao123](链接)
```

**英文**：

```markdown
- Button
  - 🐞 Fix Button reversed `hover` and `active` colors for `color` in dark theme. [#56872](link) [@zombieJ](link)
- 💄 Disable Modal mask blur effect by default. [#56781](link) [@aojunhao123](link)
```

---

**详细规范请查阅 [AGENTS.md](./AGENTS.md)**
