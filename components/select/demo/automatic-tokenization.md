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

const { Option } = Select;

const children: React.ReactNode[] = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <Select mode="tags" style={{ width: '100%' }} onChange={handleChange} tokenSeparators={[',']}>
    {children}
  </Select>
);

export default App;
```
