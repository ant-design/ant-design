# Ant Design 项目开发指南

> 本文件为 AI 编程助手提供项目上下文和开发规范。

## 项目信息

- React 组件库，发布为 npm 包 `antd`
- 使用 TypeScript 和 React 开发
- 采用 CSS-in-JS 架构（基于 `@ant-design/cssinjs`）
- 支持 Design Token 主题系统、暗色模式、RTL 布局、SSR、国际化（150+ 语言）

### 项目结构

```
ant-design/
├── components/              # 组件源代码（84+ 组件）
│   ├── component-name/      # 单个组件目录
│   │   ├── ComponentName.tsx      # 主组件实现
│   │   ├── demo/                  # 演示代码（*.tsx 和 *.md）
│   │   ├── style/                 # 样式系统（index.ts / token.ts）
│   │   ├── __tests__/            # 单元测试
│   │   ├── index.en-US.md        # 英文文档
│   │   ├── index.zh-CN.md        # 中文文档
│   │   └── index.tsx             # 导出入口
│   ├── _util/                   # 共享工具函数库
│   ├── theme/                   # 主题系统
│   └── locale/                  # 国际化文本
├── tests/                       # 测试工具和共享测试
├── docs/                        # 站点文档
├── CHANGELOG.zh-CN.md           # 中文更新日志
└── CHANGELOG.en-US.md           # 英文更新日志
```

---

## 代码规范

### 基本编码规范

- ✅ 使用函数式组件和 Hooks，**避免类组件**
- ✅ 使用 `forwardRef` 实现组件 ref 传递
- ✅ 使用 `clsx` 处理类名拼接
- ✅ 使用 `displayName` 设置组件调试名称
- ✅ 使用 `devUseWarning` 提供开发时 API 过期警告
- ✅ 支持 Semantic 样式系统（`classNames` 和 `styles` 属性）
- ✅ 组件名大驼峰（PascalCase），属性名小驼峰（camelCase）
- ✅ 面板开启状态使用 `open`，避免使用 `visible`
- ✅ 避免引入新依赖，严控打包体积
- ✅ 保持向下兼容，避免 breaking change
- ✅ **所有文件必须以换行符结尾**，避免 `final-newline` lint 警告

### Props 命名规范

| 用途 | 命名规则 | 示例 |
|---|---|---|
| 初始化属性 | `default` + `PropName` | `defaultValue`、`defaultOpen` |
| 子组件渲染 | `SubComponentName` + `Render` | `titleRender`、`footerRender` |
| 强制渲染 | `force` + `SubComponentName` + `Render` | `forcePanelRender` |
| 数据源 | `dataSource` | `dataSource` |
| 面板开启 | 使用 `open`，避免 `visible` | `open`、`defaultOpen` |
| 显示相关 | `show` + `PropName` | `showSearch`、`showHeader` |
| 禁用 | `disabled` | `disabled` |

### 事件命名规范

| 类型 | 命名规则 | 示例 |
|---|---|---|
| 触发事件 | `on` + `EventName` | `onClick`、`onChange` |
| 子组件事件 | `on` + `SubComponentName` + `EventName` | `onPanelChange` |
| 前置/后置事件 | `before`/`after` + `EventName` | `beforeUpload`、`afterClose` |

### 组件 Ref 结构

- 组件应提供 `ref`，包含 `nativeElement`、`focus`、`blur` 等属性

---

## 样式规范

### Token 系统

- 避免硬编码颜色、尺寸、间距等值，使用 Design Token
- 组件级 Token 命名格式：`variant (optional)` + `semantic part` + `css property` + `size/disabled (optional)`
- 示例：`buttonPrimaryColor`、`inputPaddingBlock`、`menuItemActiveBg`
- 使用 `mergeToken` 合并 token，使用 `calc` 处理 CSS 计算值

### 关键要求

- ✅ 使用 CSS 逻辑属性（如 `margin-inline-start`）替代方向性属性
- ✅ 所有组件必须支持暗色模式和 RTL 布局
- ✅ 样式生成函数命名：`gen[ComponentName]Style`
- ✅ 使用 `hashId` 确保样式唯一性，使用 `cssVarCls` 支持 CSS 变量
- ✅ 动画时长和缓动函数使用 Token：`motionDurationMid`、`motionEaseInOut`

---

## 测试指南

- 使用 **Jest** 和 **React Testing Library** 编写测试
- 测试覆盖率要求 **100%**
- 测试文件放在 `__tests__/` 目录

### 测试文件类型

| 文件名 | 用途 |
|---|---|
| `index.test.tsx` | 组件功能测试 |
| `a11y.test.ts` | 可访问性测试 |
| `type.test.tsx` | TypeScript 类型测试 |
| `demo.test.ts` | Demo 代码测试 |

### 测试最佳实践

- ✅ 测试用户行为而非实现细节
- ✅ 每个测试用例应独立，不依赖其他测试
- ✅ 新增功能必须有对应的测试用例
- ✅ 组件应同时包含 `mountTest` 和 `rtlTest`

---

## 演示代码规范

- 每个 demo 聚焦展示一个功能点，代码尽可能简洁
- 文件位置：`components/组件名/demo/`，包含 `.md`（说明）和 `.tsx`（代码）
- 文件名：短横线连接的小写英文，如 `basic.tsx`、`custom-filter.tsx`
- 提供中英文两个版本的说明
- 按由简到繁的顺序排列

---

## 文档规范

### API 表格格式

| Property | Description | Type | Default | Version |
|---|---|---|---|---|
| disabled | 是否禁用 | boolean | false | - |
| type | 按钮类型 | `primary` \| `default` | `default` | - |

- 字符串默认值用反引号，布尔/数字直接写，无默认值用 `-`
- API 按字母顺序排列，新增属性需声明版本号

### 文档锚点 ID 规范

- 中文标题必须手动指定英文锚点：`## 中文标题 {#english-anchor-id}`
- 锚点 ID 符合 `^[a-zA-Z][\w-:\.]*$`，长度不超过 32 字符
- FAQ 章节下的锚点必须以 `faq-` 为前缀
- 同一问题的中英文锚点保持一致

### 国际化规范

- 本地化配置文件：`components/locale/`，命名如 `zh_CN.ts`、`en_US.ts`
- 添加或修改本地化配置时，需同时修改所有语言文件
- 类型入口：`components/locale/index.tsx`

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
|---|---|---|
| 中文 | `Emoji 组件名 动词/描述` | `🐞 Button 修复暗色主题下 \`color\` 的问题。` |
| 英文 | `Emoji 动词 组件名 描述`（动词在前） | `🐞 Fix Button reversed \`hover\` colors in dark theme.` |

#### 分组逻辑

- 同一组件有 2 条以上改动时，使用 `- 组件名` 作为分类标题
- 单项改动直接写单行条目

### Emoji 规范

| Emoji  | 用途                   |
|--------|------------------------|
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
