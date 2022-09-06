---
order: 6
title:
  zh-CN: 自动大小
  en-US: autoSize
---

## zh-CN

自适应内容高度。

## en-US

Height autoSize.

```tsx
import { Mentions } from 'antd';
import React from 'react';

const { Option } = Mentions;

const App: React.FC = () => (
  <Mentions autoSize style={{ width: '100%' }}>
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
    <Option value="yesmeck">yesmeck</Option>
  </Mentions>
);

export default App;
```
