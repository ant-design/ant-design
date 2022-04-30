---
order: 0
title:
  zh-CN: 关闭速度
  en-US: Closing speed
debug: true
---

## zh-CN

点击抽屉内按钮，查看关闭速度。

## en-US

Click the button in the drawer to check the closing speed.

```tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Button } from 'antd';

const DestroyCallback = () => {
  useEffect(
    () => () => {
      console.timeEnd('time');
    },
    [],
  );
  return null;
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    console.time('time');
    setVisible(false);
  };
  const close = (
    <Button type="primary" onClick={onClose}>
      close
    </Button>
  );
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        destroyOnClose
        onClose={onClose}
        visible={visible}
        footer={close}
        extra={close}
      >
        {close}
        <DestroyCallback />
      </Drawer>
    </>
  );
};

export default App;
```

<style>
[data-theme='compact'] .ant-drawer-body p {
  margin-bottom: 0;
}
</style>
