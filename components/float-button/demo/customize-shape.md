---
order: 2
iframe: 360
title:
  zh-CN: 自定义形状
  en-US: Custom shape
---

## zh-CN

你可以定义悬浮按钮的形状

## en-US

You can customize the shape of the FloatButton.

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { FloatButton, Radio } from 'antd';

const App: React.FC = () => {
  const [shape, setShape] = useState<string>('circle');
  const onChange = (e: RadioChangeEvent) => {
    setShape(e.target.value);
  };
  return (
    <>
      <p>点击切换形状</p>
      <Radio.Group onChange={onChange} value={shape}>
        <Radio value="circle">圆形</Radio>
        <Radio value="square">方形</Radio>
      </Radio.Group>
      <FloatButton type="primary" shape={shape} />
    </>
  );
};

export default App;
```
