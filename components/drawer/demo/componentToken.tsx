import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            zIndexPopup: 5,
            drawerFooterPaddingVertical: 30,
            drawerFooterPaddingHorizontal: 30,
          },
        },
      }}
    >
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </ConfigProvider>
  );
};

export default App;
