import React from 'react';
import { Flex, GetProp, Timeline } from 'antd';

const renderTimeline = (mode: GetProp<typeof Timeline, 'mode'>) => (
  <Timeline
    mode={mode}
    orientation="horizontal"
    items={[
      {
        title: '2025-06-18',
        content: 'Initial',
      },
      {
        title: '2025-06-19',
        content: 'Start',
      },
      {
        title: '2025-06-20',
        content: 'Pending',
      },
      {
        title: '2025-06-22',
        content: 'Completed',
      },
    ]}
  />
);

const App: React.FC = () => (
  <Flex vertical gap="middle">
    {renderTimeline('start')}
    {renderTimeline('end')}
    {renderTimeline('alternate')}
  </Flex>
);

export default App;
