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
<code src="./demo/customized-color.tsx">自定义颜色</code>
<code src="./demo/radius.tsx">圆角容器</code>
<code src="./demo/non-uniform-radius.tsx">不规则圆角</code>
<code src="./demo/controlled.tsx">受控状态</code>
<code src="./demo/component-token.tsx">组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### BorderBeam

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| borderWidth | 流光边框环宽度。 | `number` | `1` | 6.4.0 | × |
| children | 被包裹内容。 | `ReactNode` | - | 6.4.0 | × |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数。 | `Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>` | - | 6.4.0 | 6.4.0 |
| color | 单色快捷配置。设置后会同时作为 `colorFrom` 和 `colorTo` 使用。 | `string` | - | 6.4.0 | × |
| colorFrom | 流光起始颜色。 | `string` | `#1677ff` | 6.4.0 | × |
| colorTo | 流光结束颜色。 | `string` | `#4096ff` | 6.4.0 | × |
| delay | 动画延迟时间，单位为秒。 | `number` | `0` | 6.4.0 | × |
| disabled | 是否关闭流光效果。 | `boolean` | `false` | 6.4.0 | × |
| duration | 动画时长，单位为秒。 | `number` | `6` | 6.4.0 | × |
| offset | 初始偏移位置，百分比。 | `number` | `0` | 6.4.0 | × |
| pathRadius | 流光轨迹圆角，不会修改被包裹内容的圆角。 | `React.CSSProperties['borderRadius']` | - | 6.4.0 | × |
| paused | 是否暂停动画。 | `boolean` | `false` | 6.4.0 | × |
| reverse | 是否反向运动。 | `boolean` | `false` | 6.4.0 | × |
| size | 流光束尺寸，单位为 px。 | `number` | `60` | 6.4.0 | × |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数。 | `Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>` | - | 6.4.0 | 6.4.0 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### 开启减少动态效果后会怎样？ {#faq-reduced-motion}

`BorderBeam` 会将流光视为装饰效果。当命中 `prefers-reduced-motion: reduce` 时，组件会隐藏 beam 效果。

### 如何让流光边框跟随容器圆角？ {#faq-radius}

`pathRadius` 只控制流光轨迹圆角，`BorderBeam` 不会把这个圆角反向写回被包裹内容。

如果没有传入 `pathRadius`，`BorderBeam` 会尝试读取第一个子节点四个角的计算后圆角作为轨迹回退值。为了获得更稳定、可预期的跨组件表现，建议优先显式传入 `pathRadius`。动画轨迹在运行时可能会做内部平滑处理；如果你已经通过根节点样式管理轨迹，也可以继续使用 `style.borderRadius` 或 `styles.root.borderRadius` 作为轨迹配置。

如果希望内容轮廓与流光轨迹在视觉上对齐，请单独配置内容本身的圆角：

```tsx
const radius = 24;

<BorderBeam pathRadius={radius}>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
