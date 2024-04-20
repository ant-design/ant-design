import React, { useState } from 'react';
import type { DrawerProps } from 'antd';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading] = useState<DrawerProps['loading']>(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        loading={loading}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
