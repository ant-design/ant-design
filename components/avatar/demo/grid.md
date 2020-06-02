---
order: 5
title:
  zh-CN: Grid
  en-US: Grid
---

## en-US

Avatar size can be changed depends on screen size.

```tsx
import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const sizes = { xs: 20, sm: 40, md: 60, lg: 80, xl: 100, xxl: 120 };

const Autoset: React.FC = () => {
  return (
    <>
      <Avatar icon={<UserOutlined />} size={sizes} />
    </>
  );
};

ReactDOM.render(<Autoset />, mountNode);
```
