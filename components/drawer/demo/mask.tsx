import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

type MaskType = 'blur' | 'dimmed' | 'none';
type DrawerConfig = {
  type: MaskType;
  mask: boolean | { blur: boolean };
  title: string;
};

const drawerList: DrawerConfig[] = [
  { type: 'blur', mask: true, title: 'blur' },
  { type: 'dimmed', mask: { blur: false }, title: 'Dimmed mask' },
  { type: 'none', mask: false, title: 'No mask' },
];
const App: React.FC = () => {
  const [open, setOpen] = useState<false | MaskType>(false);

  const showDrawer = (type: MaskType) => {
    setOpen(type);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Space wrap>
      {drawerList.map((item) => (
        <React.Fragment key={item.type}>
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
            onClose={onClose}
            open={open === item.type}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </React.Fragment>
      ))}
    </Space>
  );
};

export default App;
