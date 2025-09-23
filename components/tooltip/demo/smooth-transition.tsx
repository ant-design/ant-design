import React, { useState } from 'react';
import { Button, ConfigProvider, Space, Switch, Tooltip } from 'antd';

const { UniqueProvider } = Tooltip;

const App: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ margin: 100 }}>
      <ConfigProvider
        theme={{
          token: {
            // motionBase: 60,
            // motionBase: 600,
          },
        }}
      >
        <UniqueProvider>
          <Space>
            <Tooltip
              title="First tooltip"
              mouseLeaveDelay={0.2}
              // Open
              open={open}
            >
              <Button>Move to Next</Button>
            </Tooltip>
            <Tooltip title="Second tooltip" mouseLeaveDelay={0.2} placement="bottom" open={!open}>
              <Button>Move to Prev</Button>
            </Tooltip>
          </Space>
        </UniqueProvider>
      </ConfigProvider>

      {/* <Tooltip title="First tooltip" mouseLeaveDelay={0.2} open>
        <Button>Test</Button>
      </Tooltip> */}

      <br />
      <Switch checked={open} onChange={() => setOpen((i) => !i)} />
    </div>
  );
};

export default App;
