import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps, RadioChangeEvent } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
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
        title="Resizable Drawer"
        placement={placement}
        onClose={onClose}
        open={open}
        resizable
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex fugit aspernatur temporibus et
        dolore! Sit numquam, impedit a asperiores voluptates eum. At quo asperiores, ut fugit ex
        laboriosam non autem.
      </Drawer>
    </>
  );
};

export default App;
