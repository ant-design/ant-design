---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

```jsx
import { Segmented } from 'antd';

ReactDOM.render(
  <>
    <Segmented options={['Map', 'Transit', 'Satellite']} />
    <br />
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <br />
    <Segmented options={['First', 'Second', 'Third', 'Fourth']} />
    <br />
    <Segmented options={[123, 456, 789]} />
    <br />
    <Segmented options={['List', 'Kanban']} />
  </>,
  mountNode,
);
```

```css
.code-box-demo {
  overflow-x: auto;
}

.code-box-demo .ant-segmented {
  margin-bottom: 10px;
}
```

<style>
[data-theme="dark"] .site-back-top-basic {
  color: rgba(255,255,255,.45);
}
</style>
