import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';

type ClosePlacement = 'start' | 'end';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<ClosePlacement>('start');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onPlacementChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onPlacementChange}>
          <Radio value="start">start</Radio>
          <Radio value="end">end</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Drawer Closable Placement"
        closable={{ placement }}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Toggle the radio above to move the close icon between start and end.</p>
      </Drawer>
    </>
  );
};

export default App;
