---
order: 3
title:
  zh-CN: 自定义触发字符
  en-US: Customize Trigger Token
---

## zh-CN

通过 `prefix` 属性自定义触发字符。默认为 `@`, 可以定义为数组。

## en-US

Customize Trigger Token by `prefix` props. Default to `@`, `Array<string>` also supported.

```tsx
import { Mentions } from 'antd';
import React, { useState } from 'react';

const { Option } = Mentions;

const MOCK_DATA = {
  '@': ['afc163', 'zombiej', 'yesmeck'],
  '#': ['1.0', '2.0', '3.0'],
};

type PrefixType = keyof typeof MOCK_DATA;

const App: React.FC = () => {
  const [prefix, setPrefix] = useState<PrefixType>('@');

  const onSearch = (_: string, newPrefix: PrefixType) => {
    setPrefix(newPrefix);
  };

  return (
    <Mentions
      style={{ width: '100%' }}
      placeholder="input @ to mention people, # to mention tag"
      prefix={['@', '#']}
      onSearch={onSearch}
    >
      {(MOCK_DATA[prefix] || []).map(value => (
        <Option key={value} value={value}>
          {value}
        </Option>
      ))}
    </Mentions>
  );
};

export default App;
```
