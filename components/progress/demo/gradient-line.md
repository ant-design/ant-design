---
order: 11
title:
  zh-CN: 自定义进度条渐变色
  en-US: Custom line gradient
---

## zh-CN

`linear-gradient` 的封装。推荐只传两种颜色。

## en-US

A package of `linear-gradient`. It is recommended to only pass two colors.

```tsx
import { Progress } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Progress percent={99.9} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
    <Progress percent={99.9} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
    <Progress type="circle" percent={90} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
    <Progress
      type="circle"
      percent={100}
      style={{ marginLeft: 8 }}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
    />
  </>
);

export default App;
```
