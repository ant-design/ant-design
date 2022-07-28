---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic
---

## zh-CN

基本使用。

## en-US

Basic usage.

```tsx
import { Mentions } from 'antd';
import type { OptionProps } from 'antd/es/mentions';
import React from 'react';

const { Option } = Mentions;

const onChange = (value: string) => {
  console.log('Change:', value);
};

const onSelect = (option: OptionProps) => {
  console.log('select', option);
};

const App: React.FC = () => (
  <Mentions
    style={{ width: '100%' }}
    onChange={onChange}
    onSelect={onSelect}
    defaultValue="@afc163"
  >
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
    <Option value="yesmeck">yesmeck</Option>
  </Mentions>
);

export default App;
```
