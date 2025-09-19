import React, { useState } from 'react';
import { UniqueProvider } from '@rc-component/trigger';
import { Button, ConfigProvider, Space, Switch, Tooltip } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ margin: 100 }}>
      <ConfigProvider
        theme={{
          token: {
            motionBase: 600,
          },
        }}
      >
        <UniqueProvider>
          <Space>
            <Tooltip title="First tooltip" mouseLeaveDelay={0.2} open={open}>
              <Button>Move to Next</Button>
            </Tooltip>
            {/* <Tooltip title="Second tooltip" mouseLeaveDelay={0.2}>
              <Button>Move to Prev</Button>
            </Tooltip> */}
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
