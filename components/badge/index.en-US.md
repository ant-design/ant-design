---
category: Components
type: Data Display
title: Badge
---

Small numerical value or status descriptors for UI elements.

## When To Use

Badge normally appears in proximity to notification or head picture with eye-catching appeal, typically displaying unread messages count.

## API

```jsx
<Badge count={5}>
  <a href="#" className="head-example" />
</Badge>
```


```jsx
<Badge count={5} />
```

| Property       | Description             | Type       | Default |
|----------------|-------------------------|------------|---------|
| count          | Number to show in badge | number     |         |
| overflowCount  | Max count to show       | number     | 99      |
| dot            | Whether to show red dot without number | boolean | false  |
| status         | Set Badge as a status dot | Enum{ 'success', 'processing, 'default', 'error', 'warning' } | '' |
| text           | If `status` is set, `text` is to set the text of status dot | string | '' |
