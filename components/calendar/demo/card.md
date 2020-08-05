---
order: 2
title:
  zh-CN: 卡片模式
  en-US: Card
---

## zh-CN

用于嵌套在空间有限的容器中。

## en-US

Nested inside a container element for rendering in limited space.

```jsx
import { Calendar } from 'antd';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <div className="site-calendar-demo-card">
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>,
  mountNode,
);
```

```css
.site-calendar-demo-card {
  width: 300px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
}
```

<style>
  [data-theme="dark"] .site-calendar-demo-card {
    border: 1px solid #303030;
  }
</style>
