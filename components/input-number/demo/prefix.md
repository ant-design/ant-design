---
order: 7
title:
  zh-CN: 前缀
  en-US: Prefix
---

## zh-CN

在输入框上添加前缀图标。

## en-US

Add a prefix inside input.

```tsx
import React from 'react';
import { InputNumber } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <>
    <InputNumber prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber addonBefore={<UserOutlined />} prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />
  </>
);

export default App;
```
