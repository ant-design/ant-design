---
order: 5
title:
  zh-CN: 向上展开
  en-US: Placement
---

## zh-CN

向上展开建议。

## en-US

Change the suggestions placement.

```tsx
import { Mentions } from 'antd';
import React from 'react';

const { Option } = Mentions;

const App: React.FC = () => (
  <Mentions style={{ width: '100%' }} placement="top">
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
    <Option value="yesmeck">yesmeck</Option>
  </Mentions>
);

export default App;
```
