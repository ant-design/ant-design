import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

type MaskType = 'blur' | 'dimmed' | 'none';
type DrawerConfig = {
  type: MaskType;
  mask: boolean | { blur: boolean };
  title: string;
};

const drawerList: DrawerConfig[] = [
  { type: 'blur', mask: true, title: 'Default blur' },
  { type: 'dimmed', mask: { blur: false }, title: 'Dimmed mask' },
  { type: 'none', mask: false, title: 'No mask' },
];
const App: React.FC = () => {
  const [open, setOpen] = useState({
    blur: false,
    dimmed: false,
    none: false,
  });

  const showDrawer = (type: MaskType) => {
    setOpen({ ...open, [type]: true });
  };

  const onClose = (type: MaskType) => {
    setOpen({ ...open, [type]: false });
  };

  return (
    <>
      <Space wrap>
        {drawerList.map((item) => (
          <span key={item.type}>
            <Button
              onClick={() => {
                showDrawer(item.type);
              }}
            >
              {item.title}
            </Button>
            <Drawer
              title="Drawer blur"
              placement="right"
              mask={item.mask}
              onClose={() => {
                onClose(item.type);
              }}
              open={open[item.type]}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>
          </span>
        ))}
      </Space>
    </>
  );
};

export default App;
