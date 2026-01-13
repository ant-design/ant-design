import React from 'react';
import { Flex, Timeline, Typography } from 'antd';
import type { TimelineProps } from 'antd';

const items: TimelineProps['items'] = [
  { title: '05:10', content: 'Create a services' },
  { title: '09:03', content: 'Solve initial network problems' },
  { content: 'Technical testing' },
  { title: '11:28', content: 'Network problems being solved' },
];

const App: React.FC = () => {
  return (
    <Flex vertical gap="middle">
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 100px
      </Typography.Title>
      <Timeline items={items} titleSpan="100px" />
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 25%
      </Typography.Title>
      <Timeline items={items} titleSpan="25%" />
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 18, mode = end
      </Typography.Title>
      <Timeline items={items} titleSpan={18} mode="end" />
    </Flex>
  );
};

export default App;
