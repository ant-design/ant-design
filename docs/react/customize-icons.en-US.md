---
group:
  title: Advanced
  order: 1
order: 0.5
title: Customize Icons
---

By default, Ant Design uses the `@ant-design/icons` package to provide icons. You can customize the icons by overriding the icon props in the `ConfigProvider` component.

## Prerequisites

To make sure the icons have correct color and size, your custom icons must inherit `color` and `fontSize` styles.

```css
svg.my-icon {
  fill: currentColor;
  width: 1em;
  height: 1em;
}
```

## Examples

<code src="./customize-icons/bootstrap-icons.tsx">Bootstrap Icons</code>
