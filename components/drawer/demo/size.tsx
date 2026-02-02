import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Radio.Group
          value={size}
          onChange={(e) => setSize(e.target.value)}
          options={[
            { label: 'Large Size (736px)', value: 'large' },
            { label: 'Default Size (378px)', value: 'default' },
            { label: 256, value: 256 },
            { label: '500px', value: '500px' },
            { label: '50%', value: '50%' },
            { label: '20vw', value: '20vw' },
          ]}
        />
      </Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        title={`${size} Drawer`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
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

export default App;
