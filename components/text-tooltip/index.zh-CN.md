---
category: Components
group: 数据展示
title: TextTooltip
subtitle: 轻量文本提示
description: 面向纯文本场景的轻量提示组件。
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

`TextTooltip` 用于高频、轻量的纯文本提示场景。

相比现有 `Tooltip`，它不支持复杂内容、自动翻转和容器挂载，但在只传递 text 的场景里更轻。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/placement.tsx">位置</code>
<code src="./demo/arrow.tsx">箭头</code>
<code src="./demo/colorful.tsx">颜色</code>
<code src="./demo/trigger.tsx">触发方式</code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 提示文字，仅支持纯文本 | string | - | - |
| color | 设置背景颜色 | string | - | - |
| arrow | 是否显示箭头 | boolean | true | - |
| placement | 提示位置 | `top` \| `left` \| `right` \| `bottom` \| `topLeft` \| `topRight` \| `bottomLeft` \| `bottomRight` \| `leftTop` \| `leftBottom` \| `rightTop` \| `rightBottom` | `top` | - |
| trigger | 触发行为，仅支持 `hover`、`focus` 或两者组合 | `'hover' \| 'focus' \| Array<'hover' \| 'focus'>` | `hover` | - |
| defaultOpen | 默认是否显示 | boolean | false | - |
| open | 受控显示状态 | boolean | - | 6.3.7 |
| mouseEnterDelay | 鼠标移入后延时多少显示，单位：秒 | number | 0.1 | - |
| mouseLeaveDelay | 鼠标移出后延时多少隐藏，单位：秒 | number | 0.1 | - |
| onOpenChange | 显示状态变化时的回调 | `(open: boolean) => void` | - | 6.3.7 |
| zIndex | 提示层级 | number | 1070 | - |

## 注意

- `TextTooltip` 只支持字符串 `title`。
- 不支持 `align`、`autoAdjustOverflow`、`getPopupContainer` 等完整浮层能力。
- 超出能力边界时会直接报错，而不会自动回退到现有 `Tooltip`。

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="TextTooltip"></ComponentTokenTable>
