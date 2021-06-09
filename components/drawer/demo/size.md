---
order: 10
title:
  zh-CN: 预设宽度
  en-US: Presetted size
---

## zh-CN

在 Ant Design 规范中，操作按钮建议放在抽屉的右上角，可以使用 `extra` 属性来实现。

## en-US

Extra actions should be placed at corner of drawer in Ant Design, you can using `extra` prop for that.

```tsx
import React, { useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const showLargeDrawer = () => {
    setSize('large');
    setVisible(true);
  };
  const showDefaultDrawer = () => {
    setSize('default');
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Space>
        <Button type="primary" onClick={showLargeDrawer}>
          Open Large Size (378px)
        </Button>
        <Button type="primary" onClick={showDefaultDrawer}>
          Open Default Size (736px)
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

ReactDOM.render(<App />, mountNode);
```
