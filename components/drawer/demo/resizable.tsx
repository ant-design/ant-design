import React, { useState } from 'react';
import type { DrawerProps } from 'antd';
import { Button, Drawer, Radio, RadioChangeEvent, Space } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [size, setSize] = useState(256);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setSize(256);
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open Drawer
        </Button>
      </Space>
      <div>Current size: {size}px</div>
      <Drawer
        title="Resizable Drawer"
        placement={placement}
        onClose={onClose}
        open={open}
        key={placement}
        width={placement && ['left', 'right'].includes(placement) ? size : undefined}
        height={placement && ['top', 'bottom'].includes(placement) ? size : undefined}
        resizable={{
          onResize: (newSize) => setSize(newSize),
        }}
      >
        <p>Drag the edge to resize the drawer</p>
        <p>Current size: {size}px</p>
      </Drawer>
    </>
  );
};

export default App;
