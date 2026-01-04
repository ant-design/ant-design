---
group:
  title: 进阶使用
  order: 1
order: 0.5
title: 定制图标
---

默认情况下，Ant Design 使用 `@ant-design/icons` 包提供图标。您可以通过在 `ConfigProvider` 组件中重写图标属性来定制图标。

## 前提条件

为了确保图标具有正确的颜色和大小，您的自定义图标必须继承 `color` 和 `fontSize` 样式。

```css
svg.my-icon {
  fill: currentColor;
  width: 1em;
  height: 1em;
}
```

## 示例

<code src="./customize-icons/bootstrap-icons.tsx">Bootstrap Icons</code>
