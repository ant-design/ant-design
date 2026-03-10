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
  - [代码格式化](#代码格式化)
- [开发指南](#开发指南)
  - [测试指南](#测试指南)
  - [演示代码规范](#演示代码规范)
  - [国际化规范](#国际化规范)
  - [组件开发模板](#组件开发模板)
- [文档和 Changelog](#文档和-changelog-规范)
- [Git 和 Pull Request](#git-和-pull-request-规范)
- [质量保证](#质量保证)
- [工具链和环境](#工具链和环境)
- [常见问题和故障排查](#常见问题和故障排查)

---

## 项目背景

这是 [ant-design/ant-design](https://github.com/ant-design/ant-design)（antd）的源代码仓库，是一个 React 组件库，发布为 npm 包 `antd`。

### 核心特性

- 使用 TypeScript 和 React 开发
- 兼容 React 18+ 版本（peerDependencies: `>=18.0.0`)
- 包含 **84+ 个组件**，涵盖通用、输入、数据展示、反馈、导航、布局等类型
- 采用完整的 CSS-in-JS 架构（基于 `@ant-design/cssinjs`）
- 支持 Design Token 主题系统和动态主题切换
- 支持国际化（i18n），包含 150+ 语言 locales
- 支持暗色模式和自定义主题
- 支持 RTL（从右到左）布局
- 支持服务端渲染（SSR）
- 提供完整的 TypeScript 类型定义

---

## 快速开始

### 开发环境要求

- **Node.js**: >= 18.12.0（推荐使用 LTS 版本）
- **包管理器**: npm 或 ut（内部包管理器）
- **浏览器兼容性**: 现代浏览器（Chrome 80+、Edge、Firefox、Safari）
- **编辑器**: VS Code（推荐）或其他支持 TypeScript 的编辑器

### 安装依赖

```bash
npm install
# 或
utoo install
```

### 常用开发命令

```bash
npm start              # 启动开发服务器（http://127.0.0.1:8001）
npm run build          # 完整构建
npm test               # 运行测试
npm run lint           # 代码检查
npm run format         # 代码格式化
npm run version        # 生成版本信息
npm run clean          # 清理构建产物
```

### 项目结构

```
ant-design/
├── components/              # 组件源代码（84+ 组件）
│   ├── component-name/      # 单个组件目录
│   │   ├── ComponentName.tsx      # 主组件实现
│   │   ├── SubComponent.tsx       # 子组件（如有）
│   │   ├── helpers.ts             # 辅助函数
│   │   ├── hooks/                 # 组件专属 hooks
│   │   ├── demo/                  # 演示代码（*.tsx 和 *.md）
│   │   ├── style/                 # 样式系统
│   │   │   ├── index.ts          # 样式钩子生成器
│   │   │   ├── token.ts          # 主题 token 定义
│   │   │   └── variant.ts        # 变体样式
│   │   ├── __tests__/            # 单元测试
│   │   ├── index.en-US.md        # 英文文档
│   │   ├── index.zh-CN.md        # 中文文档
│   │   └── index.tsx             # 导出入口
│   ├── _util/                   # 社会工具函数库
│   ├── theme/                   # 主题系统
│   ├── locale/                  # 国际化文本（150+ 文件）
│   └── index.ts                 # 组件总入口
├── scripts/                     # 构建和工具脚本（26+ 脚本）
├── tests/                       # 测试文件和工具
│   ├── __mocks__/              # Jest mocks
│   ├── shared/                 # 共享测试工具
│   └── setup.ts                # 测试环境设置
├── docs/                        # 站点文档
├── CHANGELOG.zh-CN.md           # 中文更新日志
├── CHANGELOG.en-US.md           # 英文更新日志
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript 配置
├── eslint.config.mjs            # ESLint 配置
├── biome.json                   # Biome 配置
├── .jest.js                     # Jest 配置
├── .dumirc.ts                   # Dumi 文档配置
└── webpack.config.js            # Webpack 构建配置
```

---

## 代码规范

### 基本编码规范

- ✅ 使用 TypeScript 和 React 书写
- ✅ 使用函数式组件和 Hooks，**避免类组件**
- ✅ 使用 `forwardRef` 实现组件 ref 传递
- ✅ 使用提前返回（early returns）提高代码可读性
- ✅ 避免引入新依赖，严控打包体积
- ✅ 兼容现代浏览器
- ✅ 支持服务端渲染（SSR）
- ✅ 保持向下兼容，避免 breaking change
- ✅ 组件名使用大驼峰（PascalCase），如 `Button`、`DatePicker`
- ✅ 属性名使用小驼峰（camelCase），如 `onClick`、`defaultValue`
- ✅ 合理使用 `useLayoutEffect` 处理性能敏感操作（如 loading 延迟）
- ✅ 合理使用 `React.memo`、`useMemo` 和 `useCallback` 优化性能
- ✅ 使用 `clsx` 处理类名拼接
- ✅ 使用 `devUseWarning` 提供开发时 API 过期警告
- ✅ 使用 `displayName` 设置组件调试名称
- ✅ 支持 Semantic 样式系统（`classNames` 和 `styles` 属性）

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
| 样式对象       | `style`                                 | `style`                       |

#### 组件引用 (Ref)

组件应支持 `classNames` 和 `styles` 属性，用于精细化样式定制：

```tsx
// classNames 属性类型定义
export type ComponentClassNamesType = {
  root?: string;
  icon?: string;
  content?: string;
  // ... 其他元素
};

// styles 属性类型定义
export type ComponentStylesType = {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
  content?: React.CSSProperties;
  // ... 其他元素
};

// 使用示例
<Button
  classNames={{ root: 'custom-btn', icon: 'custom-icon' }}
  styles={{ root: { width: 200 }, icon: { color: 'red' } }}
>
  Button
</Button>;
```

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

### API 文档规范

#### API 表格格式

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| htmlType | Button 原生类型 | string | `button` | - |
| type | 按钮类型 | `primary` \| `default` \| `dashed` \| `link` \| `text` | `default` | - |
| disabled | 是否禁用 | boolean | false | - |
| minLength | 最小长度 | number | 0 | - |
| style | 自定义样式 | CSSProperties | - | - |
| classNames | 自定义类名 | ComponentClassNamesType | - | 5.0.0 |
| styles | 自定义内联样式 | ComponentStylesType | - | 5.0.0 |

#### API 文档要求

- ✅ 字符串类型的默认值使用反引号包裹，如 `` `button` ``
- ✅ 布尔类型直接使用 `true` 或 `false`
- ✅ 数字类型直接使用数字，如 `0`、`100`
- ✅ 函数类型使用箭头函数表达式，如 `(e: Event) => void`
- ✅ 无默认值使用 `-`
- ✅ 描述首字母大写，结尾无句号
- ✅ API 按字母顺序排列
- ✅ 新增属性需要声明可用版本号，如 `5.0.0`

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

### 样式架构

Ant Design 6.x 采用完整的 **CSS-in-JS** 架构，基于 `@ant-design/cssinjs` 实现：

- 使用 `@ant-design/cssinjs` 作为样式解决方案
- 使用 `@ant-design/cssinjs-utils` 提供额外样式工具
- 支持动态样式和主题切换
- 样式独立注入，避免 CSS 污染
- 支持 Server-Side Rendering (SSR)

### 组件样式结构

每个组件的样式应该放在 `style/` 目录下，建议结构：

```
style/
├── index.ts          # 样式钩生成器（导出点）
├── token.ts          # 组件 token 定义
├── variant.ts        # 变体样式（solid/outlined/text 等）
├── compact.ts        # 紧凑布局样式（如需要）
└── group.ts          | 组合样式（如需要）
```

### 样式生成函数规范

```typescript
// 1. Token 准备函数
const prepareToken = (token: GlobalToken): ComponentToken => {
  return mergeToken(token, {
    // 组件特定 token
    controlHeightLG: 40,
  });
};

// 2. Component Token 准备函数
export const prepareComponentToken: GetDefaultToken<'ComponentName'> = (token) => ({
  componentBg: token.colorBgContainer,
  componentBorder: token.colorBorder,
  // ...
});

// 3. 样式生成函数
const genComponentStyle: GenerateStyle<ComponentToken, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      // 基础样式
    },
  };
};

// 4. 导出样式钩子（使用 genStyleHooks）
export default genStyleHooks(
  'ComponentName', // 组件名称
  (token) => [genComponentStyle(token)],
  prepareComponentToken, // Component Token 准备函数
  {
    unitless: {
      // 无单位 token
      fontWeight: true,
    },
  },
);
```

### Token 系统

使用 Ant Design 的 Design Token 系统：

- 避免硬编码颜色、尺寸、间距等值
- 组件样式应基于全局 Token 和组件级 Token
- 自定义样式应尽可能使用现有的 Token
- 组件级 Token 命名规范：`Component` + `semantic part` + `css property`
- 使用 `mergeToken` 合并 token
- 使用 `calc` 处理 CSS 计算值

### Token 命名规范

格式：`variant (optional)` + `semantic part` + `semantic part variant (optional)` + `css property` + `size/disabled (optional)`

示例：

- `buttonPrimaryColor` - Button 主色
- `inputPaddingBlock` - Input 垂直内边距
- `menuItemActiveBg` - Menu 激活项背景色

### 响应式和主题支持

- ✅ 组件应支持不同屏幕尺寸（使用 CSS 媒体查询）
- ✅ 所有组件必须支持暗色模式
- ✅ 组件应支持 RTL（从右到左）布局
- ✅ 使用 CSS 逻辑属性（如 `margin-inline-start`）替代方向性属性
- ✅ 支持通过 `ConfigProvider` 进行主题定制
- ✅ 使用 CSS 变量 (`cssVarCls`) 支持动态主题切换

### 动画效果

- 使用 CSS 过渡实现简单动画
- 复杂动画使用 `@rc-component/motion` 实现
- 尊重用户的减少动画设置（`prefers-reduced-motion`）
- 动画时长和缓动函数应使用 Token：`motionDurationMid`、`motionEaseInOut`
- 动画不应干扰用户的操作和阅读体验

### CSS-in-JS 注意事项

- 样式生成函数应遵循 `gen[ComponentName]Style` 的命名规范
- 样式覆盖应使用类选择器而非标签选择器
- 避免在 render 过程中重复创建样式对象
- 使用 `hashId` 确保样式唯一性
- 使用 `cssVarCls` 支持 CSS 变量

### 可访问性样式

- 遵循 WCAG 2.1 AA 级别标准
- 确保焦点状态有明显的视觉提示
- 提供足够的色彩对比度
- 不依赖颜色来传达信息
- 支持用户放大页面至 200% 时的正常布局
- 避免使用会导致闪烁的动画

---

## 代码格式化

### 工具配置

项目使用多种代码格式化工具组合使用：

| 工具     | 用途                     | 配置文件            |
| -------- | ------------------------ | ------------------- |
| Biome    | 代码检查和格式化（主要） | `biome.json`        |
| ESLint   | 代码质量检查             | `eslint.config.mjs` |
| Prettier | 补充格式化               | `.prettierrc`       |

### 格式化规范

配置文件：`biome.json`、`.prettierrc`

- **缩进**: 2 空格
- **行宽**: 100 字符
- **引号**: JavaScript 使用单引号，JSX 属性使用双引号
- **尾随逗号**: 强制添加（`all`）
- **分号**: 不强制使用

### 格式化命令

```bash
# 使用 Biome 格式化
npm run format

# 使用 Biome 检查
npm run lint:biome

# 使用 Prettier 格式化（补充）
npm run prettier
```

### 导入顺序

使用 `@ianvs/prettier-plugin-sort-imports` 插件自动排序导入：

```typescript
// 1. React 导入
import React, { forwardRef, useState } from 'react';
import RcComponent from '@rc-component/component';
// 2. 第三方库导入
import clsx from 'clsx';

// 3. Ant Design 内部导入
import { useToken } from '../theme/internal';
// 4. 相对路径导入
import { helperFunction } from './helpers';
// 5. 类型导入
import type { RefType } from './types';
// 6. 样式导入（如果有）
import './custom.css';
```

---

## 开发指南

### 测试指南

#### 测试框架和工具

- 使用 **Jest 30+** 和 **React Testing Library** 编写单元测试
- 使用 **jest-axe** 进行可访问性测试
- 使用 **jest-image-snapshot** 进行视觉回归测试
- 测试覆盖率要求 **100%**
- 测试文件放在组件目录下的 `__tests__/` 目录

#### 测试文件类型

| 测试类型      | 文件名                   | 用途                      |
| ------------- | ------------------------ | ------------------------- |
| 主测试        | `index.test.tsx`         | 组件功能测试              |
| 无障碍测试    | `a11y.test.ts`           | WCAG 可访问性标准测试     |
| 类型测试      | `type.test.tsx`          | TypeScript 类型完整性测试 |
| Semantic 测试 | `demo-semantic.test.tsx` | Demo 语义化测试           |
| Demo 测试     | `demo.test.ts`           | Demo 代码测试             |

#### 测试辅助函数

项目提供了多个测试辅助函数：

```typescript
// mountTest - 测试组件挂载/卸载
import mountTest from 'tests/shared/mountTest';
// rtlTest - 测试 RTL 布局渲染
import rtlTest from 'tests/shared/rtlTest';

mountTest(Button);

rtlTest(Button);
```

#### 运行测试

```bash
# 运行单元测试
npm test

# 更新测试快照
npm run test:update

# 运行视觉回归测试（需要 Puppeteer/Docker）
npm run test:image

# 运行所有测试套件
npm run test:all

# 运行 Node.js 环境测试
npm run test:node

# 运行站点文档测试
npm run test:site
```

#### 测试最佳实践

- ✅ 测试用户行为而非实现细节
- ✅ 使用有意义的测试描述（`describe` 和 `it`）
- ✅ 每个测试用例应该独立，不依赖其他测试
- ✅ 测试边界情况和错误处理
- ✅ 组件应同时包含 `mountTest` 和 `rtlTest`
- ✅ 新增功能必须有对应的测试用例
- ✅ 使用 `toHaveBeenCalledTimes` 而非 `toHaveBeenCalledExactTimes`

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

### 组件开发模板

#### 标准组件目录结构

```
[component-name]/
├── ComponentName.tsx      # 主组件实现
├── index.tsx              # 导出入口
├── demo/                  # 演示代码
│   ├── basic.tsx
│   └── basic.md
├── style/                 # 样式系统
│   ├── index.ts
│   └── token.ts
├── __tests__/             # 测试文件
│   ├── index.test.tsx
│   └── a11y.test.ts
├── index.en-US.md         # 英文文档
└── index.zh-CN.md         # 中文文档
```

#### 主组件模板

```tsx
import React, { forwardRef, useContext, useRef } from 'react';
import { clsx } from 'clsx';

import { useComposeRef } from '../_util/hooks';
import { useComponentConfig } from '../_util/hooks/useComponentConfig';
import { devUseWarning } from '../_util/warning';
import { ConfigProviderContext } from '../../config-provider';
import useStyle from './style';

export interface ComponentNameProps {
  // ... 其他 props
  className?: string;
  style?: React.CSSProperties;
  classNames?: ComponentClassNames;
  styles?: ComponentStyles;
}

export interface ComponentRef {
  nativeElement: HTMLElement;
  focus: VoidFunction;
  blur: VoidFunction;
}

export type ComponentClassNames = {
  root?: string;
  // ...
};

export type ComponentStyles = {
  root?: React.CSSProperties;
  // ...
};

const InternalComponent = React.forwardRef<ComponentRef, ComponentNameProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    classNames,
    styles,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigProviderContext);
  const componentConfig = useComponentConfig('ComponentName');
  const prefixCls = getPrefixCls('component-name', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const domRef = useRef<HTMLElement>(null);
  const mergedRef = useComposeRef(ref, domRef);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('ComponentName');
    warning.deprecated(!deprecatedProp, 'deprecatedProp', 'newProp');
  }

  return wrapCSSVar(
    <div
      ref={mergedRef}
      className={clsx(
        prefixCls,
        hashId,
        cssVarCls,
        className,
        classNames?.root,
        componentConfig.className,
      )}
      style={{ ...style, ...styles?.root, ...componentConfig.style }}
      dir={direction}
      {...restProps}
    >
      {/* 子内容 */}
    </div>,
  );
});

const Component = InternalComponent as typeof InternalComponent & {
  displayName?: string;
};

if (process.env.NODE_ENV !== 'production') {
  Component.displayName = 'ComponentName';
}

export default Component;
```

#### 样式模板

```typescript
// style/token.ts
import type { TokenType } from '../../theme/internal';
// style/index.ts
import { genStyleHooks } from '../../theme/internal';
import { prepareComponentToken } from './token';

export interface ComponentToken {
  componentFontSize?: number;
  componentPadding?: number;
}

export const prepareComponentToken: GetDefaultToken<'ComponentName'> = (token) => ({
  componentFontSize: token.fontSize,
  componentPadding: token.paddingXS,
});

const genComponentStyle: GenerateStyle<ComponentToken, CSSObject> = (token) => {
  const { componentCls, fontSize, padding } = token;
  return {
    [componentCls]: {
      fontSize,
      padding,
    },
  };
};

export default genStyleHooks(
  'ComponentName',
  (token) => [genComponentStyle(token)],
  prepareComponentToken,
);
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
   - ✅ 💄 Typography 重构并简化 DOM 结构，修复内容空格丢失的问题。（中文：Emoji + 组件名 + 描述，无冒号）
   - ✅ 💄 Refactor Typography DOM structure and fix content space loss.（英文：Emoji + 动词 + 组件名 + 描述）

4. **版本与命名**：
   - 新增属性必须符合 antd API 命名规则
   - 新增属性建议在描述中暗示或明确声明可用版本号

5. **双语输出**：每次处理必须同时提供 **中文版** 和 **英文版**

6. **PR 链接**：尽量给出原始的 PR 链接，社区提交的 PR 改动加上提交者的链接

#### 🎨 格式与结构规范

1. **条目顺序与符号**：
   - **Emoji 置顶**：每条条目以 Emoji 开头（如 🐞 💄 🆕），后接内容
   - **不加冒号**：组件名后不使用英文冒号，直接接描述

2. **组件名要求**：
   - **每条必含组件名**：每条 changelog 正文中都必须出现对应组件名（分组标题下的子条同样要在句中出现组件名）
   - **组件名不用反引号**：组件名（如 Modal、Drawer、Button、Upload.Dragger）不使用 `` ` `` 包裹；属性名、API、token 等仍用反引号（如 `picture-card`、`defaultValue`）

3. **中英文条目句式**：
   - **中文**：`Emoji 组件名 动词/描述 … [#PR](链接) [@贡献者]` 例：`🐞 Button 修复暗色主题下 \`color\` 的 \`hover\` 与 \`active\` 状态颜色相反的问题。`
   - **英文**：`Emoji 动词 组件名 描述 … [#PR](链接) [@贡献者]`（动词在前，如 Fix / Add / Support / Remove / Disable / Refactor / Improve / Change）例：`🐞 Fix Button reversed \`hover\` and \`active\` colors for \`color\` in dark theme.`；组件名在描述中应靠前出现，让用户快速知道变更的是哪个组件：`🐞 Upload.Dragger add generic type support.`，避免 `🐞 Add generic support for Upload.Dragger.`

4. **分组逻辑**：
   - **多项改动**：同一组件有 2 条及以上改动时，使用 `- 组件名` 作为分类标题（不加粗），具体条目缩进排列，子条中仍须包含组件名
   - **单项改动**：直接写单行条目，不设分类标题

5. **文本细节**：
   - **代码包裹**：所有属性名、方法名、API、`role`/`aria` 属性必须使用反引号 `` ` `` 包裹（组件名除外）
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

需要同时提供中英文两个版本，格式如下：

**中文版**（Emoji 在前、无冒号、每条含组件名、属性用反引号）：

```markdown
- ConfigProvider
  - 🆕 ConfigProvider 支持 Modal 和 Drawer 的 `maskClosable` 全局配置。[#56739](链接) [@luozz1994](链接)
- Button
  - 🐞 Button 修复暗色主题下 `color` 的 `hover` 与 `active` 状态颜色相反的问题。[#56872](链接) [@zombieJ](链接)
- 💄 Modal & Drawer 默认关闭蒙层 blur 效果。[#56781](链接) [@aojunhao123](链接)
- 🐞 Tooltip & Popover 修复弹出层动画起始位置偏左的问题。[#56887](链接) [@zombieJ](链接)
```

**英文版**（Emoji 在前、动词在前、无冒号、每条含组件名）：

```markdown
- ConfigProvider
  - 🆕 Support ConfigProvider global configuration of `maskClosable` for Modal and Drawer. [#56739](link) [@luozz1994](link)
- Button
  - 🐞 Fix Button reversed `hover` and `active` colors for `color` in dark theme. [#56872](link) [@zombieJ](link)
- 💄 Disable Modal & Drawer mask blur effect by default. [#56781](link) [@aojunhao123](link)
- 🐞 Fix Tooltip & Popover popup animation starting position being shifted to the left. [#56887](link) [@zombieJ](link)
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

- **编辑器**: 推荐使用 VS Code 或其他支持 TypeScript 的编辑器
- **代码检查**: ESLint (@antfu/eslint-config) + Biome
- **格式化**: Biome + Prettier
- **类型检查**: TypeScript 5.9+ 严格模式
- **Git hooks**: Husky + lint-staged

### 构建工具

| 工具    | 用途                   |
| ------- | ---------------------- |
| Father  | 组件编译（lib/es）     |
| Webpack | dist 构建和产物分析    |
| Dumi    | 文档站点构建           |
| Mako    | SSR 构建器（生产环境） |

### 构建产物

- **lib/**: CommonJS 格式
- **es/**: ES Modules 格式
- **dist/**: UMD 格式（包含 dist/antd.min.js）
- **locale/**: 国际化配置

### CI/CD

- 所有 PR 必须通过 CI 检查
- 包括单元测试、集成测试、类型检查、代码风格检查
- 自动化发布流程
- 支持多环境部署
- 支持视觉回归测试

### 相关配置文件

| 配置文件            | 说明             |
| ------------------- | ---------------- |
| `package.json`      | 项目配置和脚本   |
| `tsconfig.json`     | TypeScript 配置  |
| `eslint.config.mjs` | ESLint 配置      |
| `biome.json`        | Biome 配置       |
| `.prettierrc`       | Prettier 配置    |
| `.jest.js`          | Jest 测试配置    |
| `.dumirc.ts`        | Dumi 文档配置    |
| `webpack.config.js` | Webpack 构建配置 |

---

## 常见问题和故障排查

### 开发相关问题

#### 启动开发服务器失败

```bash
# 确认 Node.js 版本
node -v  # 应该 >= 18

# 尝试清理 node_modules 和重新安装
rm -rf node_modules package-lock.json
npm install

# 重新生成版本信息
npm run version
```

#### 样式不生效

- 确保已运行 `npm run style` 生成样式文件
- 检查 `useStyle` hook 是否正确调用
- 确认 `hashId` 和 `cssVarCls` 是否正确应用到类名

#### TypeScript 类型错误

```bash
# 运行 TypeScript 类型检查
npm run tsc

# 清理构建产物后重新编译
npm run clean && npm run compile
```

### 测试相关问题

#### 快照测试失败

```bash
# 更新快照
npm run test:update

# 按组件更新快照
npm test -- --updateSnapshot components/button/__tests__
```

#### 视觉回归测试问题

```bash
# 本地运行视觉回归测试
npm run test:visual-regression:local

# 需要确保 Puppeteer 和相关依赖已正确安装
```

### 构建相关问题

#### 构建产物体积过大

```bash
# 运行包体积分析
npm run size-limit

# 检查是否有重复依赖包（production 构建）
npm run dist

# 分析 bundle
ANALYZER=true npm run dist
```

#### Token 相关问题

```bash
# 重新生成 Token 元数据
npm run token:meta

# 收集 Token 统计
npm run token:statistic

# 重新构建样式
npm run style
```

### 国际化问题

#### 新增多语言配置

1. 在 `components/locale/` 下添加对应的语言文件
2. 更新 `components/locale/index.tsx` 的类型定义
3. 确保所有语言配置保持同步

---

## 参考资料

- [API Naming Rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules)
- [#16048](https://github.com/ant-design/ant-design/issues/16048) - Current listing api & Chinese version
- [#25066](https://github.com/ant-design/ant-design/issues/25066) - API standard in the document
- [Development Guide](https://github.com/ant-design/ant-design/wiki/Development)
- [@ant-design/cssinjs](https://github.com/ant-design/cssinjs) - CSS-in-JS 解决方案
- [React 文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
