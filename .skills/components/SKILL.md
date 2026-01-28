---
name: ant-design
description: Ant Design工程实践指南 —— 可扩展、可访问、可主题化的最佳实践
---

# ant-design 工程实践指南

简洁、可执行的工程级指南，面向中大型 React / Next.js 项目，覆盖：组件使用规范、主题与 Token、性能、可访问性（a11y）、扩展与迁移。

## 目录

- [快速上手（Quick Start）](#快速上手quick-start)
- [步骤 1：分析项目上下文（必做）](#步骤-1分析项目上下文必做)
- [步骤 2：核心设计原则（与 5.x 差异）](#步骤-2核心设计原则与-5x-差异)
- [步骤 3：基础工程配置（必做）](#步骤-3基础工程配置必做)
- [步骤 4：组件使用规范（工程级）](#步骤-4组件使用规范工程级)
- [步骤 5：主题系统与 Token](#步骤-5主题系统与-token)
- [步骤 6：性能优化清单](#步骤-6性能优化清单)
- [步骤 7：可访问性（a11y）](#步骤-7可访问性a11y)
- [步骤 8：扩展与自定义（高级）](#步骤-8扩展与自定义高级)
- [步骤 9：从 5.x 迁移到 6.x（检查表）](#步骤-9从-5x-迁移到-6x检查表)
- [常见问题与提示](#常见问题与提示)

## 快速上手 (Quick Start)

当需要「使用 / 设计 / 优化 / 迁移 ant-design 时，按下列可执行流程进行：

1. 明确项目上下文（规模、渲染模式、主题需求）
2. 规划 ant-design 使用策略（全局 Token、组件策略、主题切换）
3. 落地基础工程配置（`ConfigProvider`、`StyleProvider`、SSR 适配）
4. 进行性能与 a11y 校验（表格、表单、模态框等高风险点）
5. 如需，设计扩展/迁移/定制方案并逐步验证

> Tip：把「全局 Token 只在一个地方定义」作为不变原则

## 步骤 1：分析项目上下文（必做）

需要确认：

- 应用类型：后台管理 / 内容系统 / ToB 工具 / 表单密集型 / 可视化
- 技术栈：React 18 / Next.js / Vite / Rspack（SSR/CSR/Streaming）
- 主题需求：品牌主题 / 多主题 / 深/浅色模式
- 自定义深度：仅样式覆盖 / 行为扩展 / 组件语义重组

默认假设（可覆盖）：React 18 + CSR + 单主题

## 步骤 2：核心设计原则（与 5.x 的差异）

- Token-first：将 Token 作为系统中心，避免碎片式覆盖
- CSS-in-JS：使用 `@ant-design/cssinjs` 管理样式和顺序
- 组件语义稳定：优先通过 Token/Config 定制，而不是直接修改组件实现
- 预留扩展：支持组合组件与语义化 Token

**反面清单（禁做）**：

- 全局覆写 `.ant-*` CSS（会破坏 Token 系统）
- 直接复制组件源码（升级困难）
- 混用 Tailwind 覆盖 ant-design（样式冲突、维护成本高）
- 把 ant-design 当作单纯 UI Kit 使用（忽视设计系统原则）

## 步骤 3：基础工程配置（必做）

### 3.1 ConfigProvider：唯一主题入口

```tsx
import { ConfigProvider } from 'ant-design';

<ConfigProvider
  theme={{
    token: { colorPrimary: '#1677ff', borderRadius: 6, fontSize: 14 },
    components: { Button: { controlHeight: 32 } },
  }}
>
  <App />
</ConfigProvider>;
```

规则：

- 全局 Token 只在 **一个** 位置定义并由 `ConfigProvider` 注入
- 禁止在业务组件内重复定义或覆盖全局 Token

### 3.2 SSR / Next.js 注意点

```tsx
import { StyleProvider } from '@ant-design/cssinjs';

<StyleProvider hashPriority="high">
  <ConfigProvider>{children}</ConfigProvider>
</StyleProvider>;
```

提示：确保 `StyleProvider`/`ConfigProvider` 在最外层，避免样式顺序错乱与闪烁

## 步骤 4：组件使用规范（工程级）

### 表单（Form）

- 使用 `Form` 管理状态，避免用 `useState` 再包一层
- 表单项校验与状态放在 `Form` 层面

示例：

```tsx
<Form form={form} layout="vertical">
  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
</Form>
```

### 表格（Table） — 高风险

必须检查：

- `rowKey` 是否稳定
- 列定义是否使用 `useMemo` 避免重建
- 对大数据使用分页或虚拟滚动

示例：

```tsx
const columns = useMemo(() => [...], []);
```

### Modal / Drawer

- 使用 `destroyOnClose` 来清理状态
- 避免深层嵌套组件导致复杂生命周期
- 弹窗内表单的状态应随弹窗生命周期而销毁

## 步骤 5：主题系统与 Token

### Token 分层

- Global Token：品牌与基础规范
- Component Token：组件级微调
- Alias Token：语义化抽象（例如 `successBg`）

### 多主题策略

- 使用状态或 Context 切换 `ConfigProvider` 的 token
- 在切换时确保样式可变性被局部覆盖而非全局替换

示例：

```ts
const light = { token: { colorBgBase: '#fff' } };
const dark = { token: { colorBgBase: '#141414' } };
```

## 步骤 6：性能优化清单

- 避免频繁重建 `columns` / `items`（使用 memo）
- Modal / Drawer 懒加载（按需加载重组件）
- 大表格拆分分页或使用虚拟滚动
- 避免将匿名函数直接作为 props

## 步骤 7：可访问性（a11y）

- ant-design 6.x 默认提供 aria 支持，但需校验：
  - 保留 `label` 与语义化表单元素
  - 为自定义控件添加必要的 `aria-*` 属性
  - 检查键盘焦点顺序与可见焦点样式

## 步骤 8：扩展与自定义（高级）

推荐：通过组合与包装而非直接修改组件源码来扩展能力

示例：

```tsx
function ProField(props) {
  return (
    <Form.Item {...props}>
      <Input />
    </Form.Item>
  );
}
```

扩展要点：

- 优先使用 props 注入行为
- 保留组件的语义与可测性

## 步骤 9：从 ant-design 5.x 迁移到 6.x（检查表）

- [ ] 移除 Less 覆盖，迁移为 Token 定制
- [ ] 校验并替换所有自定义主题（确保不破坏 Token 体系）
- [ ] 检查 SSR 和样式顺序（`StyleProvider` 配置）
- [ ] 运行性能与 a11y 测试（表格、表单、Modal）

## 常见问题与提示

- 当你需要深度定制样式时，优先考虑 Component Token 而非全局 CSS 覆写。
- 小范围临时代码可以使用局部样式，但必须在 PR 中注明并添加迁移任务。
