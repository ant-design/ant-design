---
category: Components
group: 其他
title: BorderBeam
subtitle: 边框流光
description: 为容器边框提供持续流动的装饰性高亮效果。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 6.4.0
---

## 何时使用 {#when-to-use}

- 需要强化某个容器的视觉关注度，但又不希望引入业务状态语义时。
- 适合登录面板、推荐卡片、AI 模块、重点 CTA 区域等场景。
- 它是装饰性效果，不应替代焦点态、校验态或业务状态边框。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基础用法</code>
<code src="./demo/hover.tsx">鼠标悬浮时显示</code>
<code src="./demo/count.tsx" version="6.6.0">多条流光</code>
<code src="./demo/custom-container.tsx">自定义容器</code>
<code src="./demo/customized-color.tsx">渐变色</code>
<code src="./demo/duration.tsx" version="6.5.0">动画时长</code>
<code src="./demo/size.tsx" version="6.5.0">尺寸</code>
<code src="./demo/line-width.tsx" version="6.5.0">线宽</code>
<code src="./demo/non-uniform-radius.tsx" debug>不规则圆角</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### BorderBeam

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | 装饰内容 | `ReactNode` | - | 6.4.0 | × |
| color | 流光颜色配置，支持单色字符串或渐变停靠点数组。`percent` 使用 `0 ~ 100` 的输入区间，组件会在内部为尾部透明过渡预留空间 | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |
| count | 流光数量 | number | 1 | 6.6.0 | × |
| duration | 流光完成一圈动画的时间，单位秒 | number | 6 | 6.5.0 | × |
| lineWidth | 流光线宽，数字类型按像素处理 | `number \| string` | `1px` | 6.5.0 | × |
| outset | 流光层相对容器边缘的外扩距离，遇到裁剪容器时可设为 `0` | `number \| string` | - | 6.4.0 | × |
| size | 流光可见段的尺寸，数字类型按像素处理 | `number \| string` | 100 | 6.5.0 | × |

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### 开启减少动态效果后会怎样？ {#faq-reduced-motion}

`BorderBeam` 会将流光视为装饰效果。当命中 `prefers-reduced-motion: reduce` 时，组件会隐藏 beam 效果。

### `color` 中的 `percent` 表示什么？ {#faq-color-percent}

`percent` 表示渐变停靠点的输入位置，取值范围为 `0 ~ 100`。组件会将这些停靠点映射到可见 beam 段内，并为尾部透明过渡保留空间，以保持流光尾迹连续可见。

### `size` 的取值限制 {#faq-size-limit}

流光由一个边长为 `size` 的方形渐变层生成。渐变层沿容器边框移动，遮罩只显示它与边框重叠的区域。`size` 设置的是渐变层边长，不按边框路径长度计算。

流光经过水平边框时，方形渐变层会向边框两侧各延伸约 `size / 2`。当 `size` 接近或超过遮罩覆盖层高度的两倍，它可能同时覆盖上下边框。流光经过垂直边框时，宽度方向同理。

使用时应让 `size` 明显小于遮罩覆盖层短边的两倍：`size < 2 × min(width, height)`。遮罩覆盖层通常与被装饰容器大小接近，`outset` 会改变其尺寸。圆角、`lineWidth` 和渐变透明区域也会影响重叠开始可见的位置。

### 为什么 `BorderBeam` 没有效果？ {#faq-not-working}

`BorderBeam` 需要通过 `children` 获取实际 DOM 节点，并将流光层插入到该节点中。请确保被包裹的内容是原生 DOM 元素，或是正确透传 `ref` 到 DOM 的 React 组件，否则组件无法定位真实容器，也就无法渲染流光效果。

流光层使用 `position: absolute` 定位，因此被索引到的 DOM 节点还需要提供定位上下文，通常可以为它设置 `position: relative`。`BorderBeam` 不会主动检测或修正子节点的定位样式。

为保证性能，`children` 是否可以插入以及其定位信息会在初始化时判断，后续不会持续监听子节点结构或定位样式变化。

### 如何让流光边框跟随容器圆角？ {#faq-radius}

`BorderBeam` 会将流光层渲染为实际容器的子节点，并通过 `border-radius: inherit` 直接继承容器圆角。对于 `Card` 这类单容器子节点，流光边框会自动与容器圆角对齐；若子节点结构较复杂，请确保圆角设置在实际容器根节点上。

圆角通过 CSS 继承实时生效，无需在初始化时读取或重新测量。后续通过 `className`、响应式样式或 CSS 变量修改容器圆角时，流光层也会自动同步。
