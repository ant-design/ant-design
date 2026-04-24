---
category: Components
group: 其他
title: BorderBeam
subtitle: 边框流光
description: 为容器边框提供持续流动的装饰性高亮效果。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wr1ISY50SyYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*duAQQbjHlHQAAAAAAAAAAAAADrJ8AQ/original
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
<code src="./demo/customized-color.tsx">渐变色</code>
<code src="./demo/non-uniform-radius.tsx" debug>不规则圆角</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### BorderBeam

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | 装饰内容 | `ReactNode` | - | 6.4.0 | × |
| color | 流光颜色配置，支持单色字符串或渐变停靠点数组。`percent` 使用 `0 ~ 100` 的输入区间，组件会在内部为尾部透明过渡预留空间 | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### 开启减少动态效果后会怎样？ {#faq-reduced-motion}

`BorderBeam` 会将流光视为装饰效果。当命中 `prefers-reduced-motion: reduce` 时，组件会隐藏 beam 效果。

### `color` 中的 `percent` 表示什么？ {#faq-color-percent}

`percent` 表示渐变停靠点的输入位置，取值范围为 `0 ~ 100`。组件会将这些停靠点映射到可见 beam 段内，并为尾部透明过渡保留空间，以保持流光尾迹连续可见。

### 需要自己设置 `position` 吗？ {#faq-position}

`BorderBeam` 会在组件根节点提供一个低优先级的 `position: relative` 作为默认定位上下文。大多数场景下无需额外设置；如果实际容器已经声明了非 `static` 定位，会自然覆盖这个默认值。

### 如何让流光边框跟随容器圆角？ {#faq-radius}

`BorderBeam` 会在装饰目标就绪时读取一次计算后的 `border-radius`。当组件可以直接注入到子节点时，目标就是被装饰元素本身；当组件退回到 wrapper 模式时，如果 wrapper 本身已有显式圆角会优先使用 wrapper 圆角，否则会跟随实际渲染出的首个元素容器。这个推断更适合 `Card` 这类单容器子节点场景；若子节点结构较复杂，建议直接把圆角写在实际容器根节点上，以获得更稳定的结果。后续由尺寸、祖先样式或子节点内部状态引起的圆角变化，不保证自动重新同步。动画轨迹在运行时可能会做内部平滑处理。

例如：

```tsx
const radius = 24;

<BorderBeam>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
