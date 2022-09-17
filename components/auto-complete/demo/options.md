---
order: 2
title:
  zh-CN: 自定义选项
  en-US: Customized
---

## zh-CN

可以返回自定义的 `Option` label

## en-US

You could set custom `Option` label

```tsx
import { AutoComplete } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    let res: string[] = [];
    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map(domain => ({
        value,
        label: `${value}@${domain}`,
      }));
    }
    setOptions(res);
  };

  return (
    <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="input here"
      options={options}
    />
  );
};

export default App;
```
