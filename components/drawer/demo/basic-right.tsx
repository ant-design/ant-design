import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

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
        closable={{
          closeIcon: <CloseSquareFilled />,
          'aria-label': 'Close',
        }}
        title="Basic Drawer"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
