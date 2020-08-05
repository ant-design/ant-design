---
order: 1
title:
  zh-CN: 独立使用
  en-US: Standalone
---

## zh-CN

不包裹任何元素即是独立使用，可自定样式展现。

> 在右上角的 badge 则限定为红色。

## en-US

Used in standalone when children is empty.

```jsx
import { Badge } from 'antd';

ReactDOM.render(
  <div>
    <Badge count={25} />
    <Badge count={4} className="site-badge-count-4" />
    <Badge className="site-badge-count-109" count={109} style={{ backgroundColor: '#52c41a' }} />
  </div>,
  mountNode,
);
```

```css
.site-badge-count-4 .ant-badge-count {
  background-color: #fff;
  color: #999;
  box-shadow: 0 0 0 1px #d9d9d9 inset;
}
```

<style>
.ant-badge-not-a-wrapper:not(.ant-badge-status) {
  margin-right: 8px;
}
.ant-badge.ant-badge-rtl:not(.ant-badge-not-a-wrapper) {
  margin-right: 0;
  margin-left: 20px;
}
[data-theme="dark"] .site-badge-count-4 .ant-badge-count {
  background-color: #141414;
  box-shadow: 0 0 0 1px #434343 inset;
}
</style>
