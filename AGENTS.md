# AGENTS.md

> Ant Design 项目开发指南 - 为 AI 编程助手提供项目上下文和开发规范

## 📑 目录

- [项目背景](#项目背景)
- [快速开始](#快速开始)
- [代码规范](#代码规范)
  - [基本编码规范](#基本编码规范)
  - [命名规范](#命名规范)
  - [TypeScript 规范](#typescript-规范)
  - [样式规范](#样式规范)
- [开发指南](#开发指南)
  - [测试指南](#测试指南)
  - [演示代码规范](#演示代码规范)
  - [国际化规范](#国际化规范)
- [文档和 Changelog](#文档和-changelog-规范)
- [Git 和 Pull Request](#git-和-pull-request-规范)
- [质量保证](#质量保证)
- [工具链和环境](#工具链和环境)

---

## 项目背景

这是 [ant-design/ant-design](https://github.com/ant-design/ant-design)（antd）的源代码仓库，是一个 React 组件库，发布为 npm 包 `antd`。

### 核心特性

- 使用 TypeScript 和 React 开发
- 兼容 React 18 ~ 19 版本
- 组件库设计精美，功能完善，广泛应用于企业级中后台产品
- 遵循 Ant Design 设计规范
- 支持国际化（i18n）
- 支持主题定制和暗色模式
- 支持 RTL（从右到左）布局

---

## 快速开始

### 开发环境要求

- **Node.js**: >= 16
- **包管理器**: npm 或 utoo
- **浏览器兼容性**: Chrome 80+
- **编辑器**: VS Code（推荐）或其他支持 TypeScript 的编辑器

### 安装依赖

```bash
npm install
# 或
utoo install
```

### 常用开发命令

```bash
# 启动开发服务器（访问 http://127.0.0.1:8001）
npm start

# 编译 TypeScript 代码到 lib 和 es 目录
npm run compile

# 构建 UMD 格式的构建产物
npm run build

# 运行所有测试
npm test

# 监听模式运行测试
npm test -- --watch

# 生成测试覆盖率报告
npm run test:coverage

# 代码检查（包括 TypeScript、ESLint、Biome、Markdown、Changelog）
npm run lint

# 格式化代码
npm run format

# 生成 Changelog（交互式）
npm run changelog

# 清理构建产物
npm run clean
```

### 项目结构

```
ant-design/
├── components/          # 组件源代码
│   └── [component]/     # 单个组件目录
│       ├── demo/        # 演示代码
│       ├── style/       # 样式文件
│       ├── index.tsx     # 组件入口
│       └── index.zh-CN.md # 组件文档
├── scripts/             # 构建和工具脚本
├── tests/               # 测试文件
├── CHANGELOG.zh-CN.md   # 中文更新日志
├── CHANGELOG.en-US.md   # 英文更新日志
└── package.json         # 项目配置
```

---

## 代码规范

### 基本编码规范

- ✅ 使用 TypeScript 和 React 书写
- ✅ 使用函数式组件和 Hooks，**避免类组件**
- ✅ 使用提前返回（early returns）提高代码可读性
- ✅ 避免引入新依赖，严控打包体积
- ✅ 兼容 Chrome 80+ 浏览器
- ✅ 支持服务端渲染（SSR）
- ✅ 保持向下兼容，避免 breaking change
- ✅ 组件名使用大驼峰（PascalCase），如 `Button`、`DatePicker`
- ✅ 属性名使用小驼峰（camelCase），如 `onClick`、`defaultValue`
- ✅ 合理使用 `React.memo`、`useMemo` 和 `useCallback` 优化性能

#### Props 命名

| 用途           | 命名规则                                | 示例                          |
| -------------- | --------------------------------------- | ----------------------------- |
| 初始化属性     | `default` + `PropName`                  | `defaultValue`、`defaultOpen` |
| 强制渲染       | `forceRender`                           | `forceRender`                 |
| 子组件强制渲染 | `force` + `SubComponentName` + `Render` | `forcePanelRender`            |
| 子组件渲染     | `SubComponentName` + `Render`           | `titleRender`、`footerRender` |
| 数据源         | `dataSource`                            | `dataSource`                  |
| 面板开启       | 使用 `open`，避免使用 `visible`         | `open`、`defaultOpen`         |
| 显示相关       | `show` + `PropName`                     | `showSearch`、`showHeader`    |
| 功能性         | `PropName` + `able`                     | `disabled`、`readable`        |
| 禁用           | `disabled`                              | `disabled`                    |
| 额外内容       | `extra`                                 | `extra`                       |
| 图标           | `icon`                                  | `icon`、`prefixIcon`          |
| 触发器         | `trigger`                               | `trigger`                     |
| 类名           | `className`                             | `className`                   |

#### 事件命名

| 类型         | 命名规则                                | 示例                  |
| ------------ | --------------------------------------- | --------------------- |
| 触发事件     | `on` + `EventName`                      | `onClick`、`onChange` |
| 子组件事件   | `on` + `SubComponentName` + `EventName` | `onPanelChange`       |
| 前置事件     | `before` + `EventName`                  | `beforeUpload`        |
| 后置事件     | `after` + `EventName`                   | `afterClose`          |
| 连续动作完成 | `on` + `EventName` + `Complete`         | `onUploadComplete`    |

#### 组件引用（Ref）

组件应提供 `ref` 属性，结构如下：

```tsx
interface ComponentRef {
  nativeElement: HTMLElement;
  focus: VoidFunction;
  blur: VoidFunction;
  // 其他方法...
}
```

#### 组件 Token 命名

格式：`variant (optional)` + `semantic part` + `semantic part variant (optional)` + `css property` + `size/disabled (optional)`

示例：

- `buttonPrimaryColor` - Button 主色
- `inputPaddingBlock` - Input 垂直内边距
- `menuItemActiveBg` - Menu 激活项背景色

### API 文档规范

#### API 表格格式

| Property  | Description     | Type                                                   | Default   |
| --------- | --------------- | ------------------------------------------------------ | --------- |
| htmlType  | Button 原生类型 | string                                                 | `button`  |
| type      | 按钮类型        | `primary` \| `default` \| `dashed` \| `link` \| `text` | `default` |
| disabled  | 是否禁用        | boolean                                                | false     |
| minLength | 最小长度        | number                                                 | 0         |
| style     | 自定义样式      | CSSProperties                                          | -         |

#### API 文档要求

- ✅ 字符串类型的默认值使用反引号包裹，如 `` `button` ``
- ✅ 布尔类型直接使用 `true` 或 `false`
- ✅ 数字类型直接使用数字，如 `0`、`100`
- ✅ 函数类型使用箭头函数表达式，如 `(e: Event) => void`
- ✅ 无默认值使用 `-`
- ✅ 描述首字母大写，结尾无句号
- ✅ API 按字母顺序排列

---

## TypeScript 规范

### 基本原则

- ✅ 所有组件和函数必须提供准确的类型定义
- ✅ 避免使用 `any` 类型，尽可能精确地定义类型
- ✅ 使用接口（interface）而非类型别名（type）定义对象结构
- ✅ 导出所有公共接口类型，方便用户使用
- ✅ 严格遵循 TypeScript 类型设计原则，确保类型安全
- ✅ 确保编译无任何类型错误或警告

### 组件类型定义

```tsx
// ✅ 正确：使用 interface 定义 Props
interface ButtonProps {
  type?: 'primary' | 'default' | 'dashed';
  onClick?: (e: React.MouseEvent) => void;
}

// ❌ 错误：避免使用 type 定义对象结构
type ButtonProps = {
  type?: 'primary' | 'default';
};

// ✅ 正确：组件 Props 接口命名
interface ComponentNameProps {
  // ...
}

// ✅ 正确：组件状态接口命名
interface ComponentNameState {
  // ...
}

// ✅ 正确：使用 ForwardRefRenderFunction 定义 ref
const Component = React.forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  // ...
});
```

### 类型使用最佳实践

- ✅ 适当使用泛型增强类型灵活性
- ✅ 使用交叉类型（&）合并多个类型
- ✅ 使用字面量联合类型定义有限的选项集合
- ✅ 避免使用 `enum`，优先使用联合类型和 `as const`
- ✅ 尽可能依赖 TypeScript 的类型推断
- ✅ 只在必要时使用类型断言（`as`）

```tsx
// ✅ 推荐：使用联合类型和 as const
const ButtonTypes = ['primary', 'default', 'dashed'] as const;
type ButtonType = (typeof ButtonTypes)[number];

// ❌ 不推荐：使用 enum
enum ButtonType {
  Primary = 'primary',
  Default = 'default',
}
```

---

## 样式规范

### 样式方案

- 使用 `@ant-design/cssinjs` 作为样式解决方案
- 每个组件的样式应该放在 `style/` 目录下
- 样式文件应该与组件结构保持一致
- 使用 CSS-in-JS 时应当注意性能影响，避免不必要的样式重计算
- 样式生成函数应遵循 `gen[ComponentName]Style` 的命名规范
- 样式覆盖应使用类选择器而非标签选择器，提高样式特异性

### Token 系统

- 使用 Ant Design 的设计 Token 系统
- 避免硬编码颜色、尺寸、间距等值
- 组件样式应基于全局 Token 和组件级 Token
- 自定义样式应尽可能使用现有的 Token，保持一致性
- 组件级 Token 命名规范：`Component` + 属性名，如 `buttonPrimaryColor`
- 对 Token 的修改应当向下传递，确保设计系统的一致性

### 响应式和主题支持

- ✅ 组件应支持在不同屏幕尺寸下良好展示
- ✅ 所有组件必须支持暗色模式
- ✅ 组件应支持从右到左（RTL）的阅读方向
- ✅ 使用 CSS 逻辑属性（如 `margin-inline-start`）替代方向性属性（如 `margin-left`）
- ✅ 支持通过 `ConfigProvider` 进行主题定制

### 动画效果

- 使用 CSS 过渡实现简单动画
- 复杂动画使用 `@rc-component/motion` 实现
- 尊重用户的减少动画设置（`prefers-reduced-motion`）
- 动画时长和缓动函数应保持一致性
- 动画不应干扰用户的操作和阅读体验

### 可访问性样式

- 遵循 WCAG 2.1 AA 级别标准
- 确保焦点状态有明显的视觉提示
- 提供足够的色彩对比度
- 不依赖颜色来传达信息
- 支持用户放大页面至 200% 时的正常布局
- 避免使用会导致闪烁的动画

---

## 开发指南

### 测试指南

#### 测试框架和工具

- 使用 Jest 和 React Testing Library 编写单元测试
- 对 UI 组件使用快照测试（Snapshot Testing）
- 测试覆盖率要求 **100%**
- 测试文件放在 `tests/` 目录，命名格式为：`index.test.tsx` 或 `xxx.test.tsx`

#### 运行测试

```bash
npm test                    # 运行所有测试
npm test -- --watch        # 监听模式
npm run test:coverage       # 生成覆盖率报告
npm run test:image          # UI 快照测试（需要 Docker）
```

#### 测试最佳实践

- ✅ 测试用户行为而非实现细节
- ✅ 使用有意义的测试描述
- ✅ 每个测试用例应该独立，不依赖其他测试
- ✅ 测试边界情况和错误处理

### 演示代码规范

#### Demo 基本要求

- ✅ demo 代码尽可能简洁
- ✅ 避免冗余代码，方便用户复制到项目直接使用
- ✅ 每个 demo 聚焦展示一个功能点
- ✅ 提供中英文两个版本的说明
- ✅ 遵循展示优先原则，确保视觉效果良好
- ✅ 展示组件的主要使用场景
- ✅ 按照由简到繁的顺序排列 demo

#### 文件组织

- 每个组件演示包含 `.md`（说明文档）和 `.tsx`（实际代码）两个文件
- 位置：组件目录下的 `demo` 子目录，如 `components/button/demo/`
- 命名：短横线连接的小写英文单词，如 `basic.tsx`、`custom-filter.tsx`
- 文件名应简洁地描述示例内容

#### TSX 代码规范

```tsx
// ✅ 正确的导入顺序
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import type { ButtonProps } from 'antd';

import './custom.css';

// ✅ 使用函数式组件和 Hooks
const Demo: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // ...
  };

  return (
    <Space>
      <Button loading={loading} onClick={handleClick}>
        Click me
      </Button>
    </Space>
  );
};

export default Demo;
```

**规范要点**：

- 导入顺序：React → 依赖库 → 组件库 → 自定义组件 → 类型 → 样式
- 类型：为复杂数据定义清晰接口，避免 `any`
- 使用函数式组件和 Hooks
- 2 空格缩进，箭头函数，驼峰命名
- 优先使用 antd 内置组件，减少外部依赖
- 性能优化：适当使用 `useMemo`/`useCallback`，清理副作用

### 国际化规范

#### 类型定义

antd 的本地化配置的类型定义的入口文件是 `components/locale/index.tsx`，当需要添加新的本地化配置时，需要检查对应组件或全局配置的类型是否存在，如果不存在，则需要增加相应的类型描述。

#### 本地化配置

- 本地化配置文件命名规则：`*_*.ts`，如：`zh_CN.ts`、`en_US.ts`
- 通常在为 antd 添加或修改某一项本地化配置时，如无特殊说明，需要同时修改所有语言的本地化配置
- 本地化配置的内容通常是纯字符串
- 带有 `${}` 的变量将在实际使用的地方被实时替换成对应的变量内容

#### 使用本地化

```tsx
import { useLocale } from '../locale';
import enUS from '../locale/en_US';

export function TestComp(props) {
  const { locale: propLocale } = props;
  const [contextLocale] = useLocale('TestComp', enUS);

  const locale = { ...contextLocale, ...propLocale };

  return <div title={locale?.title}>{locale?.text}</div>;
}
```

---

## 文档和 Changelog 规范

### 基本要求

- ✅ 提供中英文两个版本
- ✅ 新的属性需要声明可用的版本号
- ✅ 属性命名符合 antd 的 API 命名规则

### 文档锚点 ID 规范

- 针对 Markdown 文件中的标题（# 到 ######）自动生成锚点 ID
  - 所有中文标题（H1-H6）必须手动指定一个简洁、有意义的英文锚点
  - 格式: `## 中文标题 {#english-anchor-id}`
  - 英文标题通常不需要手动指定锚点，但如果需要，可以使用相同的格式
- 锚点 ID 必须符合正则表达式 `^[a-zA-Z][\w-:\.]*$`，且长度不应超过 32 个字符
- 用于演示（demo）且包含 `-demo-` 的 id 不受前面的长度限制
- FAQ 章节下的所有标题锚点必须以 `faq-` 作为前缀
- 为确保在不同语言间切换时锚点依然有效，同一问题的中英文锚点应保持完全一致

**示例**：

- 中文标题：`### 如何使用组件 {#how-to-use-component}`
- 英文标题：`### How to Use the Component {#how-to-use-component}`

### Changelog 规范

#### 🎯 核心原则

1. **文件位置**：在 `CHANGELOG.en-US.md` 和 `CHANGELOG.zh-CN.md` 书写每个版本的变更

2. **有效性过滤**：忽略用户无感知的改动（如文档网站改进、纯测试用例更新、内部重构、工具链优化等），除非其对开发者有直接影响。保持 CHANGELOG 的内容有效性。

3. **开发者视角**：用面向开发者的角度和叙述方式撰写 CHANGELOG，描述"用户的原始问题"和"对开发者的影响"，而非"具体的解决代码"。
   - ❌ 修复 Typography 的 DOM 结构问题。
   - ✅ Typography: 💄 重构并简化了 Typography 的 DOM 结构，修复了内容空格丢失的问题。

4. **版本与命名**：
   - 新增属性必须符合 antd API 命名规则
   - 新增属性建议在描述中暗示或明确声明可用版本号

5. **双语输出**：每次处理必须同时提供 **中文版** 和 **英文版**

6. **PR 链接**：尽量给出原始的 PR 链接，社区提交的 PR 改动加上提交者的链接

#### 🎨 格式与结构规范

1. **单条条目结构**：`组件名称: 图标 描述内容 [#PR号](链接) [@贡献者]`
   - 组件名**无需加粗**，后接英文冒号和空格

2. **分组逻辑**：
   - **多项改动**：同一组件有 2 条及以上改动时，使用 `- 组件名` 作为分类标题（不加粗），具体条目缩进排列
   - **单项改动**：直接编写单行条目，不设分类标题

3. **文本细节**：
   - **代码包裹**：所有属性名、方法名、API、`role`/`aria` 属性必须使用反引号 `` ` `` 包裹
   - **中英空格**：中文与英文、数字、链接、`@` 用户名之间必须保留 **一个空格**

#### 🏷️ Emoji 规范（严格执行）

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

#### 💡 输出示例参考

**中文版**：

```markdown
- 🐞 Drawer: 修复 Drawer.PurePanel 无法响应鼠标交互的问题。[#56387](https://github.com/ant-design/ant-design/pull/56387) [@wanpan11](https://github.com/wanpan11)
- 🐞 Select: 修复 Select `options` 属性透传至原生 DOM 导致 React 未知属性警告的问题。[#56341](https://github.com/ant-design/ant-design/pull/56341) [@afc163](https://github.com/afc163)
```

**English Version**：

```markdown
- 🐞 Drawer: Fix Drawer.PurePanel failing to respond to mouse interactions. [#56387](https://github.com/ant-design/ant-design/pull/56387) [@wanpan11](https://github.com/wanpan11)
- 🐞 Select: Fix Select `options` props leaking to DOM elements and causing React unknown-prop warnings. [#56341](https://github.com/ant-design/ant-design/pull/56341) [@afc163](https://github.com/afc163)
```

---

## Git 和 Pull Request 规范

### 分支管理

**禁止直接提交到以下保护分支**：

- `master`：主分支，用于发布
- `feature`：特性分支，用于开发新版本
- `next`：下一个版本分支

### 开发流程

1. 从保护分支（通常是 `master`）创建新的功能分支
2. 在新分支上进行开发
3. 提交 Pull Request 到目标分支
4. 等待 Code Review 和 CI 通过
5. 合并到目标分支

### 分支命名规范

| 类型     | 格式                              | 示例                          |
| -------- | --------------------------------- | ----------------------------- |
| 功能开发 | `feat/description-of-feature`     | `feat/add-dark-mode`          |
| 问题修复 | `fix/issue-number-or-description` | `fix/button-style-issue`      |
| 文档更新 | `docs/what-is-changed`            | `docs/update-api-docs`        |
| 代码重构 | `refactor/what-is-changed`        | `refactor/button-component`   |
| 样式修改 | `style/what-is-changed`           | `style/fix-button-padding`    |
| 测试相关 | `test/what-is-changed`            | `test/add-button-tests`       |
| 构建相关 | `build/what-is-changed`           | `build/update-webpack-config` |
| 持续集成 | `ci/what-is-changed`              | `ci/add-github-actions`       |
| 性能优化 | `perf/what-is-changed`            | `perf/optimize-render`        |
| 依赖升级 | `deps/package-name-version`       | `deps/upgrade-react-19`       |

**分支命名注意事项**：

1. 使用小写字母
2. 使用连字符（-）分隔单词
3. 简短但具有描述性
4. 避免使用下划线或其他特殊字符
5. 如果与 Issue 关联，可以包含 Issue 编号

### Pull Request 规范

#### PR 标题

- PR 标题始终使用英文
- 遵循格式：`类型: 简短描述`
- 示例：
  - `fix: fix button style issues in Safari browser`
  - `feat: add dark mode support`

#### PR 内容

- PR 内容默认使用英文
- 尽量简洁清晰地描述改动内容和目的
- 可以视需要在英文描述后附上中文说明

#### PR 模板

提交 PR 时请使用项目中提供的模板：

- 英文模板（推荐）：`PULL_REQUEST_TEMPLATE.md`
- 中文模板：`PULL_REQUEST_TEMPLATE_CN.md`

#### PR 提交注意事项

1. **合并策略**：
   - 新特性请提交至 `feature` 分支
   - 其余可提交至 `master` 分支

2. **审核流程**：
   - PR 需要由至少一名维护者审核通过后才能合并
   - 确保所有 CI 检查都通过
   - 解决所有 Code Review 中提出的问题

3. **PR 质量要求**：
   - 确保代码符合项目代码风格
   - 添加必要的测试用例
   - 更新相关文档
   - 大型改动需要更详细的说明和更多的审核者参与

4. **工具标注**：
   - 如果是用 Cursor 提交的代码，请在 PR body 末尾进行标注：`> Submitted by Cursor`

#### PR 改动类型

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

## 质量保证

### 代码质量要求

- ✅ 确保代码运行正常，无控制台错误
- ✅ 适配常见浏览器
- ✅ 避免过时 API，及时更新到新推荐用法
- ✅ 测试覆盖率达到 100%
- ✅ 通过所有 ESLint 和 TypeScript 检查

### 性能要求

- ✅ 避免不必要的重新渲染
- ✅ 合理使用 `React.memo`、`useMemo` 和 `useCallback`
- ✅ 样式计算应当高效，避免重复计算
- ✅ 图片和资源应当优化
- ✅ 支持 Tree Shaking

### 兼容性要求

- ✅ 支持 React 18 ~ 19 版本
- ✅ 兼容 Chrome 80+ 浏览器
- ✅ 支持服务端渲染（SSR）
- ✅ 保持向下兼容，避免 breaking change
- ✅ 支持 TypeScript 4.0+

---

## 工具链和环境

### 开发工具

- 推荐使用 VS Code 或其他支持 TypeScript 的编辑器
- 配置 ESLint 和 Prettier
- 使用 TypeScript 严格模式
- 配置 Git hooks 进行代码检查

### 构建工具

- 使用 webpack 进行构建
- 支持 ES modules 和 CommonJS
- 提供 UMD 格式的构建产物
- 支持按需加载

### CI/CD

- 所有 PR 必须通过 CI 检查
- 包括单元测试、集成测试、类型检查、代码风格检查
- 自动化发布流程
- 支持多环境部署

---

## 参考资料

- [API Naming Rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules)
- [#16048](https://github.com/ant-design/ant-design/issues/16048) - Current listing api & Chinese version
- [#25066](https://github.com/ant-design/ant-design/issues/25066) - API standard in the document
- [Development Guide](https://github.com/ant-design/ant-design/wiki/Development)
