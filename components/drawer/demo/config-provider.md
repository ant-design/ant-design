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
import React, { useState, useRef } from 'react';
import { Drawer, ConfigProvider, Button } from 'antd';

const App: React.FC = () => {
  const domRef = useRef();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <ConfigProvider
      getPopupContainer={() => {
        return domRef.current;
      }}
    >
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

ReactDOM.render(<App />, mountNode);
```
