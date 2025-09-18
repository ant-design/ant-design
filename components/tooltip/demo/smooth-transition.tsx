import React from 'react';
import { UniqueProvider } from '@rc-component/trigger';
import { Button, Space, Tooltip } from 'antd';

const App: React.FC = () => (
  <div style={{ margin: 100 }}>
    <UniqueProvider>
      <Space>
        <Tooltip title="First tooltip" mouseLeaveDelay={0.2} open>
          <Button>Move to Next</Button>
        </Tooltip>
        <Tooltip title="Second tooltip" mouseLeaveDelay={0.2}>
          <Button>Move to Prev</Button>
        </Tooltip>
      </Space>
    </UniqueProvider>

    {/* <Tooltip title="First tooltip" mouseLeaveDelay={0.2} open>
      <Button>Test</Button>
    </Tooltip> */}
  </div>
);

export default App;
