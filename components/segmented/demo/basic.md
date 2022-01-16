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
    <Segmented options={['iOS', 'Android', 'Web']} />
    <Segmented options={['13333333333', '057110000', '02110086']} />
    <Segmented options={['iOS', 'Android', 'Web']} disabled />
    <Segmented options={['iOS', { title: 'Android', value: 'Android', disabled: true }, 'Web']} />
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
