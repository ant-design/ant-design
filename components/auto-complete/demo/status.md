---
order: 19
version: 4.19.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 AutoComplete 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to AutoComplete with `status`, which could be `error` or `warning`.

```tsx
import { AutoComplete, Space } from 'antd';
import React, { useState } from 'react';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <AutoComplete options={options} onSearch={onSearch} status="error" style={{ width: 200 }} />
      <AutoComplete options={options} onSearch={onSearch} status="warning" style={{ width: 200 }} />
    </Space>
  );
};

export default App;
```
