---
order: 12
title:
  zh-CN: 带字数提示的文本域
  en-US: Textarea with character counting
---

## zh-CN

展示字数提示。

## en-US

Show character counting.

```tsx
import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const App: React.FC = () => (
  <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={onChange} />
);

export default App;
```
