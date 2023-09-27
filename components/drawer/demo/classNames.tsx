import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import type { DrawerClassNames, DrawerStyles } from '../DrawerPanel';

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
  'my-drawer-content': {
    borderLeft: '2px dotted #333',
  },
}));

const App: React.FC = () => {
  const [open, setOpen] = useState([false, false]);
  const { styles } = useStyle();
  const token = useTheme();

  const toggleDrawer = (idx: number, target: boolean) => {
    setOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const classNames: DrawerClassNames = {
    body: styles['my-drawer-body'],
    mask: styles['my-drawer-mask'],
    header: styles['my-drawer-header'],
    footer: styles['my-drawer-footer'],
    content: styles['my-drawer-content'],
  };

  const drawerStyles: DrawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)',
    },
    content: {
      boxShadow: '-10px 0 10px #666',
    },
    header: {
      borderBottom: `1px solid ${token.colorPrimary}`,
    },
    body: {
      fontSize: token.fontSizeLG,
    },
    footer: {
      borderTop: `1px solid ${token.colorBorder}`,
    },
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => toggleDrawer(0, true)}>
          Open
        </Button>
        <Button type="primary" onClick={() => toggleDrawer(1, true)}>
          ConfigProvider
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement="right"
        footer="Footer"
        onClose={() => toggleDrawer(0, false)}
        open={open[0]}
        classNames={classNames}
        styles={drawerStyles}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <ConfigProvider
        drawer={{
          classNames,
          styles: drawerStyles,
        }}
      >
        <Drawer
          title="Basic Drawer"
          placement="right"
          footer="Footer"
          onClose={() => toggleDrawer(1, false)}
          open={open[1]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default App;
