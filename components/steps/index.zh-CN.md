---
category: Components
group: 导航
title: Steps
subtitle: 步骤条
description: 引导用户按照流程完成任务的导航条。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*677sTqCpE3wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cFsBQLA0b7UAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">基本用法</code>
<code src="./demo/error.tsx">步骤运行错误</code>
<code src="./demo/vertical.tsx">竖直方向的步骤条</code>
<code src="./demo/clickable.tsx">可点击</code>
<code src="./demo/panel.tsx">面板式步骤</code>
<code src="./demo/icon.tsx">带图标的步骤条</code>
<code src="./demo/step-next.tsx" debug>步骤切换</code>
<code src="./demo/title-placement.tsx">标签放置位置与进度</code>
<code src="./demo/progress-dot.tsx">点状步骤条</code>
<code src="./demo/customized-progress-dot.tsx" debug>自定义点状步骤条</code>
<code src="./demo/nav.tsx">导航步骤</code>
<code src="./demo/progress.tsx" debug>带有进度的步骤</code>
<code src="./demo/progress-debug.tsx" debug>Progress Debug</code>
<code src="./demo/steps-in-steps.tsx" debug>Steps 嵌套 Steps</code>
<code src="./demo/inline.tsx">内联步骤</code>
<code src="./demo/inline-variant.tsx">内联样式组合</code>
<code src="./demo/variant-debug.tsx" debug>变体 Debug</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Steps

整体步骤条。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 语义化结构 className | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number | 0 |  |
| ~~direction~~ | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | `horizontal` |  |
| iconRender | 自定义渲染图标，请优先使用 `items.icon` | (oriNode, info: { index, active, item }) => ReactNode | - |  |
| initial | 起始序号，从 0 开始记数 | number | 0 |  |
| ~~labelPlacement~~ | 指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方 | string | `horizontal` |  |
| orientation | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | `horizontal` |  |
| percent | 当前 `process` 步骤显示的进度条进度（只对基本类型的 Steps 生效） | number | - | 4.5.0 |
| progressDot | 点状步骤条，可以设置为一个 function，`titlePlacement` 将强制为 `vertical` | boolean \| (iconDot, { index, status, title, content }) => ReactNode | false |  |
| responsive | 当屏幕宽度小于 `532px` 时自动变为垂直模式 | boolean | true |  |
| size | 指定大小，目前支持普通（`default`）和迷你（`small`） | string | `default` |  |
| status | 指定当前步骤的状态，可选 `wait` `process` `finish` `error` | string | `process` |  |
| styles | 语义化结构 style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - |  |
| titlePlacement | 指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方 | string | `horizontal` |  |
| type | 步骤条类型，可选 `default` `dot` `inline` `navigation` `panel` | string | `default` |  |
| variant | 设置样式变体 | `filled` \| `outlined` | `filled` |  |
| onChange | 点击切换步骤时触发 | (current) => void | - |  |
| items | 配置选项卡内容 | [StepItem](#stepitem) | [] | 4.24.0 |

### StepItem

步骤条内的每一个步骤。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| content | 步骤的详情描述，可选 | ReactNode | - |  |
| ~~description~~ | 步骤的详情描述，可选 | ReactNode | - |  |
| disabled | 禁用点击 | boolean | false |  |
| icon | 步骤图标的类型，可选 | ReactNode | - |  |
| status | 指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error` | string | `wait` |  |
| subTitle | 子标题 | ReactNode | - |  |
| title | 标题 | ReactNode | - |  |

## Semantic DOM

### Steps

<code src="./demo/_semantic.tsx" simplify="true"></code>

### StepItem

<code src="./demo/_semantic_items.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Steps"></ComponentTokenTable>
