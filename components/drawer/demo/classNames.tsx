import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  'my-drawer-body': {
    background: token['blue-1'],
  },
  'my-drawer-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-drawer-header': {
    background: token.green1,
  },
  'my-drawer-footer': {
    color: token.colorPrimary,
  },
}));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { styles } = useStyle();

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
        footer="Footer"
        onClose={onClose}
        open={open}
        classNames={{
          body: styles['my-drawer-body'],
          mask: styles['my-drawer-mask'],
          header: styles['my-drawer-header'],
          footer: styles['my-drawer-footer'],
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
