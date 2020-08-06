---
order: 100
title:
  zh-CN: 自定义标题
  en-US: Title
debug: true
---

## zh-CN

设置鼠标放在状态点上时显示的文字。

## en-US

The badge will display `title` when hovered over, instead of `count`.

```jsx
import { Badge } from '@allenai/varnish';

ReactDOM.render(
  <div>
    <Badge count={5} title="Custom hover text">
      <a href="#" className="head-example" />
    </Badge>
  </div>,
  mountNode,
);
```

<style>
.ant-badge:not(.ant-badge-not-a-wrapper) {
  margin-right: 20px;
}

.ant-badge.ant-badge-rtl:not(.ant-badge-not-a-wrapper) {
  margin-right: 0;
  margin-left: 20px;
}

.head-example {
  width: 42px;
  height: 42px;
  border-radius: 2px;
  background: #eee;
  display: inline-block;
}
[data-theme="dark"] .head-example {
  background: rgba(255,255,255,.12);
}
</style>
