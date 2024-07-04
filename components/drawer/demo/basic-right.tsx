import React, { useState } from 'react';
import { ConfigProvider, Drawer, Popover } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(true);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              zIndexPopup: 2147483698,
            },
            Popover: {
              zIndexPopup: 2147483698,
            },
          },
        }}
      >
        <Drawer
          mask={false}
          onClose={onClose}
          open={open}
          zIndex={2147483647}
          width={428}
          push={false}
        >
          <Popover title="Popover内容" open>
            Popover内容
          </Popover>
        </Drawer>
      </ConfigProvider>
    </div>
  );
};

export default App;
