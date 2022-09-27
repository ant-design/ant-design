---
order: 6
iframe: 360
title:
  zh-CN: 菜单模式
  en-US: Menu mode
---

## zh-CN

设置 `trigger` 属性即可开启菜单模式。提供 `hover` 和 `click` 两种触发方式

## en-US

Open menu mode with `trigger`, which could be `hover` or `click`.

```tsx
import React from 'react';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <FloatButton.Group icon={<CustomerServiceOutlined />} type="primary" trigger="click">
    <FloatButton />
    <FloatButton icon={<CommentOutlined />} />
  </FloatButton.Group>
);

export default App;
```
