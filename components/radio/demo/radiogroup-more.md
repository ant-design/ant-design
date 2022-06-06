---
order: 2
title:
  zh-CN: Radio.Group 垂直
  en-US: Vertical Radio.Group
---

## zh-CN

垂直的 Radio.Group，配合更多输入框选项。

## en-US

Vertical Radio.Group, with more radios.

```tsx
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Option A</Radio>
        <Radio value={2}>Option B</Radio>
        <Radio value={3}>Option C</Radio>
        <Radio value={4}>
          More...
          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Space>
    </Radio.Group>
  );
};

export default App;
```
