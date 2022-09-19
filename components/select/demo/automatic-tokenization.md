---
order: 11
title:
  zh-CN: 自动分词
  en-US: Automatic tokenization
---

## zh-CN

试下复制 `露西,杰克` 并粘贴到输入框里。只在 tags 和 multiple 模式下可用。

## en-US

Try to copy `Lucy,Jack` and paste to the input. Only available in tags and multiple mode.

```tsx
import { Select } from 'antd';
import React from 'react';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <Select
    mode="tags"
    style={{ width: '100%' }}
    onChange={handleChange}
    tokenSeparators={[',']}
    options={options}
  />
);

export default App;
```
