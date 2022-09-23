---
order: 2
iframe: 360
title:
  zh-CN: 形状
  en-US: Shape
---

## zh-CN

你可以通过 `shape` 设置不同的形状

## en-US

Change the shape of the FloatButton with `shape`.

```tsx
import React, { useState } from 'react';
import { FloatButton, Radio } from 'antd';
import type { RadioChangeEvent, FloatButtonProps } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [shape, setShape] = useState<FloatButtonProps['shape']>('circle');
  const onChange = (e: RadioChangeEvent) => {
    setShape(e.target.value);
  };
  return (
    <>
      <Radio.Group onChange={onChange} value={shape} style={{ margin: 20 }}>
        <Radio value="circle">圆形</Radio>
        <Radio value="square">方形</Radio>
      </Radio.Group>
      <FloatButton icon={<CustomerServiceOutlined />} type="primary" shape={shape} />
    </>
  );
};

export default App;
```
