# AGENTS.md

## 项目背景

这是 ant-design/ant-design（antd）的源代码仓库，是一个 React 组件库，发布为 npm 包 antd。

- 使用 TypeScript 和 React 开发
- 兼容 React 16 ~ 19 版本
- 组件库设计精美，功能完善，广泛应用于企业级中后台产品
- 遵循 Ant Design 设计规范
- 支持国际化

## 安装和设置

### 开发环境要求

- Node.js 版本 >= 16
- 推荐使用 npm 或 yarn
- Chrome 80+ 浏览器兼容性

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发命令

```bash
npm start     # 启动开发服务器
npm run build # 构建项目
npm test      # 运行测试
npm run lint  # 代码检查
```

## 代码风格指南

### 基本编码规范

- 使用 TypeScript 和 React 书写
- 使用函数式组件和 hooks，避免类组件
- 使用提前返回（early returns）提高代码可读性
- 避免引入新依赖，严控打包体积
- 兼容 Chrome 80+ 浏览器
- 支持服务端渲染
- 保持向下兼容，避免 breaking change
- 组件名使用大驼峰（PascalCase）
- 属性名使用小驼峰（camelCase）
- 合理使用 React.memo、useMemo 和 useCallback 优化性能

### 命名规范

Antd 命名要求使用**完整名称**而非缩写。

#### Props 命名

- 初始化属性：`default` + `PropName`
- 强制渲染：`forceRender`
- 子组件强制渲染：`force` + `Sub Component Name` + `Render`
- 子组件渲染：`Sub Component Name` + `Render`
- 数据源：`dataSource`
- 面板开启：使用 `open`，避免使用 `visible`
- 显示相关：`show` + `PropName`
- 功能性：`PropName` + `able`
- 禁用：`disabled`
- 额外内容：`extra`
- 图标：`icon`
- 触发器：`trigger`
- 类名：`className`

#### 事件命名

- 触发事件：`on` + `EventName`
- 子组件事件：`on` + `SubComponentName` + `EventName`
- 前置事件：`before` + `EventName`
- 后置事件：`after` + `EventName`
- 连续动作完成：`on` + `EventName` + `Complete`

#### 组件引用

组件应提供 `ref` 属性，结构如下：

```tsx
ComponentRef {
  nativeElement: HTMLElement;
  focus: VoidFunction;
  // 其他函数
}
```

#### 组件 Token 命名

格式：`variant (optional)` + `semantic part` + `semantic part variant (optional)` + `css property` + `size/disabled (optional)`

### API 文档规范

| Property  | Description | Type                         | Default      |
| --------- | ----------- | ---------------------------- | ------------ |
| htmlType  | xxx         | string                       | `button `    |
| type      | xxx         | `horizontal ` \| `vertical ` | `horizontal` |
| disabled  | xxx         | boolean                      | false        |
| minLength | xxx         | number                       | 0            |
| style     | xxx         | CSSProperties                | -            |

#### API 文档要求

- 字符串类型的默认值使用反引号
- 布尔类型直接使用 true 或 false
- 数字类型直接使用数字
- 函数类型使用箭头函数表达式
- 无默认值使用 `-`
- 描述首字母大写，结尾无句号
- API 按字母顺序排列

## TypeScript 规范

### 基本原则

- 所有组件和函数必须提供准确的类型定义
- 避免使用 `any` 类型，尽可能精确地定义类型
- 使用接口而非类型别名定义对象结构
- 导出所有公共接口类型，方便用户使用
- 严格遵循 TypeScript 类型设计原则，确保类型安全
- 确保编译无任何类型错误或警告

### 组件类型定义

- 组件 props 应使用 interface 定义，便于扩展
- 组件 props 接口命名应为 `ComponentNameProps`
- 为组件状态定义专门的接口，如 `ComponentNameState`
- 复杂的数据结构应拆分为多个接口定义
- 组件的 ref 类型应该明确定义，使用 `React.ForwardRefRenderFunction`
- 所有回调函数类型应明确定义参数和返回值

### 类型使用最佳实践

- 适当使用泛型增强类型灵活性
- 使用交叉类型（&）合并多个类型
- 使用字面量联合类型定义有限的选项集合
- 避免使用 `enum`，优先使用联合类型和 `as const`
- 尽可能依赖 TypeScript 的类型推断
- 只在必要时使用类型断言（as）

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

- 组件应支持在不同屏幕尺寸下良好展示
- 所有组件必须支持暗色模式
- 组件应支持从右到左（RTL）的阅读方向
- 使用 CSS 逻辑属性（如 margin-inline-start）替代方向性属性（如 margin-left）
- 支持通过 ConfigProvider 进行主题定制

### 动画效果

- 使用 CSS 过渡实现简单动画
- 复杂动画使用 rc-motion 实现
- 尊重用户的减少动画设置（prefers-reduced-motion）
- 动画时长和缓动函数应保持一致性
- 动画不应干扰用户的操作和阅读体验

### 可访问性样式

- 遵循 WCAG 2.1 AA 级别标准
- 确保焦点状态有明显的视觉提示
- 提供足够的色彩对比度
- 不依赖颜色来传达信息
- 支持用户放大页面至 200% 时的正常布局
- 避免使用会导致闪烁的动画

## 测试指南

### 测试框架和工具

- 使用 Jest 和 React Testing Library 编写单元测试
- 对 UI 组件使用快照测试 (Snapshot Testing)
- 测试覆盖率要求 100%
- 测试文件放在 **tests** 目录，命名格式为：index.test.tsx 或 xxx.test.tsx

### 运行测试

```bash
npm test                    # 运行所有测试
npm test -- --watch       # 监听模式
npm run test:coverage     # 生成覆盖率报告
```

## 演示代码规范

### Demo 基本要求

- demo 代码尽可能简洁
- 避免冗余代码，方便用户复制到项目直接使用
- 每个 demo 聚焦展示一个功能点
- 提供中英文两个版本的说明
- 遵循展示优先原则，确保视觉效果良好
- 展示组件的主要使用场景
- 按照由简到繁的顺序排列 demo

### 文件组织

- 每个组件演示包含 `.md`（说明文档）和 `.tsx`（实际代码）两个文件
- 位置：组件目录下的 `demo` 子目录，如 `components/button/demo/`
- 命名：短横线连接的小写英文单词，如 `basic.tsx`、`custom-filter.tsx`
- 文件名应简洁地描述示例内容

### TSX 代码规范

- 导入顺序：React → 依赖库 → 组件库 → 自定义组件 → 类型 → 样式
- 类型：为复杂数据定义清晰接口，避免 `any`
- 使用函数式组件和 Hooks
- 2空格缩进，箭头函数，驼峰命名
- 优先使用 antd 内置组件，减少外部依赖
- 性能优化：适当使用 `useMemo`/`useCallback`，清理副作用

## 国际化规范

### 类型定义

antd 的本地化配置的类型定义的入口文件是 `components/locale/index.tsx`，当需要添加新的本地化配置时，需要检查对应组件或全局配置的类型是否存在，如果不存在，则需要增加相应的类型描述。

### 本地化配置

- 本地化配置文件命名规则：`*_*.ts`，如：`zh_CN.ts`
- 通常在为 antd 添加后修改某一项本地化配置时，如无特殊说明，需要同时修改所有语言的本地化配置
- 本地化配置的内容通常是纯字符串
- 带有 `${}` 的变量将在实际使用的地方被实时替换成对应的变量内容

### 使用本地化

使用 `components/locale/index.tsx` 文件中导出的 `useLocale` 获取全局上下文中配置的本地化：

```tsx
import { useLocale } from '../locale';
import enUS from '../locale/en_US';

export function TestComp(props) {
  const { locale: propLocale } = props;
  const [contextLocale] = useLocale('TestComp', enUs);

  const locale = { ...contextLocale, ...propLocale };

  return <div title={locale?.title}>{locale?.text}</div>;
}
```

## 文档和 Changelog 规范

### 基本要求

- 提供中英文两个版本
- 新的属性需要声明可用的版本号
- 属性命名符合 antd 的 API 命名规则

### Changelog 规范

- 在 CHANGELOG.en-US.md 和 CHANGELOG.zh-CN.md 书写每个版本的变更
- 对用户使用上无感知的改动建议不要提及，保持 CHANGELOG 的内容有效性
- 用面向开发者的角度和叙述方式撰写 CHANGELOG
- 描述用户的原始问题，而非解决方式
- 尽量给出原始的 PR 链接，社区提交的 PR 改动加上提交者的链接

### Changelog Emoji 规范

- 🐞 Bug 修复
- 💄 样式更新或 token 更新
- 🆕 新增特性，新增属性
- 🔥 极其值得关注的新增特性
- 🇺🇸🇨🇳🇬🇧 国际化改动
- 📖 📝 文档或网站改进
- ✅ 新增或更新测试用例
- 🛎 更新警告/提示信息
- ⌨️ ♿ 可访问性增强
- 🗑 废弃或移除
- 🛠 重构或工具链优化
- ⚡️ 性能提升

## Git 和 Pull Request 规范

### 分支管理

禁止直接提交到以下保护分支：

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

- 功能开发：`feat/description-of-feature`
- 问题修复：`fix/issue-number-or-description`
- 文档更新：`docs/what-is-changed`
- 代码重构：`refactor/what-is-changed`
- 样式修改：`style/what-is-changed`
- 测试相关：`test/what-is-changed`
- 构建相关：`build/what-is-changed`
- 持续集成：`ci/what-is-changed`
- 性能优化：`perf/what-is-changed`
- 依赖升级：`deps/package-name-version`

### 分支命名注意事项

1. 使用小写字母
2. 使用连字符（-）分隔单词
3. 简短但具有描述性
4. 避免使用下划线或其他特殊字符
5. 如果与 Issue 关联，可以包含 Issue 编号

### Pull Request 规范

#### PR 标题

- PR 标题始终使用英文
- 遵循格式：`类型: 简短描述`
- 例如：`fix: fix button style issues in Safari browser`
- 例如：`feat: add dark mode support`

#### PR 内容

- PR 内容默认使用英文
- 尽量简洁清晰地描述改动内容和目的
- 可以视需要在英文描述后附上中文说明

#### PR 模板

提交 PR 时请使用项目中提供的模板：

- 英文模板（推荐）：PULL_REQUEST_TEMPLATE.md
- 中文模板：PULL_REQUEST_TEMPLATE_CN.md

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

## 质量保证

### 代码质量要求

- 确保代码运行正常，无控制台错误
- 适配常见浏览器
- 避免过时 API，及时更新到新推荐用法
- 测试覆盖率达到 100%
- 通过所有 ESLint 和 TypeScript 检查

### 性能要求

- 避免不必要的重新渲染
- 合理使用 React.memo、useMemo 和 useCallback
- 样式计算应当高效，避免重复计算
- 图片和资源应当优化
- 支持 Tree Shaking

### 兼容性要求

- 支持 React 16 ~ 19 版本
- 兼容 Chrome 80+ 浏览器
- 支持服务端渲染
- 保持向下兼容，避免 breaking change
- 支持 TypeScript 4.0+

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

## 参考资料

- [API Naming Rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules)
- [#16048](https://github.com/ant-design/ant-design/issues/16048) - Current listing api & Chinese version
- [#25066](https://github.com/ant-design/ant-design/issues/25066) - API standard in the document

## 特别说明

如果使用 AI 编程助手（如 Cursor）进行开发，请在提交 PR 时在末尾标注：`> Submitted by Cursor`
