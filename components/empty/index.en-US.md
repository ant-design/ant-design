---
category: Components
type: Data Display
title: Empty
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
| footer | Set footer content | ReactNode | - |
| image | Display image or not. Customize image url when string provided | boolean \| string | false |
