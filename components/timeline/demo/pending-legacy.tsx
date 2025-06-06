import React from 'react';
import { Flex, Timeline } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle" align="flex-start">
    <Timeline
      pending="Recording..."
      items={[
        {
          content: 'Create a services site 2015-09-01',
        },
      ]}
    />
    <Timeline
      pending="Recording..."
      pendingDot="🔴"
      items={[
        {
          content: 'Create a services site 2015-09-01',
        },
      ]}
    />
  </Flex>
);

export default App;
