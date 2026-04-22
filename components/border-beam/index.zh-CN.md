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
<code src="./demo/customized-color.tsx">推荐配色</code>
<code src="./demo/radius.tsx">圆角容器</code>
<code src="./demo/non-uniform-radius.tsx">不规则圆角</code>
<code src="./demo/style-class.tsx">语义化样式定制</code>
<code src="./demo/component-token.tsx">组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### BorderBeam

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | 装饰内容 | `ReactNode` | - | 6.4.0 | × |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.4.0 | 6.4.0 |
| color | 流光颜色配置，支持单色字符串或渐变停靠点数组 | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.4.0 | 6.4.0 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### 开启减少动态效果后会怎样？ {#faq-reduced-motion}

`BorderBeam` 会将流光视为装饰效果。当命中 `prefers-reduced-motion: reduce` 时，组件会隐藏 beam 效果。

### 如何让流光边框跟随容器圆角？ {#faq-radius}

如果希望内容轮廓与流光轨迹在视觉上对齐，直接为实际内容元素配置圆角即可。动画轨迹在运行时可能会做内部平滑处理。

例如：

```tsx
const radius = 24;

<BorderBeam>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
