---
order: 10
title:
  zh-CN: 密码框
  en-US: Password box
---

## zh-CN

密码框。

## en-US

Input type of password.

```tsx
import React from 'react';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const App: React.FC = () => (
  <Space direction="vertical">
    <Input.Password placeholder="input password" />
    <Input.Password
      placeholder="input password"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  </Space>
);

export default App;
```
