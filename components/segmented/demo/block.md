---
order: 1
title:
  zh-CN: Block 分段选择器
  en-US: Block Segmented
---

## zh-CN

`block` 属性使其适合父元素宽度。

## en-US

`block` property will make the `Segmented` fit to its parent width.

```jsx
import { Segmented } from 'antd';

export default () => (
  <Segmented block options={[123, 456, 'longtext-longtext-longtext-longtext']} />
);
```
