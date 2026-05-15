import React from 'react';
import { Space, Steps, Typography } from 'antd';

const items = [
  {
    title: 'Prepare and verify all required deployment configuration files',
    content: 'Check all environment values and make sure dependencies are ready.',
  },
  {
    title: 'Run migration and data validation before service cutover',
    content: 'Migration and verification should be completed before release.',
  },
  {
    title: 'Monitor the release and handle rollback if any issue appears',
    content: 'Observe metrics and logs after the release.',
  },
];

const App: React.FC = () => (
  <Space orientation="vertical" style={{ display: 'flex' }} size="middle">
    <div>
      <Typography.Text strong>auto</Typography.Text>
      <Steps current={1} items={items} responsive={false} />
    </div>
    <div>
      <Typography.Text strong>wrap</Typography.Text>
      <Steps current={1} items={items} labelDisplay="wrap" responsive={false} />
    </div>
    <div>
      <Typography.Text strong>scroll</Typography.Text>
      <Steps current={1} items={items} labelDisplay="scroll" responsive={false} />
    </div>
  </Space>
);

export default App;
