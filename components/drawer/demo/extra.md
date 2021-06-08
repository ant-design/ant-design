---
order: 1.1
title:
  zh-CN: 额外操作
  en-US: Extra Actions
---

## zh-CN

放在右上角的额外操作按钮。

## en-US

Extra actions should be placed at corner of drawer.

```tsx
import React, { useState } from 'react';
import { Drawer, Button, Space, Radio } from 'antd';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState('right');
  const showDrawer = () => {
    setVisible(true);
  };
  const onChange = e => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement={placement}
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
            <Button onClick={onClose}>Cancel</Button>
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

<style>
[data-theme='compact'] .ant-drawer-body p {
  margin-bottom: 0;
}
</style>
