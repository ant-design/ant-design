import React, { useState } from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio, Space } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [size, setSize] = useState(256);

  const onChange = (e: RadioChangeEvent) => {
    setSize(256);
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Radio.Group
          value={placement}
          onChange={onChange}
          options={['top', 'right', 'bottom', 'left'].map((pos) => ({
            label: pos,
            value: pos,
          }))}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
      </Space>
      <div>Current size: {size}px</div>
      <Drawer
        title="Resizable Drawer"
        placement={placement}
        onClose={() => setOpen(false)}
        open={open}
        key={placement}
        size={size}
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
