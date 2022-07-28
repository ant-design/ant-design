---
order: 5
title:
  zh-CN: 控制关闭状态
  en-US: Controlled
---

## zh-CN

通过 `visible` 属性控制关闭状态。

## en-US

By using the `visible` prop, you can control the close state of Tag.

```tsx
import { Button, Tag } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Tag closable visible={visible} onClose={() => setVisible(false)}>
        Movies
      </Tag>
      <br />
      <Button size="small" onClick={() => setVisible(!visible)}>
        Toggle
      </Button>
    </>
  );
};

export default App;
```
