---
category: Components
type: Data Display
title: Empty
cols: 1
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.

## API

```jsx
<Badge count={5}>
  <a href="#" className="head-example" />
</Badge>
```

```jsx
<Badge count={5} />
```

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| description | Customize description | string \| ReactNode | - |
| image | Customize image. Will tread as image url when string provided | string \| ReactNode | false |
| children | Customize extra content | ReactNode | - |
