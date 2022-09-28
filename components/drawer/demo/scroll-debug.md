---
order: 999
title:
  zh-CN: 滚动调试
  en-US: Scroll Debug
debug: true
---

## zh-CN

当 Modal 和 Drawer 共同作用时的滚动锁定调试。

## en-US

Scroll lock debug with Modal & Drawer.

```tsx
import { Switch, Drawer, Modal } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div style={{ position: 'relative', zIndex: 999999 }}>
      <Switch
        checkedChildren="Drawer"
        unCheckedChildren="Drawer"
        checked={drawer}
        onChange={() => setDrawer(!drawer)}
      />
      <Switch
        checkedChildren="Modal"
        unCheckedChildren="Modal"
        checked={modal}
        onChange={() => setModal(!modal)}
      />
      <Drawer title="Drawer" open={drawer}>
        Some contents...
      </Drawer>
      <Modal title="Modal" open={modal}>
        Some contents...
      </Modal>
    </div>
  );
};

export default App;
```
