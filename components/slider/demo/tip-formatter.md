---
order: 3
title:
  zh-CN: 自定义提示
  en-US: Customize tooltip
---

## zh-CN

使用 `tipFormatter` 可以格式化 `Tooltip` 的内容，设置 `tipFormatter={null}`，则隐藏 `Tooltip`。

## en-US

Use `tipFormatter` to format content of `Tooltip`. If `tipFormatter` is null, hide it.

```tsx
import React from 'react';
import { Slider } from 'antd';

const formatter = (value: number) => `${value}%`;

const App: React.FC = () => (
  <>
    <Slider tipFormatter={formatter} />
    <Slider tipFormatter={null} />
  </>
);

export default App;
```
