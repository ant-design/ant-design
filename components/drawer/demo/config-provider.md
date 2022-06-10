---
order: 99
title:
  zh-CN: ConfigProvider
  en-US: ConfigProvider
debug: true
---

## zh-CN

支持 ConfigProvider 配置。

## en-US

config by ConfigProvider.

```tsx
import { Button, ConfigProvider, Drawer } from 'antd';
import React, { useRef, useState } from 'react';

const App: React.FC = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <ConfigProvider getPopupContainer={() => domRef.current!}>
      <div ref={domRef} className="site-drawer-render-in-current-wrapper">
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <Drawer
          style={{ position: 'absolute' }}
          title="ConfigProvider"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default App;
```
