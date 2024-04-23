import React, { useEffect, useState } from 'react';
import type { DrawerProps } from 'antd';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<DrawerProps['loading']>(true);
  let id: NodeJS.Timer;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    clearTimeout(Number(id));
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (open) {
      id = setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [open]);

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
        afterOpenChange={(visible) => !visible && setLoading(true)}
      >
        <Button onClick={() => setLoading(true)}>set Loading true</Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
