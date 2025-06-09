import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    mode="alternate"
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
        color: 'green',
      },
      {
        icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
        content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      },
      {
        color: 'red',
        content: 'Network problems being solved 2015-09-01',
      },
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
        content: 'Technical testing 2015-09-01',
      },
    ]}
  />
);

export default App;
