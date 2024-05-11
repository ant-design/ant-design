import React from 'react';
import type { DrawerProps } from 'antd';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<DrawerProps['loading']>(true);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const showDrawer = () => {
    setOpen(true);
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  React.useEffect(() => clearTimer, []);

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        destroyOnClose
        title="Basic Drawer"
        placement="right"
        closable={false}
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <Button type="primary" style={{ marginBottom: 16 }} onClick={() => setLoading(true)}>
          set Loading true
        </Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
