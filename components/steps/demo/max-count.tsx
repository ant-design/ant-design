import React from 'react';
import { Space, Steps, Typography } from 'antd';

const items = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Step 3' },
  { title: 'Step 4' },
  { title: 'Step 5' },
  { title: 'Step 6' },
  { title: 'Step 7' },
];

const App: React.FC = () => (
  <Space orientation="vertical" style={{ display: 'flex' }} size="middle">
    <div>
      <Typography.Text strong>Current: 0</Typography.Text>
      <Steps current={0} maxCount={5} items={items} />
    </div>
    <div>
      <Typography.Text strong>Current: 3</Typography.Text>
      <Steps current={3} maxCount={5} items={items} />
    </div>
    <div>
      <Typography.Text strong>Current: 6</Typography.Text>
      <Steps current={6} maxCount={5} items={items} />
    </div>
  </Space>
);

export default App;
