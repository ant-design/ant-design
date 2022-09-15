---
order: 4
title:
  zh-CN: 自定义 Icon 图标
  en-US: Customize icon
---

## zh-CN

自定义提示 `icon`。

## en-US

Set `icon` props to customize the icon.

```tsx
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
    <a href="#">Delete</a>
  </Popconfirm>
);

export default App;
```
