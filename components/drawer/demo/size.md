---
order: 10
title:
  zh-CN: 预设宽度
  en-US: Presetted size
---

## zh-CN

抽屉的默认宽度为 `378px`，另外还提供一个大号抽屉 `736px`，可以用 `size` 属性来设置。

## en-US

The default width (or height) of Drawer is `378px`, and there is a presetted large size `736px`.

```tsx
import { Button, Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();

  const showDefaultDrawer = () => {
    setSize('default');
    setVisible(true);
  };

  const showLargeDrawer = () => {
    setSize('large');
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDefaultDrawer}>
          Open Default Size (378px)
        </Button>
        <Button type="primary" onClick={showLargeDrawer}>
          Open Large Size (736px)
        </Button>
      </Space>
      <Drawer
        title={`${size} Drawer`}
        placement="right"
        size={size}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
```
